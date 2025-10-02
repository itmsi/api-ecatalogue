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
      sort_by = 'created_at',
      sort_order = 'desc',
      search = ''
    } = req.body;
    const data = await repository.findAll(page, limit, sort_by, sort_order, search);
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
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
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
    // Auto-fill created_by dari token
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    const payload = {
      ...req.body,
      created_by: employeeId
    };
    
    const data = await repository.create(payload);
    return baseResponse(res, { 
      data,
      message: 'Data berhasil dibuat' 
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
      message: 'Data berhasil diupdate' 
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
    
    // Auto-fill deleted_by dari token
    const deletedBy = req.user?.employee_id || req.user?.user_id || null;
    const result = await repository.remove(id, deletedBy);
    
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

/**
 * Restore soft deleted item
 */
const restore = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill updated_by dari token untuk restore
    const updatedBy = req.user?.employee_id || req.user?.user_id || null;
    const data = await repository.restore(id, updatedBy);
    
    if (!data) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Data berhasil direstore' 
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
