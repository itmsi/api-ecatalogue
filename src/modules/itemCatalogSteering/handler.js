const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all items with pagination and filter
 */
const getAll = async (req, res) => {
  try {
    const filters = {
      page: req.body.page || 1,
      limit: req.body.limit || 10,
      search: req.body.search || '',
      sort_by: req.body.sort_by || 'created_at',
      sort_order: req.body.sort_order || 'desc',
      master_pdf_id: req.body.master_pdf_id || null
    };
    
    const data = await repository.findAll(filters);
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
    
    // Get master_pdf_id dari item
    const item = await repository.findById(id);
    
    if (!item) {
      return errorResponse(res, { message: 'Data tidak ditemukan' }, 404);
    }
    
    // Get all items dengan master_pdf_id yang sama
    const dataItems = await repository.findByMasterPdfId(item.master_pdf_id);
    
    const result = {
      name_pdf: item.name_pdf,
      master_pdf_id: item.master_pdf_id,
      data_items: dataItems
    };
    
    return baseResponse(res, { data: result });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Create new items
 */
const create = async (req, res) => {
  try {
    const { name_pdf, data_items } = req.body;
    
    // Get user ID dari token
    const userId = req.user?.employee_id || req.user?.user_id || null;
    
    const data = await repository.create(name_pdf, data_items, userId);
    
    return baseResponse(res, {
      data,
      message: 'Data berhasil dibuat'
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing items
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_pdf, data_items } = req.body;
    
    // Get user ID dari token
    const userId = req.user?.employee_id || req.user?.user_id || null;
    
    const data = await repository.update(id, name_pdf, data_items, userId);
    
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
    
    // Get user ID dari token
    const userId = req.user?.employee_id || req.user?.user_id || null;
    
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

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

