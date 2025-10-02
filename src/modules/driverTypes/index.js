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
 * @route   POST /api/catalogs/driver_types/get
 * @desc    Get all driver types with pagination
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
 * @route   GET /api/catalogs/driver_types/:id
 * @desc    Get driver type by ID
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
 * @route   POST /api/catalogs/driver_types/create
 * @desc    Create new driver type
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
 * @route   PUT /api/catalogs/driver_types/:id
 * @desc    Update driver type
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
 * @route   DELETE /api/catalogs/driver_types/:id
 * @desc    Soft delete driver type
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
 * @route   POST /api/catalogs/driver_types/:id/restore
 * @desc    Restore soft deleted driver type
 * @access  Private
 */
router.post(
  '/:id/restore',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.restore
);

module.exports = router;
