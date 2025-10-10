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
  body('transmission_id')
    .optional({ nullable: true })
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Transmission ID harus berupa UUID yang valid');
      }
      return true;
    }),
  body('type_transmission_id')
    .optional({ nullable: true })
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Type Transmission ID harus berupa UUID yang valid');
      }
      return true;
    }),
  body('use_csv')
    .notEmpty()
    .withMessage('use_csv wajib diisi')
    .custom((value) => {
      if (value === 'true' || value === 'false' || value === true || value === false) {
        return true;
      }
      throw new Error('use_csv harus berupa boolean (true atau false)');
    }),
  body('data_items')
    .optional()
    .custom((value, { req }) => {
      const useCsv = req.body.use_csv === 'true' || req.body.use_csv === true;
      
      // Jika use_csv = false, maka data_items wajib diisi
      if (!useCsv && !value) {
        throw new Error('data_items wajib diisi jika use_csv = false');
      }
      
      // Jika data_items diisi, validasi formatnya
      if (value) {
        let items;
        try {
          items = typeof value === 'string' ? JSON.parse(value) : value;
        } catch (e) {
          throw new Error('data_items harus berupa JSON array yang valid');
        }
        
        if (!Array.isArray(items) || items.length === 0) {
          throw new Error('data_items harus berupa array dengan minimal 1 item');
        }
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
  body('transmission_id')
    .optional({ nullable: true })
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Transmission ID harus berupa UUID yang valid');
      }
      return true;
    }),
  body('type_transmission_id')
    .optional({ nullable: true })
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Type Transmission ID harus berupa UUID yang valid');
      }
      return true;
    }),
  body('use_csv')
    .notEmpty()
    .withMessage('use_csv wajib diisi')
    .custom((value) => {
      if (value === 'true' || value === 'false' || value === true || value === false) {
        return true;
      }
      throw new Error('use_csv harus berupa boolean (true atau false)');
    }),
  body('data_items')
    .optional()
    .custom((value, { req }) => {
      const useCsv = req.body.use_csv === 'true' || req.body.use_csv === true;
      
      // Jika use_csv = false, maka data_items wajib diisi
      if (!useCsv && !value) {
        throw new Error('data_items wajib diisi jika use_csv = false');
      }
      
      // Jika data_items diisi, validasi formatnya
      if (value) {
        let items;
        try {
          items = typeof value === 'string' ? JSON.parse(value) : value;
        } catch (e) {
          throw new Error('data_items harus berupa JSON array yang valid');
        }
        
        if (!Array.isArray(items) || items.length === 0) {
          throw new Error('data_items harus berupa array dengan minimal 1 item');
        }
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

