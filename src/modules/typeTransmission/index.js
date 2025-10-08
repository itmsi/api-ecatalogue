const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {
  getValidation,
  createValidation,
  updateValidation,
  getByIdValidation,
  deleteValidation
} = require('./validation');
// const { verifyToken } = require('../../middlewares');
const { validateMiddleware } = require('../../middlewares/validation');

/**
 * @route   POST /api/catalogs/type_transmission/get
 * @desc    Get all type transmissions with pagination and filtering
 * @access  Private
 */
router.post(
  '/get',
  // verifyToken,
  getValidation,
  validateMiddleware,
  handler.getAll
);

/**
 * @route   GET /api/catalogs/type_transmission/:id
 * @desc    Get type transmission by ID
 * @access  Private
 */
router.get(
  '/:id',
  // verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.getById
);

/**
 * @route   POST /api/catalogs/type_transmission/create
 * @desc    Create new type transmission
 * @access  Private
 */
router.post(
  '/create',
  // verifyToken,
  createValidation,
  validateMiddleware,
  handler.create
);

/**
 * @route   PUT /api/catalogs/type_transmission/:id
 * @desc    Update type transmission
 * @access  Private
 */
router.put(
  '/:id',
  // verifyToken,
  updateValidation,
  validateMiddleware,
  handler.update
);

/**
 * @route   DELETE /api/catalogs/type_transmission/:id
 * @desc    Soft delete type transmission
 * @access  Private
 */
router.delete(
  '/:id',
  // verifyToken,
  deleteValidation,
  validateMiddleware,
  handler.remove
);

/**
 * @route   POST /api/catalogs/type_transmission/:id/restore
 * @desc    Restore soft deleted type transmission
 * @access  Private
 */
router.post(
  '/:id/restore',
  // verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.restore
);

module.exports = router;
