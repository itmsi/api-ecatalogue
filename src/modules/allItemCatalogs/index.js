const express = require('express');
const router = express.Router();
const handler = require('./handler');
const {
  getListValidation,
  createValidation,
  updateValidation,
  getByIdValidation,
  deleteValidation
} = require('./validation');
const { verifyToken } = require('../../middlewares/token');
const { validateMiddleware } = require('../../middlewares/validation');
const { handleAllItemCatalogsUpload } = require('../../middlewares/fileUpload');

router.post(
  '/get',
  verifyToken,
  getListValidation,
  validateMiddleware,
  handler.getAll
);

router.get(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.getById
);

router.post(
  '/create',
  verifyToken,
  handleAllItemCatalogsUpload,
  createValidation,
  validateMiddleware,
  handler.create
);

router.put(
  '/:id',
  verifyToken,
  handleAllItemCatalogsUpload,
  updateValidation,
  validateMiddleware,
  handler.update
);

router.delete(
  '/:id',
  verifyToken,
  deleteValidation,
  validateMiddleware,
  handler.remove
);

module.exports = router;
