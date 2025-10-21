const { body, param, query } = require('express-validator');

/**
 * Validasi untuk mendapatkan data master PDF dengan pagination dan filtering
 */
const getListValidation = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page harus berupa angka positif'),
  
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit harus berupa angka antara 1-100'),
  
  body('search')
    .optional()
    .isString()
    .isLength({ max: 255 })
    .withMessage('Search harus berupa string maksimal 255 karakter'),
  
  body('sort_by')
    .optional()
    .isIn(['id', 'name', 'description', 'category', 'created_at', 'updated_at'])
    .withMessage('Sort by field tidak valid'),
  
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus "asc" atau "desc"'),
  
  body('category')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('Category harus berupa string maksimal 100 karakter')
];

/**
 * Validasi untuk mendapatkan data master PDF berdasarkan ID
 */
const getByIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID master PDF harus disediakan')
    .isUUID()
    .withMessage('ID master PDF harus berupa UUID yang valid')
];

/**
 * Validasi untuk mendapatkan statistik master PDF
 */
const getStatsValidation = [
  // Tidak ada parameter yang diperlukan untuk statistik
];

/**
 * Validasi untuk pencarian master PDF
 */
const searchValidation = [
  body('search_term')
    .optional()
    .isString()
    .isLength({ max: 255 })
    .withMessage('Search term harus berupa string maksimal 255 karakter'),
  
  body('category')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('Category harus berupa string maksimal 100 karakter'),
  
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit harus berupa angka antara 1-100')
];

/**
 * Validasi untuk mendapatkan daftar kategori
 */
const getCategoriesValidation = [
  // Tidak ada parameter yang diperlukan
];

/**
 * Validasi untuk mendapatkan daftar status
 */
const getStatusesValidation = [
  // Tidak ada parameter yang diperlukan
];

/**
 * Custom validation untuk memastikan minimal satu filter diterapkan
 */
const validateAtLeastOneFilter = (req, res, next) => {
  const { search, status, category } = req.body;
  
  if (!search && !status && !category) {
    return res.status(400).json({
      success: false,
      message: 'Minimal satu filter harus diterapkan (search, status, atau category)'
    });
  }
  
  next();
};

/**
 * Custom validation untuk memastikan search term tidak kosong jika disediakan
 */
const validateSearchTerm = (req, res, next) => {
  const { search } = req.body;
  
  if (search && search.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Search term tidak boleh kosong'
    });
  }
  
  next();
};

/**
 * Custom validation untuk memastikan pagination parameter valid
 */
const validatePagination = (req, res, next) => {
  const { page, limit } = req.body;
  
  if (page && (isNaN(page) || page < 1)) {
    return res.status(400).json({
      success: false,
      message: 'Page harus berupa angka positif'
    });
  }
  
  if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
    return res.status(400).json({
      success: false,
      message: 'Limit harus berupa angka antara 1-100'
    });
  }
  
  next();
};

/**
 * Custom validation untuk memastikan sort parameter valid
 */
const validateSort = (req, res, next) => {
  const { sort_by, sort_order } = req.body;
  
  const allowedSortFields = [
    'id', 'name', 'description', 'category', 'created_at', 'updated_at'
  ];
  
  if (sort_by && !allowedSortFields.includes(sort_by)) {
    return res.status(400).json({
      success: false,
      message: `Sort by field tidak valid. Field yang diperbolehkan: ${allowedSortFields.join(', ')}`
    });
  }
  
  if (sort_order && !['asc', 'desc'].includes(sort_order.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: 'Sort order harus "asc" atau "desc"'
    });
  }
  
  next();
};

module.exports = {
  getListValidation,
  getByIdValidation,
  getStatsValidation,
  searchValidation,
  getCategoriesValidation,
  getStatusesValidation,
  validateAtLeastOneFilter,
  validateSearchTerm,
  validatePagination,
  validateSort
};
