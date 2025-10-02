const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Get all catalog items with pagination
 */
const getAll = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '',
      sort_by = 'created_at',
      sort_order = 'desc',
      catalog_id = ''
    } = req.body;
    
    const filters = {};
    // Hanya tambahkan filter jika ada nilai dan bukan empty string
    if (search && search.trim() !== '') filters.search = search;
    if (catalog_id && catalog_id.trim() !== '') filters.catalog_id = catalog_id;
    
    const data = await repository.findAll(page, limit, filters, sort_by, sort_order);
    return baseResponse(res, { data });
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Get single catalog item by ID
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
 * Create new catalog item
 */
const create = async (req, res) => {
  try {
    const data = await repository.create(req.body);
    return baseResponse(res, { 
      data,
      message: 'Data berhasil dibuat' 
    }, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * Update existing catalog item
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await repository.update(id, req.body);
    
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
 * Soft delete catalog item
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await repository.remove(id);
    
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
 * Restore soft deleted catalog item
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

/**
 * Import catalog items from CSV
 */
const importCsv = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, { message: 'File CSV wajib diupload' }, 400);
    }

    // Since we're using memory storage, we need to write the file to temp directory first
    const fs = require('fs');
    const path = require('path');
    const { v4: uuidv4 } = require('uuid');
    
    const tempDir = path.join(process.cwd(), 'uploads', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const tempFilePath = path.join(tempDir, `${uuidv4()}.csv`);
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const data = await repository.importFromCsv(tempFilePath);
    return baseResponse(res, { 
      data,
      message: `Berhasil mengimport ${data.imported} data dari CSV` 
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
  restore,
  importCsv
};
