const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating type cabine
 */
const createValidation = [
  body('type_cabine_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type cabine name EN maksimal 255 karakter')
    .trim(),
  body('type_cabine_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type cabine name CN maksimal 255 karakter')
    .trim(),
  body('type_cabine_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Type cabine description maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for updating type cabine
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('type_cabine_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type cabine name EN maksimal 255 karakter')
    .trim(),
  body('type_cabine_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type cabine name CN maksimal 255 karakter')
    .trim(),
  body('type_cabine_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Type cabine description maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for getting type cabine by ID
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
    .isIn(['created_at', 'updated_at', 'type_cabine_name_en', 'type_cabine_name_cn'])
    .withMessage('Sort by harus salah satu dari: created_at, updated_at, type_cabine_name_en, type_cabine_name_cn'),
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
