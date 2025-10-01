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
  body('created_by')
    .optional()
    .isUUID()
    .withMessage('Format created_by tidak valid'),
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
  body('updated_by')
    .optional()
    .isUUID()
    .withMessage('Format updated_by tidak valid'),
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
  body('updated_by')
    .optional()
    .isUUID()
    .withMessage('Format updated_by tidak valid'),
];

module.exports = {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation,
  searchValidation,
  restoreValidation
};
