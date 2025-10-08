const { body, param } = require('express-validator');

/**
 * Validation rules for getting transmissions with pagination
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
    .isIn(['created_at', 'updated_at', 'transmission_name_en', 'transmission_name_cn'])
    .withMessage('Sort by harus salah satu dari: created_at, updated_at, transmission_name_en, transmission_name_cn'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
];

/**
 * Validation rules for creating transmission
 */
const createValidation = [
  body('transmission_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama transmission dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('transmission_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama transmission dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('transmission_description')
    .optional()
    .isString()
    .withMessage('Deskripsi transmission harus berupa string')
    .trim(),
  body('type_transmissions')
    .optional()
    .isArray()
    .withMessage('Type transmissions harus berupa array'),
  body('type_transmissions.*.type_transmission_name_en')
    .optional()
    .isString()
    .withMessage('Type transmission name EN harus berupa string'),
  body('type_transmissions.*.type_transmission_name_cn')
    .optional()
    .isString()
    .withMessage('Type transmission name CN harus berupa string'),
  body('type_transmissions.*.type_transmission_description')
    .optional()
    .isString()
    .withMessage('Type transmission description harus berupa string'),
];

/**
 * Validation rules for updating transmission
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('transmission_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama transmission dalam bahasa Inggris maksimal 255 karakter')
    .trim(),
  body('transmission_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama transmission dalam bahasa China maksimal 255 karakter')
    .trim(),
  body('transmission_description')
    .optional()
    .isString()
    .withMessage('Deskripsi transmission harus berupa string')
    .trim(),
  body('type_transmissions')
    .optional()
    .isArray()
    .withMessage('Type transmissions harus berupa array'),
  body('type_transmissions.*.type_transmission_name_en')
    .optional()
    .isString()
    .withMessage('Type transmission name EN harus berupa string'),
  body('type_transmissions.*.type_transmission_name_cn')
    .optional()
    .isString()
    .withMessage('Type transmission name CN harus berupa string'),
  body('type_transmissions.*.type_transmission_description')
    .optional()
    .isString()
    .withMessage('Type transmission description harus berupa string'),
];

/**
 * Validation rules for getting transmission by ID
 */
const getByIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
];

/**
 * Validation rules for deleting transmission
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
