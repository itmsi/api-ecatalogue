const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all steerings with pagination, search, and filtering
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
 * Get single steering by ID with type_steerings
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
 * Create new steering with type_steerings
 */
const create = async (req, res) => {
  try {
    const userId = req.user?.employee_id || req.user?.user_id;
    const data = await repository.create(req.body, userId);
    
    return baseResponse(res, { 
      data,
      message: 'Steering berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing steering with type_steerings
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.employee_id || req.user?.user_id;
    const data = await repository.update(id, req.body, userId);
    
    if (!data) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Steering berhasil diupdate' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Soft delete steering
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.employee_id || req.user?.user_id;
    const result = await repository.remove(id, userId);
    
    if (!result) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      message: 'Steering berhasil dihapus' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Restore soft deleted steering
 */
const restore = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.employee_id || req.user?.user_id;
    const data = await repository.restore(id, userId);
    
    if (!data) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Steering berhasil direstore' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get all type steerings for dropdown/selection
 */
const getTypeSteerings = async (req, res) => {
  try {
    const data = await repository.getAllTypeSteerings();
    return baseResponse(res, { data });
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
  restore,
  getTypeSteerings
};

