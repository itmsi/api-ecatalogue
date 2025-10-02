const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all driver types with pagination
 */
const getAll = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      sort_by = 'created_at', 
      sort_order = 'desc' 
    } = req.body;
    
    const data = await repository.findAll(page, limit, search, sort_by, sort_order);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get single driver type by ID
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
 * Create new driver type
 */
const create = async (req, res) => {
  try {
    // Get user info from token
    const userId = req.user?.employee_id || req.user?.user_id;
    
    const data = await repository.create({
      ...req.body,
      created_by: userId,
      updated_by: userId
    });
    
    return baseResponse(res, { 
      data,
      message: 'Data berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing driver type
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    // Get user info from token
    const userId = req.user?.employee_id || req.user?.user_id;
    
    const data = await repository.update(id, {
      ...req.body,
      updated_by: userId
    });
    
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
 * Soft delete driver type
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    // Get user info from token
    const userId = req.user?.employee_id || req.user?.user_id;
    
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

/**
 * Restore soft deleted driver type
 */
const restore = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await repository.restore(id);
    
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
