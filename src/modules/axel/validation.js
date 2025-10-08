const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating axel
 */
const createValidation = [
  body('axel_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama axel dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('axel_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama axel dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('axel_description')
    .optional()
    .isString()
    .withMessage('Deskripsi axel optional')
    .trim(),
  body('type_axels')
    .optional()
    .isArray()
    .withMessage('Type axels harus berupa array'),
  body('type_axels.*.type_axel_name_en')
    .optional()
    .isString()
    .withMessage('Type axel name EN harus berupa string'),
  body('type_axels.*.type_axel_name_cn')
    .optional()
    .isString()
    .withMessage('Type axel name CN harus berupa string'),
  body('type_axels.*.type_axel_description')
    .optional()
    .isString()
    .withMessage('Type axel description harus berupa string'),
];

/**
 * Validation rules for updating axel
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('axel_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama axel dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('axel_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama axel dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('axel_description')
    .optional()
    .isString()
    .withMessage('Deskripsi axel optional')
    .trim(),
  body('type_axels')
    .optional()
    .isArray()
    .withMessage('Type axels harus berupa array'),
  body('type_axels.*.type_axel_name_en')
    .optional()
    .isString()
    .withMessage('Type axel name EN harus berupa string'),
  body('type_axels.*.type_axel_name_cn')
    .optional()
    .isString()
    .withMessage('Type axel name CN harus berupa string'),
  body('type_axels.*.type_axel_description')
    .optional()
    .isString()
    .withMessage('Type axel description harus berupa string'),
];

/**
 * Validation rules for getting axel by ID
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
    .isIn(['created_at', 'axel_name_en', 'axel_name_cn', 'updated_at'])
    .withMessage('Sort by harus salah satu dari: created_at, axel_name_en, axel_name_cn, updated_at'),
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

