const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all type axels with pagination and filters
 */
const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort_by = 'created_at', sort_order = 'desc' } = req.body;
    
    const filters = {
      search,
      sort_by,
      sort_order
    };
    
    const data = await repository.findAll(page, limit, filters);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get single type axel by ID
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
 * Create new type axel
 */
const create = async (req, res) => {
  try {
    const { type_axel_name_en, type_axel_name_cn, type_axel_description } = req.body;
    
    // Get user info from token
    const userId = req.user?.employee_id || req.user?.user_id;
    
    const data = await repository.create({
      type_axel_name_en,
      type_axel_name_cn,
      type_axel_description,
      created_by: userId,
      updated_by: userId
    });
    
    return baseResponse(res, { 
      data,
      message: 'Type axel berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing type axel
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { type_axel_name_en, type_axel_name_cn, type_axel_description } = req.body;
    
    // Get user info from token
    const userId = req.user?.employee_id || req.user?.user_id;
    
    const data = await repository.update(id, {
      type_axel_name_en,
      type_axel_name_cn,
      type_axel_description,
      updated_by: userId
    });
    
    if (!data) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Type axel berhasil diupdate' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Soft delete type axel
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
      message: 'Type axel berhasil dihapus' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Restore soft deleted type axel
 */
const restore = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get user info from token
    const userId = req.user?.employee_id || req.user?.user_id;
    
    const data = await repository.restore(id);
    
    if (!data) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Type axel berhasil direstore' 
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

