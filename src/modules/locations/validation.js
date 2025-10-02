const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating location
 */
const createValidation = [
  body('location_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama lokasi maksimal 255 karakter')
    .trim(),
  body('location_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Kode lokasi maksimal 255 karakter')
    .trim(),
  body('location_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Deskripsi lokasi maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for updating location
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('location_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama lokasi maksimal 255 karakter')
    .trim(),
  body('location_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Kode lokasi maksimal 255 karakter')
    .trim(),
  body('location_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Deskripsi lokasi maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for getting location by ID
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

module.exports = {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation
};
