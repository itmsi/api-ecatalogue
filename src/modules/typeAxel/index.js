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
 * @route   POST /api/catalogs/type_axel/get
 * @desc    Get all type axels with pagination and filters
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
 * @route   GET /api/catalogs/type_axel/:id
 * @desc    Get type axel by ID
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
 * @route   POST /api/catalogs/type_axel/create
 * @desc    Create new type axel
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
 * @route   PUT /api/catalogs/type_axel/:id
 * @desc    Update type axel
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
 * @route   DELETE /api/catalogs/type_axel/:id
 * @desc    Soft delete type axel
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
 * @route   POST /api/catalogs/type_axel/:id/restore
 * @desc    Restore soft deleted type axel
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

