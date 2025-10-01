const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation
} = require('./validation');
const { verifyToken } = require('../../middlewares/token');
const { validateMiddleware } = require('../../middlewares/validation');

/**
 * @route   POST /api/catalogs/get
 * @desc    Get all catalogs with pagination and filters
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
 * @route   GET /api/catalogs/:id
 * @desc    Get catalog by ID
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
 * @route   GET /api/catalogs/:id/children
 * @desc    Get children catalogs
 * @access  Protected
 */
router.get(
  '/:id/children',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.getChildren
);

/**
 * @route   POST /api/catalogs/create
 * @desc    Create new catalog
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
 * @route   PUT /api/catalogs/:id
 * @desc    Update catalog
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
 * @route   DELETE /api/catalogs/:id
 * @desc    Soft delete catalog
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
 * @route   POST /api/catalogs/:id/restore
 * @desc    Restore soft deleted catalog
 * @access  Protected
 */
router.post(
  '/:id/restore',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.restore
);

module.exports = router;

