const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all world manufacturing plants with pagination and filters
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
 * Get single world manufacturing plant by ID
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
 * Create new world manufacturing plant
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
 * Update existing world manufacturing plant
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
 * Soft delete world manufacturing plant
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill deleted_by dari token
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    const payload = {
      deleted_by: employeeId
    };
    
    // First get the data to check if exists
    const existingData = await repository.findById(id);
    
    if (!existingData) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    // Soft delete dengan set deleted_by
    const payloadWithDeletedBy = {
      ...payload,
      is_delete: true
    };
    
    await repository.update(id, payloadWithDeletedBy);
    
    return baseResponse(res, { 
      message: 'Data berhasil dihapus' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Restore soft deleted world manufacturing plant
 */
const restore = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill updated_by dari token
    const employeeId = req.user?.employee_id || req.user?.user_id || null;
    const payload = {
      updated_by: employeeId
    };
    
    const data = await repository.restore(id);
    
    if (!data || data.length === 0) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    // Update updated_by after restore
    await repository.update(id, payload);
    
    const result = await repository.findById(id);
    
    return baseResponse(res, { 
      data: result,
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
