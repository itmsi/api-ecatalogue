const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating cabines
 */
const createValidation = [
  body('cabines_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama cabines dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('cabines_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama cabines dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('cabines_description')
    .optional()
    .isString()
    .withMessage('Deskripsi cabines optional')
    .trim(),
  body('type_cabines')
    .optional()
    .isArray()
    .withMessage('Type cabines harus berupa array'),
  body('type_cabines.*.type_cabine_name_en')
    .optional()
    .isString()
    .withMessage('Type cabine name EN harus berupa string'),
  body('type_cabines.*.type_cabine_name_cn')
    .optional()
    .isString()
    .withMessage('Type cabine name CN harus berupa string'),
  body('type_cabines.*.type_cabine_description')
    .optional()
    .isString()
    .withMessage('Type cabine description harus berupa string'),
];

/**
 * Validation rules for updating cabines
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('cabines_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama cabines dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('cabines_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama cabines dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('cabines_description')
    .optional()
    .isString()
    .withMessage('Deskripsi cabines optional')
    .trim(),
  body('type_cabines')
    .optional()
    .isArray()
    .withMessage('Type cabines harus berupa array'),
  body('type_cabines.*.type_cabine_name_en')
    .optional()
    .isString()
    .withMessage('Type cabine name EN harus berupa string'),
  body('type_cabines.*.type_cabine_name_cn')
    .optional()
    .isString()
    .withMessage('Type cabine name CN harus berupa string'),
  body('type_cabines.*.type_cabine_description')
    .optional()
    .isString()
    .withMessage('Type cabine description harus berupa string'),
];

/**
 * Validation rules for getting cabines by ID
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
    .isIn(['created_at', 'cabines_name_en', 'cabines_name_cn', 'updated_at'])
    .withMessage('Sort by harus salah satu dari: created_at, cabines_name_en, cabines_name_cn, updated_at'),
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
