const { body, param } = require('express-validator');

/**
 * Validation rules for creating steering
 */
const createValidation = [
  body('steering_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama steering dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('steering_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama steering dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('steering_description')
    .optional()
    .isString()
    .withMessage('Deskripsi steering optional')
    .trim(),
  body('type_steerings')
    .optional()
    .isArray()
    .withMessage('Type steerings harus berupa array'),
  body('type_steerings.*.type_steering_name_en')
    .optional()
    .isString()
    .withMessage('Type steering name EN harus berupa string'),
  body('type_steerings.*.type_steering_name_cn')
    .optional()
    .isString()
    .withMessage('Type steering name CN harus berupa string'),
  body('type_steerings.*.type_steering_description')
    .optional()
    .isString()
    .withMessage('Type steering description harus berupa string'),
];

/**
 * Validation rules for updating steering
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('steering_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama steering dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('steering_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama steering dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('steering_description')
    .optional()
    .isString()
    .withMessage('Deskripsi steering optional')
    .trim(),
  body('type_steerings')
    .optional()
    .isArray()
    .withMessage('Type steerings harus berupa array'),
  body('type_steerings.*.type_steering_name_en')
    .optional()
    .isString()
    .withMessage('Type steering name EN harus berupa string'),
  body('type_steerings.*.type_steering_name_cn')
    .optional()
    .isString()
    .withMessage('Type steering name CN harus berupa string'),
  body('type_steerings.*.type_steering_description')
    .optional()
    .isString()
    .withMessage('Type steering description harus berupa string'),
];

/**
 * Validation rules for getting steering by ID
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
    .isString()
    .withMessage('Search harus berupa string'),
  body('sort_by')
    .optional()
    .isIn(['created_at', 'steering_name_en', 'steering_name_cn', 'updated_at'])
    .withMessage('Sort by harus salah satu dari: created_at, steering_name_en, steering_name_cn, updated_at'),
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

