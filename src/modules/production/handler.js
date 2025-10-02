const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all productions with pagination (POST method)
 */
const getProductions = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort_by = 'created_at', sort_order = 'desc' } = req.body;
    const data = await repository.findAll(page, limit, search, sort_by, sort_order);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Create new production
 */
const createProduction = async (req, res) => {
  try {
    // Get user data from token (req.user is set by verifyToken middleware)
    const userData = req.user;
    const data = await repository.create(req.body, userData);
    return baseResponse(res, { 
      data,
      message: 'Production berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get single production by ID
 */
const getProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await repository.findById(id);
    
    if (!data) {
      return errorResponse(res, { message: 'Production tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing production
 */
const updateProduction = async (req, res) => {
  try {
    const { id } = req.params;
    // Get user data from token
    const userData = req.user;
    const data = await repository.update(id, req.body, userData);
    
    if (!data) {
      return errorResponse(res, { message: 'Production tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      data,
      message: 'Production berhasil diupdate' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Soft delete production
 */
const deleteProduction = async (req, res) => {
  try {
    const { id } = req.params;
    // Get user data from token
    const userData = req.user;
    const result = await repository.remove(id, userData);
    
    if (!result) {
      return errorResponse(res, { message: 'Production tidak ditemukan' }, 404);
    }
    
    return baseResponse(res, { 
      message: 'Production berhasil dihapus' 
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getProductions,
  createProduction,
  getProductionById,
  updateProduction,
  deleteProduction
};
