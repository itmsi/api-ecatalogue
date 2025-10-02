const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating production
 */
const createValidation = [
  body('vin_number')
    .optional()
    .isLength({ max: 255 })
    .withMessage('VIN number maksimal 255 karakter')
    .trim(),
  body('production_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Production name EN maksimal 255 karakter')
    .trim(),
  body('production_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Production name CN maksimal 255 karakter')
    .trim(),
  body('production_sequence_number')
    .optional()
    .isInt()
    .withMessage('Production sequence number harus berupa angka'),
  body('production_month')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Production month maksimal 50 karakter')
    .trim(),
  body('production_year')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Production year maksimal 50 karakter')
    .trim(),
  body('production_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Production description maksimal 1000 karakter')
    .trim(),
  body('location_id')
    .optional()
    .isUUID()
    .withMessage('Format Location ID tidak valid'),
  body('brand_id')
    .optional()
    .isUUID()
    .withMessage('Format Brand ID tidak valid'),
  body('driver_type_id')
    .optional()
    .isUUID()
    .withMessage('Format Driver Type ID tidak valid'),
  body('vehicle_weight_id')
    .optional()
    .isUUID()
    .withMessage('Format Vehicle Weight ID tidak valid'),
  body('world_manufacturing_plant_id')
    .optional()
    .isUUID()
    .withMessage('Format World Manufacturing Plant ID tidak valid'),
];

/**
 * Validation rules for updating production
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('vin_number')
    .optional()
    .isLength({ max: 255 })
    .withMessage('VIN number maksimal 255 karakter')
    .trim(),
  body('production_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Production name EN maksimal 255 karakter')
    .trim(),
  body('production_name_cn')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Production name CN maksimal 255 karakter')
    .trim(),
  body('production_sequence_number')
    .optional()
    .isInt()
    .withMessage('Production sequence number harus berupa angka'),
  body('production_month')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Production month maksimal 50 karakter')
    .trim(),
  body('production_year')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Production year maksimal 50 karakter')
    .trim(),
  body('production_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Production description maksimal 1000 karakter')
    .trim(),
  body('location_id')
    .optional()
    .isUUID()
    .withMessage('Format Location ID tidak valid'),
  body('brand_id')
    .optional()
    .isUUID()
    .withMessage('Format Brand ID tidak valid'),
  body('driver_type_id')
    .optional()
    .isUUID()
    .withMessage('Format Driver Type ID tidak valid'),
  body('vehicle_weight_id')
    .optional()
    .isUUID()
    .withMessage('Format Vehicle Weight ID tidak valid'),
  body('world_manufacturing_plant_id')
    .optional()
    .isUUID()
    .withMessage('Format World Manufacturing Plant ID tidak valid'),
];

/**
 * Validation rules for creating production (POST body)
 */
const createProductionValidation = [
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
    .isIn(['created_at', 'updated_at', 'production_name_en', 'production_name_cn', 'vin_number'])
    .withMessage('Sort by tidak valid'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
];

/**
 * Validation rules for getting production by ID
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
    .isLength({ max: 255 })
    .withMessage('Search maksimal 255 karakter')
    .trim(),
  body('sort_by')
    .optional()
    .isIn(['created_at', 'updated_at', 'production_name_en', 'production_name_cn', 'vin_number'])
    .withMessage('Sort by tidak valid'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
];

module.exports = {
  createValidation,
  updateValidation,
  createProductionValidation,
  getByIdValidation,
  listValidation
};
