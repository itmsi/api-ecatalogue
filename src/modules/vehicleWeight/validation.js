const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating vehicle weight
 */
const createValidation = [
  body('vehicle_weight_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Kode berat kendaraan maksimal 255 karakter')
    .trim(),
  body('vehicle_weight_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama berat kendaraan maksimal 255 karakter')
    .trim(),
  body('vehicle_weight_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Deskripsi berat kendaraan maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for updating vehicle weight
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('vehicle_weight_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Kode berat kendaraan maksimal 255 karakter')
    .trim(),
  body('vehicle_weight_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama berat kendaraan maksimal 255 karakter')
    .trim(),
  body('vehicle_weight_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Deskripsi berat kendaraan maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for getting vehicle weight by ID
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
    .isIn(['vehicle_weight_id', 'vehicle_weight_code', 'vehicle_weight_name', 'created_at', 'updated_at'])
    .withMessage('Sort by harus salah satu dari: vehicle_weight_id, vehicle_weight_code, vehicle_weight_name, created_at, updated_at'),
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
