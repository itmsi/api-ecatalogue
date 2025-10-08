const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all cabines with pagination, search, and filtering
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
 * Get single cabines by ID with type_cabines
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
 * Create new cabines with type_cabines
 */
const create = async (req, res) => {
  try {
    const userId = req.user?.employee_id || req.user?.user_id;
    const data = await repository.create(req.body, userId);
    
    return baseResponse(res, { 
      data,
      message: 'Data berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing cabines with type_cabines
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
      message: 'Data berhasil diupdate' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Soft delete cabines
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
      message: 'Data berhasil dihapus' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Restore soft deleted cabines
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
      message: 'Data berhasil direstore' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get all type cabines for dropdown/selection
 */
const getTypeCabines = async (req, res) => {
  try {
    const data = await repository.getAllTypeCabines();
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
  getTypeCabines
};
