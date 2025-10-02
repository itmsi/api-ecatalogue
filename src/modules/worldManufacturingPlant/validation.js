const { body, param } = require('express-validator');

/**
 * Validation rules for creating world manufacturing plant
 */
const createValidation = [
  body('world_manufacturing_plant_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Kode pabrik maksimal 255 karakter')
    .trim(),
  body('world_manufacturing_plant_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama pabrik maksimal 255 karakter')
    .trim(),
  body('world_manufacturing_plant_description')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Deskripsi maksimal 2000 karakter')
    .trim(),
];

/**
 * Validation rules for updating world manufacturing plant
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('world_manufacturing_plant_code')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Kode pabrik maksimal 255 karakter')
    .trim(),
  body('world_manufacturing_plant_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Nama pabrik maksimal 255 karakter')
    .trim(),
  body('world_manufacturing_plant_description')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Deskripsi maksimal 2000 karakter')
    .trim(),
];

/**
 * Validation rules for getting world manufacturing plant by ID
 */
const getByIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
];

/**
 * Validation rules for list with pagination (POST /get endpoint)
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
    .isIn(['created_at', 'updated_at', 'world_manufacturing_plant_name', 'world_manufacturing_plant_code'])
    .withMessage('Sort by harus sesuai field yang tersedia'),
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
