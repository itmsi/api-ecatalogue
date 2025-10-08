const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation
} = require('./validation');
const { verifyToken } = require('../../middlewares');
const { validateMiddleware } = require('../../middlewares/validation');

/**
 * @route   POST /api/catalogs/cabines/get
 * @desc    Get all cabines with pagination, search, and filtering
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
 * @route   GET /api/catalogs/cabines/:id
 * @desc    Get cabines by ID with type_cabines
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
 * @route   POST /api/catalogs/cabines/create
 * @desc    Create new cabines with type_cabines
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
 * @route   PUT /api/catalogs/cabines/:id
 * @desc    Update cabines with type_cabines
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
 * @route   DELETE /api/catalogs/cabines/:id
 * @desc    Soft delete cabines
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
 * @route   POST /api/catalogs/cabines/:id/restore
 * @desc    Restore soft deleted cabines
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
 * @route   GET /api/catalogs/cabines/type-cabines/list
 * @desc    Get all type cabines for dropdown/selection
 * @access  Protected
 */
router.get(
  '/type-cabines/list',
  verifyToken,
  handler.getTypeCabines
);

module.exports = router;
