const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all items with pagination and filters
 */
const getAll = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search,
      sort_by = 'created_at',
      sort_order = 'desc'
    } = req.body;
    
    const filters = {};
    if (search && search.trim() !== '') filters.search = search;
    filters.sort_by = sort_by;
    filters.sort_order = sort_order;
    
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
      return errorResponse(res, { message: 'Data berat kendaraan tidak ditemukan' }, 404);
    }
    
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
    
    const payload = {
      vehicle_weight_code: req.body.vehicle_weight_code || null,
      vehicle_weight_name: req.body.vehicle_weight_name || null,
      vehicle_weight_description: req.body.vehicle_weight_description || null,
      created_by: employeeId
    };
    
    const data = await repository.create(payload);
    return baseResponse(res, { 
      data,
      message: 'Data berat kendaraan berhasil dibuat' 
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
    
    const payload = {
      vehicle_weight_code: req.body.vehicle_weight_code || null,
      vehicle_weight_name: req.body.vehicle_weight_name || null,
      vehicle_weight_description: req.body.vehicle_weight_description || null,
      updated_by: employeeId
    };
    
    const data = await repository.update(id, payload);
    
    if (!data) {
      return errorResponse(res, { message: 'Data berat kendaraan tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Data berat kendaraan berhasil diupdate' 
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
      return errorResponse(res, { message: 'Data berat kendaraan tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      message: 'Data berat kendaraan berhasil dihapus' 
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
      return errorResponse(res, { message: 'Data berat kendaraan tidak ditemukan atau tidak dalam status terhapus' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Data berat kendaraan berhasil direstore' 
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
  remove,
  restore
};
