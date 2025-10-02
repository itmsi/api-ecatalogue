const { body } = require('express-validator');

/**
 * Validation rules for getting sidebars with filters
 */
const getSidebarsValidation = [
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
    .isIn(['created_at', 'updated_at', 'catalog_name_en', 'category_name_en'])
    .withMessage('Sort by hanya bisa: created_at, updated_at, catalog_name_en, category_name_en'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order hanya bisa: asc atau desc'),
  body('vin_number')
    .optional()
    .isLength({ max: 50 })
    .withMessage('VIN number maksimal 50 karakter')
    .trim(),
];

module.exports = {
  getSidebarsValidation
};
