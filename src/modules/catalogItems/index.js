const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation,
  importCsvValidation
} = require('./validation');
const { verifyToken } = require('../../middlewares/token');
const { validateMiddleware } = require('../../middlewares/validation');
const { handleFileUpload } = require('../../middlewares/fileUpload');

/**
 * @route   POST /api/catalogs/catalogItems/get
 * @desc    Get all catalog items with pagination
 * @access  Protected
 */
router.post(
  '/get',
  verifyToken,
  listValidation,
  validateMiddleware,
  handler.getAll
);

/**
 * @route   GET /api/catalogs/catalogItems/:id
 * @desc    Get catalog item by ID
 * @access  Protected
 */
router.get(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.getById
);

/**
 * @route   POST /api/catalogs/catalogItems/create
 * @desc    Create new catalog item
 * @access  Protected
 */
router.post(
  '/create',
  verifyToken,
  createValidation,
  validateMiddleware,
  handler.create
);

/**
 * @route   PUT /api/catalogs/catalogItems/:id
 * @desc    Update catalog item
 * @access  Protected
 */
router.put(
  '/:id',
  verifyToken,
  updateValidation,
  validateMiddleware,
  handler.update
);

/**
 * @route   DELETE /api/catalogs/catalogItems/:id
 * @desc    Soft delete catalog item
 * @access  Protected
 */
router.delete(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.remove
);

/**
 * @route   POST /api/catalogs/catalogItems/:id/restore
 * @desc    Restore soft deleted catalog item
 * @access  Protected
 */
router.post(
  '/:id/restore',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.restore
);

/**
 * @route   POST /api/catalogs/catalogItems/import
 * @desc    Import catalog items from CSV
 * @access  Protected
 */
router.post(
  '/import',
  verifyToken,
  handleFileUpload,
  importCsvValidation,
  validateMiddleware,
  handler.importCsv
);

module.exports = router;
