const { body, param } = require('express-validator');

/**
 * Validation rules for getting list with filters
 */
const getListValidation = [
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
    .isString()
    .withMessage('Sort by harus berupa string'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order harus asc atau desc'),
  body('master_pdf_id')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      // Validate UUID format only if value is not empty
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Master PDF ID harus berupa UUID yang valid');
      }
      return true;
    })
];

/**
 * Validation rules for creating item
 */
const createValidation = [
  body('name_pdf')
    .notEmpty()
    .withMessage('Name PDF wajib diisi')
    .isString()
    .withMessage('Name PDF harus berupa string')
    .trim(),
  body('data_items')
    .notEmpty()
    .withMessage('Data items wajib diisi')
    .isArray({ min: 1 })
    .withMessage('Data items harus berupa array dengan minimal 1 item'),
  body('data_items.*.steering_id')
    .optional()
    .isUUID()
    .withMessage('Steering ID harus berupa UUID yang valid'),
  body('data_items.*.type_steering_id')
    .optional()
    .isUUID()
    .withMessage('Type Steering ID harus berupa UUID yang valid'),
  body('data_items.*.target_id')
    .optional()
    .isString()
    .withMessage('Target ID harus berupa string'),
  body('data_items.*.diagram_serial_number')
    .optional()
    .isString()
    .withMessage('Diagram serial number harus berupa string'),
  body('data_items.*.part_number')
    .optional()
    .isString()
    .withMessage('Part number harus berupa string'),
  body('data_items.*.catalog_item_name_en')
    .optional()
    .isString()
    .withMessage('Catalog item name (EN) harus berupa string'),
  body('data_items.*.catalog_item_name_ch')
    .optional()
    .isString()
    .withMessage('Catalog item name (CH) harus berupa string'),
  body('data_items.*.description')
    .optional()
    .isString()
    .withMessage('Description harus berupa string'),
  body('data_items.*.quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity harus berupa angka positif atau 0')
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
  body('name_pdf')
    .notEmpty()
    .withMessage('Name PDF wajib diisi')
    .isString()
    .withMessage('Name PDF harus berupa string')
    .trim(),
  body('data_items')
    .notEmpty()
    .withMessage('Data items wajib diisi')
    .isArray({ min: 1 })
    .withMessage('Data items harus berupa array dengan minimal 1 item'),
  body('data_items.*.steering_id')
    .optional()
    .isUUID()
    .withMessage('Steering ID harus berupa UUID yang valid'),
  body('data_items.*.type_steering_id')
    .optional()
    .isUUID()
    .withMessage('Type Steering ID harus berupa UUID yang valid'),
  body('data_items.*.target_id')
    .optional()
    .isString()
    .withMessage('Target ID harus berupa string'),
  body('data_items.*.diagram_serial_number')
    .optional()
    .isString()
    .withMessage('Diagram serial number harus berupa string'),
  body('data_items.*.part_number')
    .optional()
    .isString()
    .withMessage('Part number harus berupa string'),
  body('data_items.*.catalog_item_name_en')
    .optional()
    .isString()
    .withMessage('Catalog item name (EN) harus berupa string'),
  body('data_items.*.catalog_item_name_ch')
    .optional()
    .isString()
    .withMessage('Catalog item name (CH) harus berupa string'),
  body('data_items.*.description')
    .optional()
    .isString()
    .withMessage('Description harus berupa string'),
  body('data_items.*.quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity harus berupa angka positif atau 0')
];

/**
 * Validation rules for getting item by ID
 */
const getByIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid')
];

/**
 * Validation rules for delete
 */
const deleteValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid')
];

module.exports = {
  getListValidation,
  createValidation,
  updateValidation,
  getByIdValidation,
  deleteValidation
};

