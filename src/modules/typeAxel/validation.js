const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating type axel
 */
const createValidation = [
  body('type_axel_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type axel name EN maksimal 255 karakter')
    .trim(),
  body('type_axel_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type axel name CN maksimal 255 karakter')
    .trim(),
  body('type_axel_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Type axel description maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for updating type axel
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('type_axel_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type axel name EN maksimal 255 karakter')
    .trim(),
  body('type_axel_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type axel name CN maksimal 255 karakter')
    .trim(),
  body('type_axel_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Type axel description maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for getting type axel by ID
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
    .isIn(['created_at', 'updated_at', 'type_axel_name_en', 'type_axel_name_cn'])
    .withMessage('Sort by harus salah satu dari: created_at, updated_at, type_axel_name_en, type_axel_name_cn'),
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

