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

/**
 * @swagger
 * tags:
 *   name: Item Catalog Steering
 *   description: API untuk mengelola item katalog steering
 */

/**
 * @swagger
 * /api/catalogs/item_catalog_steering/get:
 *   post:
 *     summary: Get list item catalog steering dengan filter
 *     tags: [Item Catalog Steering]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 example: 1
 *               limit:
 *                 type: integer
 *                 example: 10
 *               search:
 *                 type: string
 *                 example: ""
 *               sort_by:
 *                 type: string
 *                 example: "created_at"
 *               sort_order:
 *                 type: string
 *                 enum: [asc, desc]
 *                 example: "desc"
 *               master_pdf_id:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Success
 */
router.post(
  '/get',
  verifyToken,
  getListValidation,
  validateMiddleware,
  handler.getAll
);

/**
 * @swagger
 * /api/catalogs/item_catalog_steering/{id}:
 *   get:
 *     summary: Get item catalog steering by ID
 *     tags: [Item Catalog Steering]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog steering ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Data tidak ditemukan
 */
router.get(
  '/:id',
  verifyToken,
  getByIdValidation,
  validateMiddleware,
  handler.getById
);

/**
 * @swagger
 * /api/catalogs/item_catalog_steering/create:
 *   post:
 *     summary: Create new item catalog steering
 *     tags: [Item Catalog Steering]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_pdf
 *               - data_items
 *             properties:
 *               name_pdf:
 *                 type: string
 *                 example: "Steering Catalog 2024"
 *               data_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     steering_id:
 *                       type: string
 *                       format: uuid
 *                     type_steering_id:
 *                       type: string
 *                       format: uuid
 *                     target_id:
 *                       type: string
 *                     diagram_serial_number:
 *                       type: string
 *                     part_number:
 *                       type: string
 *                     catalog_item_name_en:
 *                       type: string
 *                     catalog_item_name_ch:
 *                       type: string
 *                     description:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Data berhasil dibuat
 */
router.post(
  '/create',
  verifyToken,
  createValidation,
  validateMiddleware,
  handler.create
);

/**
 * @swagger
 * /api/catalogs/item_catalog_steering/{id}:
 *   put:
 *     summary: Update item catalog steering
 *     tags: [Item Catalog Steering]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog steering ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_pdf
 *               - data_items
 *             properties:
 *               name_pdf:
 *                 type: string
 *                 example: "Steering Catalog 2024"
 *               data_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     steering_id:
 *                       type: string
 *                       format: uuid
 *                     type_steering_id:
 *                       type: string
 *                       format: uuid
 *                     target_id:
 *                       type: string
 *                     diagram_serial_number:
 *                       type: string
 *                     part_number:
 *                       type: string
 *                     catalog_item_name_en:
 *                       type: string
 *                     catalog_item_name_ch:
 *                       type: string
 *                     description:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Data berhasil diupdate
 *       404:
 *         description: Data tidak ditemukan
 */
router.put(
  '/:id',
  verifyToken,
  updateValidation,
  validateMiddleware,
  handler.update
);

/**
 * @swagger
 * /api/catalogs/item_catalog_steering/{id}:
 *   delete:
 *     summary: Soft delete item catalog steering
 *     tags: [Item Catalog Steering]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog steering ID
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 */
router.delete(
  '/:id',
  verifyToken,
  deleteValidation,
  validateMiddleware,
  handler.remove
);

module.exports = router;

