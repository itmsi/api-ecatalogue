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
    const stream = Readable.from(buffer);
    
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

/**
 * Validate CSV row data
 */
const validateCsvRow = (row, rowIndex) => {
  const errors = [];
  
  // Validasi kolom yang diperlukan ada
  const requiredColumns = ['target_id', 'diagram_serial_number', 'part_number', 
                           'catalog_item_name_en', 'catalog_item_name_ch', 'catalog_item_quantity'];
  
  for (const col of requiredColumns) {
    if (!(col in row)) {
      errors.push(`Baris ${rowIndex + 1}: Kolom '${col}' tidak ditemukan`);
    }
  }
  
  // Validasi catalog_item_quantity harus angka
  if (row.catalog_item_quantity && isNaN(parseInt(row.catalog_item_quantity))) {
    errors.push(`Baris ${rowIndex + 1}: catalog_item_quantity harus berupa angka`);
  }
  
  return errors;
};

/**
 * Get all items with pagination
 */
const getAll = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category_id, 
      catalog_parent_id, 
      search,
      sort_by = 'created_at',
      sort_order = 'desc'
    } = req.body;
    
    const filters = {};
    // Hanya tambahkan filter jika ada nilai dan bukan empty string
    if (category_id && category_id.trim() !== '') filters.category_id = category_id;
    if (catalog_parent_id && catalog_parent_id.trim() !== '') filters.catalog_parent_id = catalog_parent_id;
    if (search && search.trim() !== '') filters.search = search;
    
    const data = await repository.findAll(page, limit, filters);
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
    const data = await repository.findById(id);
    
    if (!data) {
      return errorResponse(res, { message: 'Data katalog tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get children of a catalog
 */
const getChildren = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await repository.findChildren(id);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Create new item
 */
const create = async (req, res) => {
  // Gunakan transaction untuk rollback jika ada error
  const trx = await db.transaction();
  
  try {
    // Auto-fill created_by dari token (jika ada)
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    
    let catalogImageUrl = null;
    
    // Handle file upload jika ada file catalog_image
    if (req.file && req.file.buffer) {
      try {
        const fileName = generateCatalogImageFileName(req.file.originalname);
        const contentType = req.file.mimetype;
        
        console.log('Uploading catalog image:', fileName);
        const uploadResult = await uploadToMinio(fileName, req.file.buffer, contentType);
        console.log('Upload result:', uploadResult);
        
        if (uploadResult.success) {
          catalogImageUrl = uploadResult.url;
        } else {
          console.error('Failed to upload catalog image:', uploadResult.error || 'MinIO may be disabled or not configured');
          await trx.rollback();
          return errorResponse(res, { 
            message: 'Gagal mengupload gambar katalog',
            detail: uploadResult.error || 'MinIO tidak aktif atau belum dikonfigurasi dengan benar. Periksa environment variables: S3_PROVIDER, S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET'
          }, 500);
        }
      } catch (uploadError) {
        console.error('Error uploading catalog image:', uploadError);
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Error saat mengupload gambar katalog',
          detail: uploadError.message
        }, 500);
      }
    }
    
    // Convert empty string to null untuk UUID fields dan handle catalog_image dengan benar
    const payload = {
      category_id: req.body.category_id && req.body.category_id.trim() !== '' ? req.body.category_id : null,
      catalog_parent_id: req.body.catalog_parent_id && req.body.catalog_parent_id.trim() !== '' ? req.body.catalog_parent_id : null,
      catalog_name_en: req.body.catalog_name_en || null,
      catalog_name_ch: req.body.catalog_name_ch || null,
      catalog_quantity: req.body.catalog_quantity !== undefined ? parseInt(req.body.catalog_quantity) : null,
      catalog_description: req.body.catalog_description || null,
      created_by: employeeId
    };
    
    // Hanya tambahkan catalog_image jika ada file yang diupload
    if (catalogImageUrl !== null) {
      payload.catalog_image = catalogImageUrl;
    }
    
    // Create catalog dengan transaction
    const data = await repository.createWithTransaction(trx, payload);
    
    // Process CSV file jika ada
    if (req.files && req.files.data_csv && req.files.data_csv.length > 0) {
      const csvFile = req.files.data_csv[0];
      
      try {
        // Parse CSV
        const csvData = await parseCsvFile(csvFile.buffer);
        
        if (csvData.length === 0) {
          await trx.rollback();
          return errorResponse(res, { 
            message: 'File CSV kosong atau format tidak valid' 
          }, 400);
        }
        
        // Validasi setiap baris CSV
        const validationErrors = [];
        csvData.forEach((row, index) => {
          const errors = validateCsvRow(row, index);
          validationErrors.push(...errors);
        });
        
        if (validationErrors.length > 0) {
          await trx.rollback();
          return errorResponse(res, { 
            message: 'Validasi CSV gagal',
            errors: validationErrors
          }, 400);
        }
        
        // Prepare catalog items data
        const catalogItems = csvData.map(row => ({
          catalog_id: data.catalog_id,
          target_id: row.target_id || null,
          diagram_serial_number: row.diagram_serial_number || null,
          part_number: row.part_number || null,
          catalog_item_name_en: row.catalog_item_name_en || null,
          catalog_item_name_ch: row.catalog_item_name_ch || null,
          catalog_item_quantity: row.catalog_item_quantity ? parseInt(row.catalog_item_quantity) : 0,
          catalog_item_description: row.catalog_item_description || null,
          created_by: employeeId
        }));
        
        // Insert catalog items dengan transaction
        await repository.createCatalogItemsWithTransaction(trx, catalogItems);
        
      } catch (csvError) {
        console.error('Error processing CSV:', csvError);
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Error saat memproses file CSV',
          error: csvError.message
        }, 500);
      }
    }
    
    // Commit transaction jika semua berhasil
    await trx.commit();
    
    return baseResponse(res, { 
      data,
      message: 'Data katalog berhasil dibuat' 
    }, 201);
  } catch (error) {
    // Rollback jika ada error
    await trx.rollback();
    return errorResponse(res, error);
  }
};

/**
 * Update existing item
 */
const update = async (req, res) => {
  // Gunakan transaction untuk rollback jika ada error
  const trx = await db.transaction();
  
  try {
    const { id } = req.params;
    
    // Auto-fill updated_by dari token (jika ada)
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    
    let catalogImageUrl = null;
    
    // Handle file upload jika ada file catalog_image
    console.log('Update request - req.file:', req.file);
    console.log('Update request - req.body keys:', Object.keys(req.body));
    console.log('Update request - req.body.catalog_image:', req.body.catalog_image);
    
    if (req.file && req.file.buffer) {
      console.log('File detected, uploading to MinIO...');
      try {
        const fileName = generateCatalogImageFileName(req.file.originalname);
        const contentType = req.file.mimetype;
        
        console.log('Uploading catalog image:', fileName);
        const uploadResult = await uploadToMinio(fileName, req.file.buffer, contentType);
        console.log('Upload result:', uploadResult);
        
        if (uploadResult.success) {
          catalogImageUrl = uploadResult.url;
          console.log('File uploaded successfully:', catalogImageUrl);
        } else {
          console.error('Failed to upload catalog image:', uploadResult.error || 'MinIO may be disabled or not configured');
          await trx.rollback();
          return errorResponse(res, { 
            message: 'Gagal mengupload gambar katalog',
            detail: uploadResult.error || 'MinIO tidak aktif atau belum dikonfigurasi dengan benar. Periksa environment variables: S3_PROVIDER, S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET'
          }, 500);
        }
      } catch (uploadError) {
        console.error('Error uploading catalog image:', uploadError);
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Error saat mengupload gambar katalog',
          detail: uploadError.message
        }, 500);
      }
    } else {
      console.log('No file detected, preserving existing catalog_image');
    }
    
    // Convert empty string to null untuk UUID fields dan handle catalog_image dengan benar
    const payload = {
      category_id: req.body.category_id !== undefined && req.body.category_id !== null 
        ? (req.body.category_id.trim() !== '' ? req.body.category_id : null)
        : req.body.category_id,
      catalog_parent_id: req.body.catalog_parent_id !== undefined && req.body.catalog_parent_id !== null
        ? (req.body.catalog_parent_id.trim() !== '' ? req.body.catalog_parent_id : null)
        : req.body.catalog_parent_id,
      catalog_name_en: req.body.catalog_name_en || null,
      catalog_name_ch: req.body.catalog_name_ch || null,
      catalog_quantity: req.body.catalog_quantity !== undefined ? parseInt(req.body.catalog_quantity) : null,
      catalog_description: req.body.catalog_description || null,
      updated_by: employeeId
    };
    
    // Hanya update catalog_image jika ada file baru yang diupload
    if (catalogImageUrl !== null) {
      payload.catalog_image = catalogImageUrl;
      console.log('Adding catalog_image to payload:', catalogImageUrl);
    } else {
      console.log('Not adding catalog_image to payload, preserving existing value');
    }
    
    console.log('Final payload for update:', payload);
    
    // Update catalog dengan transaction
    const data = await repository.updateWithTransaction(trx, id, payload);
    
    if (!data) {
      await trx.rollback();
      return errorResponse(res, { message: 'Data katalog tidak ditemukan' }, 404);
    }
    
    // Process CSV file jika ada
    if (req.files && req.files.data_csv && req.files.data_csv.length > 0) {
      const csvFile = req.files.data_csv[0];
      
      try {
        // Parse CSV
        const csvData = await parseCsvFile(csvFile.buffer);
        
        if (csvData.length === 0) {
          await trx.rollback();
          return errorResponse(res, { 
            message: 'File CSV kosong atau format tidak valid' 
          }, 400);
        }
        
        // Validasi setiap baris CSV
        const validationErrors = [];
        csvData.forEach((row, index) => {
          const errors = validateCsvRow(row, index);
          validationErrors.push(...errors);
        });
        
        if (validationErrors.length > 0) {
          await trx.rollback();
          return errorResponse(res, { 
            message: 'Validasi CSV gagal',
            errors: validationErrors
          }, 400);
        }
        
        // Hapus catalog items lama terlebih dahulu (soft delete)
        await repository.deleteCatalogItemsByCatalogIdWithTransaction(trx, id, employeeId);
        
        // Prepare catalog items data
        const catalogItems = csvData.map(row => ({
          catalog_id: id,
          target_id: row.target_id || null,
          diagram_serial_number: row.diagram_serial_number || null,
          part_number: row.part_number || null,
          catalog_item_name_en: row.catalog_item_name_en || null,
          catalog_item_name_ch: row.catalog_item_name_ch || null,
          catalog_item_quantity: row.catalog_item_quantity ? parseInt(row.catalog_item_quantity) : 0,
          catalog_item_description: row.catalog_item_description || null,
          created_by: employeeId
        }));
        
        // Insert catalog items baru dengan transaction
        await repository.createCatalogItemsWithTransaction(trx, catalogItems);
        
      } catch (csvError) {
        console.error('Error processing CSV:', csvError);
        await trx.rollback();
        return errorResponse(res, { 
          message: 'Error saat memproses file CSV',
          error: csvError.message
        }, 500);
      }
    }
    
    // Commit transaction jika semua berhasil
    await trx.commit();
    
    return baseResponse(res, { 
      data,
      message: 'Data katalog berhasil diupdate' 
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
    
    // Auto-fill deleted_by dari token (jika ada)
    const deletedBy = req.user?.employee_id || req.user?.user_id || null;
    const result = await repository.remove(id, deletedBy);
    
    if (!result) {
      return errorResponse(res, { message: 'Data katalog tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      message: 'Data katalog berhasil dihapus' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Restore soft deleted item
 */
const restore = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill updated_by dari token saat restore (jika ada)
    const updatedBy = req.user?.employee_id || req.user?.user_id || null;
    const data = await repository.restore(id, updatedBy);
    
    if (!data) {
      return errorResponse(res, { message: 'Data katalog tidak ditemukan atau tidak dalam status terhapus' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Data katalog berhasil direstore' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getAll,
  getById,
  getChildren,
  create,
  update,
  remove,
  restore
};

