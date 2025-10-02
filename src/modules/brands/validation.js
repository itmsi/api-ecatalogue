const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating brand
 */
const createValidation = [
  body('brand_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Brand code maksimal 255 karakter')
    .trim(),
  body('brand_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Brand name maksimal 255 karakter')
    .trim(),
  body('brand_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Brand description maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for updating brand
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('brand_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Brand code maksimal 255 karakter')
    .trim(),
  body('brand_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Brand name maksimal 255 karakter')
    .trim(),
  body('brand_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Brand description maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for getting brand by ID
 */
const getByIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
];

/**
 * Validation rules for list with pagination and filters
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
  body('search')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Search maksimal 255 karakter')
    .trim(),
  body('sort_by')
    .optional()
    .isIn(['created_at', 'updated_at', 'brand_name', 'brand_code'])
    .withMessage('Sort by harus salah satu dari: created_at, updated_at, brand_name, brand_code'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
];

module.exports = {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation
};
