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
const { handleItemCatalogEngineUpload } = require('../../middlewares/fileUpload');

/**
 * @swagger
 * tags:
 *   name: Item Catalog Engine
 *   description: API untuk mengelola item katalog engine
 */

/**
 * @swagger
 * /api/catalogs/item_catalog_engine/get:
 *   post:
 *     summary: Get list item catalog engine dengan filter
 *     tags: [Item Catalog Engine]
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
 * /api/catalogs/item_catalog_engine/{id}:
 *   get:
 *     summary: Get item catalog engine by ID
 *     tags: [Item Catalog Engine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog engine ID
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
 * /api/catalogs/item_catalog_engine/create:
 *   post:
 *     summary: Create new item catalog engine
 *     tags: [Item Catalog Engine]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name_pdf
 *             properties:
 *               name_pdf:
 *                 type: string
 *                 example: "Engine Catalog 2024"
 *               file_foto:
 *                 type: string
 *                 format: binary
 *                 description: File foto untuk catalog (optional)
 *               file_csv:
 *                 type: string
 *                 format: binary
 *                 description: File CSV untuk import data (required jika use_csv = true)
 *               use_csv:
 *                 type: boolean
 *                 description: Jika true, gunakan file_csv. Jika false, gunakan data_items
 *                 example: false
 *               data_items:
 *                 type: string
 *                 description: JSON string array of items (required jika use_csv = false)
 *                 example: '[{"engine_id":"1cd67a84-c5d1-46ff-b5c2-f85a70512227","type_engine_id":"dec6d87f-ea6a-4a75-a11c-bda336c08275","target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1","catalog_item_name_ch":"引擎部件1","description":"Description","quantity":10}]'
 *     responses:
 *       201:
 *         description: Data berhasil dibuat
 */
router.post(
  '/create',
  verifyToken,
  handleItemCatalogEngineUpload,
  createValidation,
  validateMiddleware,
  handler.create
);

/**
 * @swagger
 * /api/catalogs/item_catalog_engine/{id}:
 *   put:
 *     summary: Update item catalog engine
 *     tags: [Item Catalog Engine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog engine ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name_pdf
 *             properties:
 *               name_pdf:
 *                 type: string
 *                 example: "Engine Catalog 2024"
 *               file_foto:
 *                 type: string
 *                 format: binary
 *                 description: File foto untuk catalog (optional)
 *               file_csv:
 *                 type: string
 *                 format: binary
 *                 description: File CSV untuk import data (required jika use_csv = true)
 *               use_csv:
 *                 type: boolean
 *                 description: Jika true, gunakan file_csv. Jika false, gunakan data_items
 *                 example: false
 *               data_items:
 *                 type: string
 *                 description: JSON string array of items (required jika use_csv = false)
 *                 example: '[{"engine_id":"1cd67a84-c5d1-46ff-b5c2-f85a70512227","type_engine_id":"dec6d87f-ea6a-4a75-a11c-bda336c08275","target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1","catalog_item_name_ch":"引擎部件1","description":"Description","quantity":10}]'
 *     responses:
 *       200:
 *         description: Data berhasil diupdate
 *       404:
 *         description: Data tidak ditemukan
 */
router.put(
  '/:id',
  verifyToken,
  handleItemCatalogEngineUpload,
  updateValidation,
  validateMiddleware,
  handler.update
);

/**
 * @swagger
 * /api/catalogs/item_catalog_engine/{id}:
 *   delete:
 *     summary: Soft delete item catalog engine
 *     tags: [Item Catalog Engine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog engine ID
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

