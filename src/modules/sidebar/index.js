const express = require('express');
const router = express.Router();
const handler = require('./handler');
const { getSidebarsValidation } = require('./validation');
const { verifyToken } = require('../../middlewares');
const { validateMiddleware } = require('../../middlewares/validation');

/**
 * @route   POST /api/catalogs/sidebars/get
 * @desc    Get sidebars with hierarchical structure and filters
 * @access  Private
 */
router.post(
  '/get',
  verifyToken,
  getSidebarsValidation,
  validateMiddleware,
  handler.getSidebars
);

module.exports = router;
