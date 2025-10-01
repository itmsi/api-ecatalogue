const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils');

/**
 * Get all categories with pagination
 */
const getAll = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10,
      sort_by = 'created_at',
      sort_order = 'asc',
      search = ''
    } = req.body;
    const data = await repository.findAll(page, limit, sort_by, sort_order, search);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get all categories including deleted (for admin)
 */
const getAllWithDeleted = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await repository.findAllWithDeleted(page, limit);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Search categories by name or description
 */
const search = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    
    if (!search) {
      return errorResponse(res, { message: 'Kata kunci pencarian wajib diisi' }, 400);
    }
    
    // Implementasi pencarian akan ditambahkan di repository jika diperlukan
    const data = await repository.findAll(page, limit);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get single category by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await repository.findById(id);
    
    if (!data) {
      return errorResponse(res, { message: 'Kategori tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Create new category
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
      message: 'Kategori berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing category
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
      return errorResponse(res, { message: 'Kategori tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Kategori berhasil diupdate' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Soft delete category
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill deleted_by dari token
    const deletedBy = req.user?.employee_id || req.user?.user_id || null;
    const result = await repository.remove(id, deletedBy);
    
    if (!result) {
      return errorResponse(res, { message: 'Kategori tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      message: 'Kategori berhasil dihapus' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Restore soft deleted category
 */
const restore = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-fill updated_by dari token (saat restore)
    const updatedBy = req.user?.employee_id || req.user?.user_id || null;
    const data = await repository.restore(id, updatedBy);
    
    if (!data) {
      return errorResponse(res, { message: 'Kategori tidak ditemukan atau tidak dalam status terhapus' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Kategori berhasil direstore' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Hard delete category (permanent)
 */
const hardDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.hardDelete(id);
    
    if (!result) {
      return errorResponse(res, { message: 'Kategori tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      message: 'Kategori berhasil dihapus permanen' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getAll,
  getAllWithDeleted,
  search,
  getById,
  create,
  update,
  remove,
  restore,
  hardDelete
};
