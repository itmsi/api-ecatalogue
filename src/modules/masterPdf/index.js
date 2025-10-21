const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {
  getListValidation,
  getByIdValidation,
  getStatsValidation,
  searchValidation,
  getCategoriesValidation,
  validatePagination,
  validateSort
} = require('./validation');
const { verifyToken } = require('../../middlewares/token');
const { validateMiddleware } = require('../../middlewares/validation');

/**
 * Route untuk mendapatkan data master PDF dengan pagination dan filtering
 * Method: POST
 * Endpoint: /master-pdf/get
 */
router.post(
  '/get',
  verifyToken,
  getListValidation,
  validatePagination,
  validateSort,
  validateMiddleware,
  handler.getAll
);

/**
 * Route untuk mendapatkan data master PDF berdasarkan ID
 * Method: GET
 * Endpoint: /master-pdf/:id
 */
router.get(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.getById
);

/**
 * Route untuk mendapatkan statistik master PDF
 * Method: GET
 * Endpoint: /master-pdf/stats
 */
router.get(
  '/stats',
  verifyToken,
  getStatsValidation,
  validateMiddleware,
  handler.getStats
);

/**
 * Route untuk pencarian master PDF
 * Method: POST
 * Endpoint: /master-pdf/search
 */
router.post(
  '/search',
  verifyToken,
  searchValidation,
  validateMiddleware,
  handler.search
);

/**
 * Route untuk mendapatkan daftar kategori yang tersedia
 * Method: GET
 * Endpoint: /master-pdf/categories
 */
router.get(
  '/categories',
  verifyToken,
  getCategoriesValidation,
  validateMiddleware,
  handler.getCategories
);

module.exports = router;
