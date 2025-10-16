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
    }),
  body('master_catalog')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true; // Allow empty string, null, or undefined
      }
      // Validate enum values only if value is not empty
      const allowedValues = ['engine', 'axle', 'cabin', 'steering', 'transmission'];
      if (!allowedValues.includes(value)) {
        throw new Error('master_catalog harus berupa: engine, axle, cabin, steering, atau transmission');
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
  body('master_catalog')
    .notEmpty()
    .withMessage('master_catalog wajib diisi')
    .isIn(['engine', 'axle', 'cabin', 'steering', 'transmission'])
    .withMessage('master_catalog harus berupa: engine, axle, cabin, steering, atau transmission'),
  body('master_category_id')
    .optional()
    .custom((value) => {
      if (!value || value === '' || value === null || value === undefined) {
        return true;
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Master Category ID harus berupa UUID yang valid');
      }
      return true;
    }),
  body('type_category_id')
    .optional()
    .custom((value) => {
      if (!value || value === '' || value === null || value === undefined) {
        return true;
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Type Category ID harus berupa UUID yang valid');
      }
      return true;
    }),
  body('use_csv')
    .optional()
    .isIn(['true', 'false', true, false])
    .withMessage('use_csv harus berupa boolean (true/false)')
    .customSanitizer(value => {
      if (value === 'true' || value === true) return true;
      if (value === 'false' || value === false) return false;
      return value;
    }),
  body('data_items')
    .optional()
    .custom((value, { req }) => {
      // Jika use_csv = false, maka data_items wajib diisi
      const useCsv = req.body.use_csv === 'true' || req.body.use_csv === true;
      if (!useCsv && !value) {
        throw new Error('data_items wajib diisi jika use_csv = false');
      }
      return true;
    })
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
  body('master_catalog')
    .notEmpty()
    .withMessage('master_catalog wajib diisi')
    .isIn(['engine', 'axle', 'cabin', 'steering', 'transmission'])
    .withMessage('master_catalog harus berupa: engine, axle, cabin, steering, atau transmission'),
  body('master_category_id')
    .optional()
    .custom((value) => {
      if (!value || value === '' || value === null || value === undefined) {
        return true;
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Master Category ID harus berupa UUID yang valid');
      }
      return true;
    }),
  body('type_category_id')
    .optional()
    .custom((value) => {
      if (!value || value === '' || value === null || value === undefined) {
        return true;
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Type Category ID harus berupa UUID yang valid');
      }
      return true;
    }),
  body('use_csv')
    .optional()
    .isIn(['true', 'false', true, false])
    .withMessage('use_csv harus berupa boolean (true/false)')
    .customSanitizer(value => {
      if (value === 'true' || value === true) return true;
      if (value === 'false' || value === false) return false;
      return value;
    }),
  body('data_items')
    .optional()
    .custom((value, { req }) => {
      // Jika use_csv = false, maka data_items wajib diisi
      const useCsv = req.body.use_csv === 'true' || req.body.use_csv === true;
      if (!useCsv && !value) {
        throw new Error('data_items wajib diisi jika use_csv = false');
      }
      return true;
    })
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
