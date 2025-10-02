const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {
  createValidation,
  updateValidation,
  createProductionValidation,
  getByIdValidation
} = require('./validation');
const { verifyToken } = require('../../middlewares/token');
const { validateMiddleware } = require('../../middlewares/validation');

/**
 * @route   POST /api/catalogs/productions/get
 * @desc    Get all productions with pagination and filters
 * @access  Protected (verifyToken required)
 */
router.post(
  '/get',
  verifyToken,
  createProductionValidation,
  validateMiddleware,
  handler.getProductions
);

/**
 * @route   POST /api/catalogs/productions/create
 * @desc    Create new production
 * @access  Protected (verifyToken required)
 */
router.post(
  '/create',
  verifyToken,
  createValidation,
  validateMiddleware,
  handler.createProduction
);

/**
 * @route   GET /api/catalogs/productions/:id
 * @desc    Get production by ID
 * @access  Protected (verifyToken required)
 */
router.get(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.getProductionById
);

/**
 * @route   PUT /api/catalogs/productions/:id
 * @desc    Update production
 * @access  Protected (verifyToken required)
 */
router.put(
  '/:id',
  verifyToken,
  updateValidation,
  validateMiddleware,
  handler.updateProduction
);

/**
 * @route   DELETE /api/catalogs/productions/:id
 * @desc    Soft delete production
 * @access  Protected (verifyToken required)
 */
router.delete(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.deleteProduction
);

module.exports = router;
