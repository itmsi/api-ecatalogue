const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating category
 */
const createValidation = [
  body('category_name')
    .notEmpty()
    .withMessage('Nama kategori wajib diisi')
    .isLength({ min: 3, max: 255 })
    .withMessage('Nama kategori harus antara 3-255 karakter')
    .trim(),
  body('category_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Deskripsi kategori maksimal 1000 karakter')
    .trim(),
  // created_by akan diisi otomatis dari token, tidak perlu dari body
];

/**
 * Validation rules for updating category
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('category_name')
    .optional()
    .isLength({ min: 3, max: 255 })
    .withMessage('Nama kategori harus antara 3-255 karakter')
    .trim(),
  body('category_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Deskripsi kategori maksimal 1000 karakter')
    .trim(),
  // updated_by akan diisi otomatis dari token, tidak perlu dari body
];

/**
 * Validation rules for getting category by ID
 */
const getByIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
];

/**
 * Validation rules for list with pagination
 */
const listValidation = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page harus berupa angka positif'),
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit harus antara 1-100'),
  body('sort_by')
    .optional()
    .isString()
    .withMessage('Sort by harus berupa string'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
  body('search')
    .optional()
    .isString()
    .withMessage('Search harus berupa string')
    .trim(),
];

/**
 * Validation rules for search categories
 */
const searchValidation = [
  query('search')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Kata kunci pencarian harus antara 1-255 karakter')
    .trim(),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page harus berupa angka positif'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit harus antara 1-100'),
];

/**
 * Validation rules for restore category
 */
const restoreValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  // updated_by akan diisi otomatis dari token saat restore
];

module.exports = {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation,
  searchValidation,
  restoreValidation
};
