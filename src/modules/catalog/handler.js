const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');
const { uploadToMinio } = require('../../config/minio');
const { generateCatalogImageFileName } = require('../../middlewares/fileUpload');

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
  try {
    // Auto-fill created_by dari token (jika ada)
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    
    let catalogImageUrl = null;
    
    // Handle file upload jika ada file catalog_image
    if (req.file && req.file.buffer) {
      try {
        const fileName = generateCatalogImageFileName(req.file.originalname);
        const contentType = req.file.mimetype;
        
        const uploadResult = await uploadToMinio(fileName, req.file.buffer, contentType);
        
        if (uploadResult.success) {
          catalogImageUrl = uploadResult.url;
        } else {
          console.error('Failed to upload catalog image:', uploadResult.error);
          return errorResponse(res, { 
            message: 'Gagal mengupload gambar katalog' 
          }, 500);
        }
      } catch (uploadError) {
        console.error('Error uploading catalog image:', uploadError);
        return errorResponse(res, { 
          message: 'Error saat mengupload gambar katalog' 
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
    
    const data = await repository.create(payload);
    return baseResponse(res, { 
      data,
      message: 'Data katalog berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing item
 */
const update = async (req, res) => {
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
        
        const uploadResult = await uploadToMinio(fileName, req.file.buffer, contentType);
        
        if (uploadResult.success) {
          catalogImageUrl = uploadResult.url;
          console.log('File uploaded successfully:', catalogImageUrl);
        } else {
          console.error('Failed to upload catalog image:', uploadResult.error);
          return errorResponse(res, { 
            message: 'Gagal mengupload gambar katalog' 
          }, 500);
        }
      } catch (uploadError) {
        console.error('Error uploading catalog image:', uploadError);
        return errorResponse(res, { 
          message: 'Error saat mengupload gambar katalog' 
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
    
    const data = await repository.update(id, payload);
    
    if (!data) {
      return errorResponse(res, { message: 'Data katalog tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Data katalog berhasil diupdate' 
    });
  } catch (error) {
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

