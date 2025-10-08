const { body, param } = require('express-validator');

/**
 * Validation rules for getting list with pagination
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
    .withMessage('Search harus berupa string')
    .trim(),
  body('sort_by')
    .optional()
    .isIn(['engines_id', 'engines_name_en', 'engines_name_cn', 'created_at', 'updated_at'])
    .withMessage('Sort by harus salah satu dari: engines_id, engines_name_en, engines_name_cn, created_at, updated_at'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
];

/**
 * Validation rules for creating item
 */
const createValidation = [
  body('engines_name_en')
    .optional()
    .isString()
    .withMessage('Engines name EN harus berupa string')
    .isLength({ max: 255 })
    .withMessage('Engines name EN maksimal 255 karakter')
    .trim(),
  body('engines_name_cn')
    .optional()
    .isString()
    .withMessage('Engines name CN harus berupa string')
    .isLength({ max: 255 })
    .withMessage('Engines name CN maksimal 255 karakter')
    .trim(),
  body('engines_description')
    .optional()
    .isString()
    .withMessage('Engines description harus berupa string')
    .trim(),
  body('type_engines')
    .optional()
    .isArray()
    .withMessage('Type engines harus berupa array'),
  body('type_engines.*.type_engine_name_en')
    .optional()
    .isString()
    .withMessage('Type engine name EN harus berupa string')
    .isLength({ max: 255 })
    .withMessage('Type engine name EN maksimal 255 karakter')
    .trim(),
  body('type_engines.*.type_engine_name_cn')
    .optional()
    .isString()
    .withMessage('Type engine name CN harus berupa string')
    .isLength({ max: 255 })
    .withMessage('Type engine name CN maksimal 255 karakter')
    .trim(),
  body('type_engines.*.type_engine_description')
    .optional()
    .isString()
    .withMessage('Type engine description harus berupa string')
    .trim(),
];

/**
 * Validation rules for updating item
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('engines_name_en')
    .optional()
    .isString()
    .withMessage('Engines name EN harus berupa string')
    .isLength({ max: 255 })
    .withMessage('Engines name EN maksimal 255 karakter')
    .trim(),
  body('engines_name_cn')
    .optional()
    .isString()
    .withMessage('Engines name CN harus berupa string')
    .isLength({ max: 255 })
    .withMessage('Engines name CN maksimal 255 karakter')
    .trim(),
  body('engines_description')
    .optional()
    .isString()
    .withMessage('Engines description harus berupa string')
    .trim(),
  body('type_engines')
    .optional()
    .isArray()
    .withMessage('Type engines harus berupa array'),
  body('type_engines.*.type_engine_name_en')
    .optional()
    .isString()
    .withMessage('Type engine name EN harus berupa string')
    .isLength({ max: 255 })
    .withMessage('Type engine name EN maksimal 255 karakter')
    .trim(),
  body('type_engines.*.type_engine_name_cn')
    .optional()
    .isString()
    .withMessage('Type engine name CN harus berupa string')
    .isLength({ max: 255 })
    .withMessage('Type engine name CN maksimal 255 karakter')
    .trim(),
  body('type_engines.*.type_engine_description')
    .optional()
    .isString()
    .withMessage('Type engine description harus berupa string')
    .trim(),
];

/**
 * Validation rules for getting item by ID
 */
const getByIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
];

/**
 * Validation rules for deleting item
 */
const deleteValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
];

module.exports = {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation,
  deleteValidation
};
