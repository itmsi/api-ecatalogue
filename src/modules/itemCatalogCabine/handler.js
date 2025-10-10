const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');
const { uploadToMinio } = require('../../config/minio');
const { generateCatalogImageFileName } = require('../../middlewares/fileUpload');
const csv = require('csv-parser');
const { Readable } = require('stream');
const { pgCore: db } = require('../../config/database');

/**
 * Helper function to parse CSV file
 */
const parseCsvFile = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    // Create readable stream from buffer
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signal end of stream
    
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

/**
 * Validate CSV row data for cabine items
 */
const validateCsvRow = (row, rowIndex) => {
  const errors = [];
  
  // Validasi kolom yang diperlukan ada (semua kolom optional, tapi minimal harus ada struktur dasar)
  // Tidak ada validasi required untuk cabine items
  
  // Validasi quantity harus angka jika ada
  if (row.quantity && isNaN(parseInt(row.quantity))) {
    errors.push(`Baris ${rowIndex + 1}: quantity harus berupa angka`);
  }
  
  return errors;
};

/**
 * Helper function to process CSV and convert to data items format
 */
const processCsvToDataItems = async (csvBuffer) => {
  // Parse CSV
  const csvData = await parseCsvFile(csvBuffer);
  
  console.log('=== CSV PARSING DEBUG ===');
  console.log('CSV Data Length:', csvData.length);
  if (csvData.length > 0) {
    console.log('CSV Data Sample (first row):', JSON.stringify(csvData[0], null, 2));
    console.log('CSV Data Keys:', Object.keys(csvData[0]));
  } else {
    console.log('CSV Data is empty');
  }
  
  if (csvData.length === 0) {
    throw new Error('File CSV kosong atau format tidak valid');
  }
  
  // Validasi setiap baris CSV
  const validationErrors = [];
  csvData.forEach((row, index) => {
    const errors = validateCsvRow(row, index);
    validationErrors.push(...errors);
  });
  
  if (validationErrors.length > 0) {
    throw new Error(`Validasi CSV gagal: ${validationErrors.join(', ')}`);
  }
  
  // Convert CSV data ke format data_items (tanpa cabine_id dan type_cabine_id di row level)
  const dataItems = csvData.map(row => ({
    target_id: row.target_id || null,
    diagram_serial_number: row.diagram_serial_number || null,
    part_number: row.part_number || null,
    catalog_item_name_en: row.catalog_item_name_en || null,
    catalog_item_name_ch: row.catalog_item_name_ch || null,
    description: row.description || null,
    quantity: row.quantity ? parseInt(row.quantity) : null
  }));
  
  console.log('=== DATA ITEMS AFTER MAPPING ===');
  console.log('Data Items Length:', dataItems.length);
  if (dataItems.length > 0) {
    console.log('Data Items Sample (first item):', JSON.stringify(dataItems[0], null, 2));
  }
  
  return dataItems;
};

/**
 * Get all items with pagination and filter
 */
const getAll = async (req, res) => {
  try {
    const filters = {
      page: req.body.page || 1,
      limit: req.body.limit || 10,
      search: req.body.search || '',
      sort_by: req.body.sort_by || 'created_at',
      sort_order: req.body.sort_order || 'desc',
      master_pdf_id: req.body.master_pdf_id || null
    };
    
    const data = await repository.findAll(filters);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get single item by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get master_pdf_id dari item
    const item = await repository.findById(id);
    
    if (!item) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    // Get all items dengan master_pdf_id yang sama
    const dataItems = await repository.findByMasterPdfId(item.master_pdf_id);
    
    const result = {
      name_pdf: item.name_pdf,
      master_pdf_id: item.master_pdf_id,
      data_items: dataItems
    };
    
    return baseResponse(res, { data: result });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Create new items
 */
const create = async (req, res) => {
  // Gunakan transaction untuk rollback jika ada error
  const trx = await db.transaction();
  
  try {
    const { name_pdf, cabine_id, type_cabine_id, use_csv } = req.body;
    
    // Get user ID dari token
    const userId = req.user?.employee_id || req.user?.user_id || null;
    
    let fileFotoUrl = null;
    let dataItems = [];
    
    // Handle file_foto upload jika ada
    if (req.files && req.files.file_foto && req.files.file_foto.length > 0) {
      const fotoFile = req.files.file_foto[0];
      try {
        const fileName = generateCatalogImageFileName(fotoFile.originalname);
        const contentType = fotoFile.mimetype;
        
        console.log('Uploading file_foto:', fileName);
        const uploadResult = await uploadToMinio(fileName, fotoFile.buffer, contentType);
        console.log('Upload result:', uploadResult);
        
        if (uploadResult.success) {
          fileFotoUrl = uploadResult.url;
        } else {
          console.error('Failed to upload file_foto:', uploadResult.error || 'MinIO may be disabled or not configured');
          await trx.rollback();
          return errorResponse(res, { 
            message: 'Gagal mengupload file foto',
            detail: uploadResult.error || 'MinIO tidak aktif atau belum dikonfigurasi dengan benar'
          }, 500);
        }
      } catch (uploadError) {
        console.error('Error uploading file_foto:', uploadError);
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Error saat mengupload file foto',
          detail: uploadError.message
        }, 500);
      }
    }
    
    // Cek apakah menggunakan CSV atau data_items
    const useCsv = use_csv === 'true' || use_csv === true;
    
    if (useCsv) {
      // Process CSV file
      if (!req.files || !req.files.file_csv || req.files.file_csv.length === 0) {
        await trx.rollback();
        return errorResponse(res, { 
          message: 'File CSV wajib diupload jika use_csv = true' 
        }, 400);
      }
      
      const csvFile = req.files.file_csv[0];
      
      try {
        console.log('=== CREATE: Processing CSV file ===');
        dataItems = await processCsvToDataItems(csvFile.buffer);
      } catch (csvError) {
        console.error('Error processing CSV:', csvError);
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Error saat memproses file CSV',
          error: csvError.message
        }, 500);
      }
    } else {
      // Gunakan data_items dari body
      if (!req.body.data_items) {
        await trx.rollback();
        return errorResponse(res, { 
          message: 'data_items wajib diisi jika use_csv = false' 
        }, 400);
      }
      
      try {
        // Parse data_items jika berupa string JSON
        dataItems = typeof req.body.data_items === 'string' 
          ? JSON.parse(req.body.data_items) 
          : req.body.data_items;
      } catch (parseError) {
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Format data_items tidak valid',
          error: parseError.message
        }, 400);
      }
    }
    
    // Validasi dataItems minimal 1 item
    if (!dataItems || dataItems.length === 0) {
      await trx.rollback();
      return errorResponse(res, { 
        message: 'Minimal harus ada 1 item data' 
      }, 400);
    }
    
    console.log('=== CREATE: Final dataItems before insert ===');
    console.log('cabine_id:', cabine_id);
    console.log('type_cabine_id:', type_cabine_id);
    console.log('dataItems[0]:', JSON.stringify(dataItems[0], null, 2));
    
    // Create items dengan transaction (pass cabine_id dan type_cabine_id dari root level)
    const data = await repository.createWithTransaction(
      trx, 
      name_pdf, 
      dataItems, 
      userId, 
      fileFotoUrl,
      cabine_id || null,
      type_cabine_id || null
    );
    
    // Commit transaction jika semua berhasil
    await trx.commit();
    
    return baseResponse(res, {
      data,
      message: 'Data berhasil dibuat'
    }, 201);
  } catch (error) {
    // Rollback jika ada error
    await trx.rollback();
    return errorResponse(res, error);
  }
};

/**
 * Update existing items
 */
const update = async (req, res) => {
  // Gunakan transaction untuk rollback jika ada error
  const trx = await db.transaction();
  
  try {
    const { id } = req.params;
    const { name_pdf, cabine_id, type_cabine_id, use_csv } = req.body;
    
    // Get user ID dari token
    const userId = req.user?.employee_id || req.user?.user_id || null;
    
    let fileFotoUrl = null;
    let dataItems = [];
    
    // Handle file_foto upload jika ada
    if (req.files && req.files.file_foto && req.files.file_foto.length > 0) {
      const fotoFile = req.files.file_foto[0];
      try {
        const fileName = generateCatalogImageFileName(fotoFile.originalname);
        const contentType = fotoFile.mimetype;
        
        console.log('Uploading file_foto:', fileName);
        const uploadResult = await uploadToMinio(fileName, fotoFile.buffer, contentType);
        console.log('Upload result:', uploadResult);
        
        if (uploadResult.success) {
          fileFotoUrl = uploadResult.url;
        } else {
          console.error('Failed to upload file_foto:', uploadResult.error || 'MinIO may be disabled or not configured');
          await trx.rollback();
          return errorResponse(res, { 
            message: 'Gagal mengupload file foto',
            detail: uploadResult.error || 'MinIO tidak aktif atau belum dikonfigurasi dengan benar'
          }, 500);
        }
      } catch (uploadError) {
        console.error('Error uploading file_foto:', uploadError);
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Error saat mengupload file foto',
          detail: uploadError.message
        }, 500);
      }
    }
    
    // Cek apakah menggunakan CSV atau data_items
    const useCsv = use_csv === 'true' || use_csv === true;
    
    if (useCsv) {
      // Process CSV file
      if (!req.files || !req.files.file_csv || req.files.file_csv.length === 0) {
        await trx.rollback();
        return errorResponse(res, { 
          message: 'File CSV wajib diupload jika use_csv = true' 
        }, 400);
      }
      
      const csvFile = req.files.file_csv[0];
      
      try {
        console.log('=== UPDATE: Processing CSV file ===');
        dataItems = await processCsvToDataItems(csvFile.buffer);
      } catch (csvError) {
        console.error('Error processing CSV:', csvError);
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Error saat memproses file CSV',
          error: csvError.message
        }, 500);
      }
    } else {
      // Gunakan data_items dari body
      if (!req.body.data_items) {
        await trx.rollback();
        return errorResponse(res, { 
          message: 'data_items wajib diisi jika use_csv = false' 
        }, 400);
      }
      
      try {
        // Parse data_items jika berupa string JSON
        dataItems = typeof req.body.data_items === 'string' 
          ? JSON.parse(req.body.data_items) 
          : req.body.data_items;
      } catch (parseError) {
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Format data_items tidak valid',
          error: parseError.message
        }, 400);
      }
    }
    
    // Validasi dataItems minimal 1 item
    if (!dataItems || dataItems.length === 0) {
      await trx.rollback();
      return errorResponse(res, { 
        message: 'Minimal harus ada 1 item data' 
      }, 400);
    }
    
    console.log('=== UPDATE: Final dataItems before update ===');
    console.log('cabine_id:', cabine_id);
    console.log('type_cabine_id:', type_cabine_id);
    console.log('dataItems[0]:', JSON.stringify(dataItems[0], null, 2));
    
    // Update items dengan transaction (pass cabine_id dan type_cabine_id dari root level)
    const data = await repository.updateWithTransaction(
      trx, 
      id, 
      name_pdf, 
      dataItems, 
      userId, 
      fileFotoUrl,
      cabine_id || null,
      type_cabine_id || null
    );
    
    if (!data) {
      await trx.rollback();
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    // Commit transaction jika semua berhasil
    await trx.commit();
    
    return baseResponse(res, {
      data,
      message: 'Data berhasil diupdate'
    });
  } catch (error) {
    // Rollback jika ada error
    await trx.rollback();
    return errorResponse(res, error);
  }
};

/**
 * Soft delete item
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get user ID dari token
    const userId = req.user?.employee_id || req.user?.user_id || null;
    
    const result = await repository.remove(id, userId);
    
    if (!result) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, {
      message: 'Data berhasil dihapus'
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
