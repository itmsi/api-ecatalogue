const { body, param } = require('express-validator');

/**
 * Validation rules for getting type steerings with pagination
 */
const getValidation = [
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
    .isString()
    .isLength({ max: 255 })
    .withMessage('Search maksimal 255 karakter')
    .trim(),
  body('sort_by')
    .optional()
    .isIn(['created_at', 'updated_at', 'type_steering_name_en', 'type_steering_name_cn'])
    .withMessage('Sort by harus salah satu dari: created_at, updated_at, type_steering_name_en, type_steering_name_cn'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
];

/**
 * Validation rules for creating type steering
 */
const createValidation = [
  body('type_steering_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama type steering dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('type_steering_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama type steering dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('type_steering_description')
    .optional()
    .isString()
    .withMessage('Deskripsi type steering harus berupa string')
    .trim(),
];

/**
 * Validation rules for updating type steering
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('type_steering_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama type steering dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('type_steering_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama type steering dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('type_steering_description')
    .optional()
    .isString()
    .withMessage('Deskripsi type steering harus berupa string')
    .trim(),
];

/**
 * Validation rules for getting type steering by ID
 */
const getByIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
];

/**
 * Validation rules for deleting type steering
 */
const deleteValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
];

module.exports = {
  getValidation,
  createValidation,
  updateValidation,
  getByIdValidation,
  deleteValidation
};

