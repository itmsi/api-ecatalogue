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
 * @route   POST /api/catalogs/steering/get
 * @desc    Get all steerings with pagination and filtering
 * @access  Private
 */
router.post(
  '/get',
  verifyToken,
  listValidation,
  validateMiddleware,
  handler.getAll
);

/**
 * @route   GET /api/catalogs/steering/:id
 * @desc    Get steering by ID with type_steerings
 * @access  Private
 */
router.get(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.getById
);

/**
 * @route   POST /api/catalogs/steering/create
 * @desc    Create new steering with type_steerings
 * @access  Private
 */
router.post(
  '/create',
  verifyToken,
  createValidation,
  validateMiddleware,
  handler.create
);

/**
 * @route   PUT /api/catalogs/steering/:id
 * @desc    Update steering with type_steerings
 * @access  Private
 */
router.put(
  '/:id',
  verifyToken,
  updateValidation,
  validateMiddleware,
  handler.update
);

/**
 * @route   DELETE /api/catalogs/steering/:id
 * @desc    Soft delete steering
 * @access  Private
 */
router.delete(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.remove
);

/**
 * @route   POST /api/catalogs/steering/:id/restore
 * @desc    Restore soft deleted steering
 * @access  Private
 */
router.post(
  '/:id/restore',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.restore
);

/**
 * @route   GET /api/catalogs/steering/type-steerings/all
 * @desc    Get all type steerings for dropdown
 * @access  Private
 */
router.get(
  '/type-steerings/all',
  verifyToken,
  handler.getTypeSteerings
);

module.exports = router;

