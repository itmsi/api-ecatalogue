const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all brands with pagination and filters
 */
const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort_by = 'created_at', sort_order = 'desc' } = req.body;
    
    const data = await repository.findAll(page, limit, {
      search,
      sort_by,
      sort_order
    });
    
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get single brand by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await repository.findById(id);
    
    if (!data) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Create new brand
 */
const create = async (req, res) => {
  try {
    // Auto-fill created_by dari token
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    const payload = {
      ...req.body,
      created_by: employeeId
    };
    
    const data = await repository.create(payload);
    return baseResponse(res, { 
      data,
      message: 'Brand berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing brand
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill updated_by dari token
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    const payload = {
      ...req.body,
      updated_by: employeeId
    };
    
    const data = await repository.update(id, payload);
    
    if (!data) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Brand berhasil diupdate' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Soft delete brand
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill deleted_by dari token
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    
    const result = await repository.remove(id, employeeId);
    
    if (!result) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      message: 'Brand berhasil dihapus' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Restore soft deleted brand
 */
const restore = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill updated_by dari token
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    
    const data = await repository.restore(id, employeeId);
    
    if (!data) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Brand berhasil direstore' 
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
