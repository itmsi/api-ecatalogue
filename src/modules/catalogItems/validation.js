const { body, param, query } = require('express-validator');

/**
 * Validation rules for creating catalog item
 */
const createValidation = [
  body('catalog_id')
    .optional()
    .isUUID()
    .withMessage('Catalog ID harus berupa UUID yang valid'),
  body('target_id')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Target ID maksimal 255 karakter')
    .trim(),
  body('diagram_serial_number')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Diagram serial number maksimal 255 karakter')
    .trim(),
  body('part_number')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Part number maksimal 255 karakter')
    .trim(),
  body('catalog_item_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Catalog item name EN maksimal 255 karakter')
    .trim(),
  body('catalog_item_name_ch')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Catalog item name CH maksimal 255 karakter')
    .trim(),
  body('catalog_item_quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Catalog item quantity harus berupa angka positif'),
  body('catalog_item_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Catalog item description maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for updating catalog item
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('catalog_id')
    .optional()
    .isUUID()
    .withMessage('Catalog ID harus berupa UUID yang valid'),
  body('target_id')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Target ID maksimal 255 karakter')
    .trim(),
  body('diagram_serial_number')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Diagram serial number maksimal 255 karakter')
    .trim(),
  body('part_number')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Part number maksimal 255 karakter')
    .trim(),
  body('catalog_item_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Catalog item name EN maksimal 255 karakter')
    .trim(),
  body('catalog_item_name_ch')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Catalog item name CH maksimal 255 karakter')
    .trim(),
  body('catalog_item_quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Catalog item quantity harus berupa angka positif'),
  body('catalog_item_description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Catalog item description maksimal 1000 karakter')
    .trim(),
];

/**
 * Validation rules for getting catalog item by ID
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
    .isIn(['created_at', 'updated_at', 'catalog_item_name_en', 'catalog_item_name_ch', 'part_number', 'target_id'])
    .withMessage('Sort by harus salah satu dari: created_at, updated_at, catalog_item_name_en, catalog_item_name_ch, part_number, target_id'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
  body('catalog_id')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true; // Allow empty string, null, or undefined
      }
      // If value is provided, it must be a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Catalog ID harus berupa UUID yang valid');
      }
      return true;
    }),
];

/**
 * Validation rules for CSV import
 */
const importCsvValidation = [
  // File validation will be handled by multer middleware
];

module.exports = {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation,
  importCsvValidation
};
