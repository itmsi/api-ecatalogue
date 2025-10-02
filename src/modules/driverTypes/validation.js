const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating driver type
 */
const createValidation = [
  body('driver_type_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama tipe driver maksimal 255 karakter')
    .trim(),
  body('driver_type_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Kode tipe driver maksimal 255 karakter')
    .trim(),
  body('driver_type_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Deskripsi tipe driver maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for updating driver type
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('driver_type_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama tipe driver maksimal 255 karakter')
    .trim(),
  body('driver_type_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Kode tipe driver maksimal 255 karakter')
    .trim(),
  body('driver_type_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Deskripsi tipe driver maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for getting driver type by ID
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
  body('search')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Search maksimal 255 karakter')
    .trim(),
  body('sort_by')
    .optional()
    .isIn(['driver_type_id', 'driver_type_name', 'driver_type_code', 'created_at', 'updated_at'])
    .withMessage('Sort by harus salah satu dari: driver_type_id, driver_type_name, driver_type_code, created_at, updated_at'),
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
