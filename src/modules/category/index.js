const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {
  createValidation,
  updateValidation,
  getByIdValidation,
  listValidation,
  searchValidation,
  restoreValidation
} = require('./validation');
const { verifyToken } = require('../../middlewares/token');
const { validateMiddleware } = require('../../middlewares/validation');

/**
 * @route   GET /api/categories
 * @desc    Get all categories with pagination
 * @access  Protected
 */
router.get(
  '/',
  verifyToken,
  listValidation,
  validateMiddleware,
  handler.getAll
);

/**
 * @route   GET /api/categories/all
 * @desc    Get all categories including deleted (admin only)
 * @access  Protected (Admin only)
 */
router.get(
  '/all',
  verifyToken,
  listValidation,
  validateMiddleware,
  handler.getAllWithDeleted
);

/**
 * @route   GET /api/categories/search
 * @desc    Search categories by name or description
 * @access  Protected
 */
router.get(
  '/search',
  verifyToken,
  searchValidation,
  validateMiddleware,
  handler.search
);

/**
 * @route   GET /api/categories/:id
 * @desc    Get category by ID
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
 * @route   POST /api/categories
 * @desc    Create new category
 * @access  Protected
 */
router.post(
  '/',
  verifyToken,
  createValidation,
  validateMiddleware,
  handler.create
);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update category
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
 * @route   DELETE /api/categories/:id
 * @desc    Soft delete category
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
 * @route   POST /api/categories/:id/restore
 * @desc    Restore soft deleted category
 * @access  Protected
 */
router.post(
  '/:id/restore',
  verifyToken,
  restoreValidation,
  validateMiddleware,
  handler.restore
);

/**
 * @route   DELETE /api/categories/:id/permanent
 * @desc    Hard delete category (permanent)
 * @access  Protected (Admin only)
 */
router.delete(
  '/:id/permanent',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.hardDelete
);

module.exports = router;
