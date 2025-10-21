const repository = require('./postgre_repository');
const { baseResponse, errorResponse } = require('../../utils/response');

/**
 * Handler untuk mendapatkan data master PDF dengan pagination dan filtering
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort_by = 'created_at',
      sort_order = 'desc',
      category = ''
    } = req.body;

    // Validasi parameter pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
    return errorResponse(res, 'Parameter pagination tidak valid. Page harus >= 1, limit harus 1-100');
    }

    // Validasi sort order
    if (!['asc', 'desc'].includes(sort_order.toLowerCase())) {
      return errorResponse(res, 'Sort order harus "asc" atau "desc"');
    }

    // Validasi sort by field
    const allowedSortFields = [
      'id', 'name', 'description', 'category', 'created_at', 'updated_at'
    ];
    
    if (!allowedSortFields.includes(sort_by)) {
      return errorResponse(res, `Sort by field tidak valid. Field yang diperbolehkan: ${allowedSortFields.join(', ')}`);
    }

    // Hitung offset untuk pagination
    const offset = (pageNum - 1) * limitNum;

    // Panggil repository untuk mendapatkan data
    const result = await repository.getAll({
      page: pageNum,
      limit: limitNum,
      offset,
      search,
      sort_by,
      sort_order: sort_order.toLowerCase(),
      category
    });

    // Format response dengan standard pagination
    return res.status(200).json({
      success: true,
      message: 'Data master PDF berhasil diambil',
      data: result.data,
      pagination: result.pagination,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in masterPdf getAll handler:', error);
    return errorResponse(res, 'Terjadi kesalahan server saat mengambil data master PDF');
  }
};

/**
 * Handler untuk mendapatkan data master PDF berdasarkan ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id) {
      return errorResponse(res, 'ID master PDF harus disediakan');
    }

    // Panggil repository untuk mendapatkan data berdasarkan ID
    const result = await repository.getById(id);

    if (!result) {
      return errorResponse(res, 'Master PDF tidak ditemukan');
    }

    // Format response
    const response = {
      success: true,
      message: 'Data master PDF berhasil diambil',
      data: result
    };

    return baseResponse(res, { data: result });

  } catch (error) {
    console.error('Error in masterPdf getById handler:', error);
    return errorResponse(res, 'Terjadi kesalahan server saat mengambil data master PDF');
  }
};

/**
 * Handler untuk mendapatkan statistik master PDF
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getStats = async (req, res) => {
  try {
    // Panggil repository untuk mendapatkan statistik
    const stats = await repository.getStats();

    // Format response
    const response = {
      success: true,
      message: 'Statistik master PDF berhasil diambil',
      data: stats
    };

    return baseResponse(res, { data: stats });

  } catch (error) {
    console.error('Error in masterPdf getStats handler:', error);
    return res.status(500).json(
      errorResponse('Terjadi kesalahan server saat mengambil statistik master PDF')
    );
  }
};

/**
 * Handler untuk pencarian master PDF
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const search = async (req, res) => {
  try {
    const {
      search_term = '',
      category = '',
      limit = 50
    } = req.body;

    // Validasi limit
    const limitNum = parseInt(limit);
    if (limitNum < 1 || limitNum > 100) {
      return errorResponse(res, 'Limit harus berupa angka antara 1-100');
    }

    // Panggil repository untuk pencarian
    const results = await repository.search({
      search_term,
      category,
      limit: limitNum
    });

    // Format response
    const response = {
      success: true,
      message: 'Pencarian master PDF berhasil',
      data: results,
      total: results.length
    };

    return baseResponse(res, { data: results });

  } catch (error) {
    console.error('Error in masterPdf search handler:', error);
    return res.status(500).json(
      errorResponse('Terjadi kesalahan server saat melakukan pencarian master PDF')
    );
  }
};

/**
 * Handler untuk mendapatkan daftar kategori
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getCategories = async (req, res) => {
  try {
    // Panggil repository untuk mendapatkan kategori
    const categories = await repository.getCategories();

    // Format response
    const response = {
      success: true,
      message: 'Daftar kategori berhasil diambil',
      data: categories
    };

    return baseResponse(res, { data: categories });

  } catch (error) {
    console.error('Error in masterPdf getCategories handler:', error);
    return res.status(500).json(
      errorResponse('Terjadi kesalahan server saat mengambil daftar kategori')
    );
  }
};


module.exports = {
  getAll,
  getById,
  getStats,
  search,
  getCategories
};
