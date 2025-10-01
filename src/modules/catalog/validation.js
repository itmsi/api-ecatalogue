const { body, param } = require('express-validator');

/**
 * Validation rules for creating catalog
 */
const createValidation = [
  body('category_id')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value || value === '') return true;
      // Validasi UUID hanya jika ada nilai
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    })
    .withMessage('Format category_id tidak valid'),
  body('catalog_parent_id')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value || value === '') return true;
      // Validasi UUID hanya jika ada nilai
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    })
    .withMessage('Format catalog_parent_id tidak valid'),
  body('catalog_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Catalog name (EN) maksimal 255 karakter')
    .trim(),
  body('catalog_name_ch')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Catalog name (CH) maksimal 255 karakter')
    .trim(),
  body('catalog_quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Catalog quantity harus berupa angka positif'),
  body('catalog_image')
    .optional()
    .trim(),
  body('catalog_description')
    .optional()
    .trim(),
];

/**
 * Validation rules for updating catalog
 */
const updateValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID wajib diisi')
    .isUUID()
    .withMessage('Format ID tidak valid'),
  body('category_id')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value || value === '') return true;
      // Validasi UUID hanya jika ada nilai
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    })
    .withMessage('Format category_id tidak valid'),
  body('catalog_parent_id')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value || value === '') return true;
      // Validasi UUID hanya jika ada nilai
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    })
    .withMessage('Format catalog_parent_id tidak valid'),
  body('catalog_name_en')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Catalog name (EN) maksimal 255 karakter')
    .trim(),
  body('catalog_name_ch')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Catalog name (CH) maksimal 255 karakter')
    .trim(),
  body('catalog_quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Catalog quantity harus berupa angka positif'),
  body('catalog_image')
    .optional()
    .trim(),
  body('catalog_description')
    .optional()
    .trim(),
];

/**
 * Validation rules for getting catalog by ID
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
  body('category_id')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value || value === '') return true;
      // Validasi UUID hanya jika ada nilai
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    })
    .withMessage('Format category_id tidak valid'),
  body('catalog_parent_id')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value || value === '') return true;
      // Validasi UUID hanya jika ada nilai
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    })
    .withMessage('Format catalog_parent_id tidak valid'),
  body('search')
    .optional()
    .isString()
    .withMessage('Search harus berupa string')
    .trim(),
  body('sort_by')
    .optional()
    .isString()
    .withMessage('Sort by harus berupa string'),
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

