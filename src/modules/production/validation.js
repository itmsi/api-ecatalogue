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
    .isLength({ max: 50 })
    .withMessage('Production sequence number maksimal 50 karakter')
    .trim(),
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
  body('production_location_id')
    .optional()
    .isUUID()
    .withMessage('Format Production Location ID tidak valid'),
  body('production_brand_id')
    .optional()
    .isUUID()
    .withMessage('Format Production Brand ID tidak valid'),
  body('production_driver_type_id')
    .optional()
    .isUUID()
    .withMessage('Format Production Driver Type ID tidak valid'),
  body('production_vehicle_weight_id')
    .optional()
    .isUUID()
    .withMessage('Format Production Vehicle Weight ID tidak valid'),
  body('production_world_manufacturing_plant_id')
    .optional()
    .isUUID()
    .withMessage('Format Production World Manufacturing Plant ID tidak valid'),
  body('data_details')
    .optional()
    .isArray()
    .withMessage('Data details harus berupa array'),
  body('data_details.*.production_detail_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Production detail description maksimal 1000 karakter')
    .trim(),
  body('data_details.*.engine_id')
    .optional()
    .isUUID()
    .withMessage('Format Engine ID tidak valid'),
  body('data_details.*.steering_id')
    .optional()
    .isUUID()
    .withMessage('Format Steering ID tidak valid'),
  body('data_details.*.cabine_id')
    .optional()
    .isUUID()
    .withMessage('Format Cabine ID tidak valid'),
  body('data_details.*.axle_id')
    .optional()
    .isUUID()
    .withMessage('Format Axle ID tidak valid'),
  body('data_details.*.transmission_id')
    .optional()
    .isUUID()
    .withMessage('Format Transmission ID tidak valid'),
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
    .isLength({ max: 50 })
    .withMessage('Production sequence number maksimal 50 karakter')
    .trim(),
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
  body('production_location_id')
    .optional()
    .isUUID()
    .withMessage('Format Production Location ID tidak valid'),
  body('production_brand_id')
    .optional()
    .isUUID()
    .withMessage('Format Production Brand ID tidak valid'),
  body('production_driver_type_id')
    .optional()
    .isUUID()
    .withMessage('Format Production Driver Type ID tidak valid'),
  body('production_vehicle_weight_id')
    .optional()
    .isUUID()
    .withMessage('Format Production Vehicle Weight ID tidak valid'),
  body('production_world_manufacturing_plant_id')
    .optional()
    .isUUID()
    .withMessage('Format Production World Manufacturing Plant ID tidak valid'),
  body('data_details')
    .optional()
    .isArray()
    .withMessage('Data details harus berupa array'),
  body('data_details.*.production_detail_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Production detail description maksimal 1000 karakter')
    .trim(),
  body('data_details.*.engine_id')
    .optional()
    .isUUID()
    .withMessage('Format Engine ID tidak valid'),
  body('data_details.*.steering_id')
    .optional()
    .isUUID()
    .withMessage('Format Steering ID tidak valid'),
  body('data_details.*.cabine_id')
    .optional()
    .isUUID()
    .withMessage('Format Cabine ID tidak valid'),
  body('data_details.*.axle_id')
    .optional()
    .isUUID()
    .withMessage('Format Axle ID tidak valid'),
  body('data_details.*.transmission_id')
    .optional()
    .isUUID()
    .withMessage('Format Transmission ID tidak valid'),
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
