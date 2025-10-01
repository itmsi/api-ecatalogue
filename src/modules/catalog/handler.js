const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

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
    
    // Convert empty string to null untuk UUID fields
    const payload = {
      ...req.body,
      category_id: req.body.category_id && req.body.category_id.trim() !== '' ? req.body.category_id : null,
      catalog_parent_id: req.body.catalog_parent_id && req.body.catalog_parent_id.trim() !== '' ? req.body.catalog_parent_id : null,
      created_by: employeeId
    };
    
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
    
    // Convert empty string to null untuk UUID fields
    const payload = {
      ...req.body,
      category_id: req.body.category_id !== undefined && req.body.category_id !== null 
        ? (req.body.category_id.trim() !== '' ? req.body.category_id : null)
        : req.body.category_id,
      catalog_parent_id: req.body.catalog_parent_id !== undefined && req.body.catalog_parent_id !== null
        ? (req.body.catalog_parent_id.trim() !== '' ? req.body.catalog_parent_id : null)
        : req.body.catalog_parent_id,
      updated_by: employeeId
    };
    
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

