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
const { handleItemCatalogTransmissionUpload } = require('../../middlewares/fileUpload');

/**
 * @swagger
 * tags:
 *   name: Item Catalog Transmission
 *   description: API untuk mengelola item katalog transmission
 */

/**
 * @swagger
 * /api/catalogs/item_catalog_transmission/get:
 *   post:
 *     summary: Get list item catalog transmission dengan filter
 *     tags: [Item Catalog Transmission]
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
 *                 description: Nomor halaman
 *               limit:
 *                 type: integer
 *                 example: 10
 *                 description: Jumlah data per halaman
 *               search:
 *                 type: string
 *                 example: ""
 *                 description: Kata kunci pencarian
 *               sort_by:
 *                 type: string
 *                 example: "created_at"
 *                 description: Field untuk sorting
 *               sort_order:
 *                 type: string
 *                 enum: [asc, desc]
 *                 example: "desc"
 *                 description: Urutan sorting
 *               master_pdf_id:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *                 description: Filter berdasarkan master PDF ID
 *     responses:
 *       200:
 *         description: Data berhasil diambil
 *       401:
 *         description: Unauthorized - Token tidak valid
 *       500:
 *         description: Internal server error
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
 * /api/catalogs/item_catalog_transmission/{id}:
 *   get:
 *     summary: Get item catalog transmission by ID
 *     description: Mengambil detail item catalog transmission beserta semua items yang memiliki master_pdf_id yang sama
 *     tags: [Item Catalog Transmission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog transmission ID
 *     responses:
 *       200:
 *         description: Data berhasil diambil
 *       401:
 *         description: Unauthorized - Token tidak valid
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Internal server error
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
 * /api/catalogs/item_catalog_transmission/create:
 *   post:
 *     summary: Create new item catalog transmission
 *     description: |
 *       Membuat item catalog transmission baru dengan 2 pilihan input:
 *       1. Upload file CSV (use_csv = true)
 *       2. Input manual via data_items JSON (use_csv = false)
 *       
 *       Format CSV harus memiliki kolom: target_id, diagram_serial_number, part_number, catalog_item_name_en, catalog_item_name_ch, description, quantity
 *       
 *       File foto akan diupload ke MinIO dan URL-nya disimpan di field file_foto setiap item.
 *     tags: [Item Catalog Transmission]
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
 *               - use_csv
 *             properties:
 *               name_pdf:
 *                 type: string
 *                 example: "Transmission Catalog 2024"
 *                 description: Nama PDF catalog
 *               transmission_id:
 *                 type: string
 *                 format: uuid
 *                 example: "1cd67a84-c5d1-46ff-b5c2-f85a70512227"
 *                 description: ID transmission (opsional, akan diterapkan ke semua items)
 *               type_transmission_id:
 *                 type: string
 *                 format: uuid
 *                 example: "dec6d87f-ea6a-4a75-a11c-bda336c08275"
 *                 description: ID type transmission (opsional, akan diterapkan ke semua items)
 *               file_foto:
 *                 type: string
 *                 format: binary
 *                 description: File foto untuk catalog (opsional, format jpg/png/gif/webp, max 10MB)
 *               file_csv:
 *                 type: string
 *                 format: binary
 *                 description: File CSV untuk import data (wajib jika use_csv = true, max 10MB)
 *               use_csv:
 *                 type: boolean
 *                 example: false
 *                 description: true = gunakan file_csv, false = gunakan data_items
 *               data_items:
 *                 type: string
 *                 description: JSON string array of items (wajib jika use_csv = false)
 *                 example: '[{"target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Transmission Part 1","catalog_item_name_ch":"传动部件1","description":"Description","quantity":10}]'
 *     responses:
 *       201:
 *         description: Data berhasil dibuat
 *       400:
 *         description: Bad request - Validasi gagal atau file tidak valid
 *       401:
 *         description: Unauthorized - Token tidak valid
 *       500:
 *         description: Internal server error - Error saat upload atau proses data
 */
router.post(
  '/create',
  verifyToken,
  handleItemCatalogTransmissionUpload,
  createValidation,
  validateMiddleware,
  handler.create
);

/**
 * @swagger
 * /api/catalogs/item_catalog_transmission/{id}:
 *   put:
 *     summary: Update item catalog transmission
 *     description: |
 *       Update item catalog transmission dengan 2 pilihan input:
 *       1. Upload file CSV (use_csv = true)
 *       2. Input manual via data_items JSON (use_csv = false)
 *       
 *       Menggunakan strategi UPSERT - jika data dengan kombinasi master_pdf_id + transmission_id + type_transmission_id + target_id sudah ada, maka UPDATE. Jika belum ada, maka INSERT.
 *       
 *       File foto baru akan menggantikan foto lama jika diupload. Jika tidak upload foto baru, foto lama tetap dipertahankan.
 *     tags: [Item Catalog Transmission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog transmission ID (digunakan untuk mencari master_pdf_id)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name_pdf
 *               - use_csv
 *             properties:
 *               name_pdf:
 *                 type: string
 *                 example: "Transmission Catalog 2024 Updated"
 *                 description: Nama PDF catalog
 *               transmission_id:
 *                 type: string
 *                 format: uuid
 *                 example: "1cd67a84-c5d1-46ff-b5c2-f85a70512227"
 *                 description: ID transmission (opsional, akan diterapkan ke semua items)
 *               type_transmission_id:
 *                 type: string
 *                 format: uuid
 *                 example: "dec6d87f-ea6a-4a75-a11c-bda336c08275"
 *                 description: ID type transmission (opsional, akan diterapkan ke semua items)
 *               file_foto:
 *                 type: string
 *                 format: binary
 *                 description: File foto baru untuk catalog (opsional, jika tidak diupload foto lama dipertahankan)
 *               file_csv:
 *                 type: string
 *                 format: binary
 *                 description: File CSV untuk import data (wajib jika use_csv = true)
 *               use_csv:
 *                 type: boolean
 *                 example: false
 *                 description: true = gunakan file_csv, false = gunakan data_items
 *               data_items:
 *                 type: string
 *                 description: JSON string array of items (wajib jika use_csv = false)
 *                 example: '[{"target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Transmission Part 1 Updated","catalog_item_name_ch":"传动部件1","description":"Description Updated","quantity":15}]'
 *     responses:
 *       200:
 *         description: Data berhasil diupdate
 *       400:
 *         description: Bad request - Validasi gagal atau file tidak valid
 *       401:
 *         description: Unauthorized - Token tidak valid
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Internal server error - Error saat upload atau proses data
 */
router.put(
  '/:id',
  verifyToken,
  handleItemCatalogTransmissionUpload,
  updateValidation,
  validateMiddleware,
  handler.update
);

/**
 * @swagger
 * /api/catalogs/item_catalog_transmission/{id}:
 *   delete:
 *     summary: Soft delete item catalog transmission
 *     description: |
 *       Menghapus item catalog transmission secara soft delete (data tidak benar-benar dihapus dari database, hanya ditandai sebagai deleted).
 *       
 *       Field is_delete akan diset menjadi true dan deleted_at akan diisi dengan timestamp saat ini.
 *     tags: [Item Catalog Transmission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Item catalog transmission ID yang akan dihapus
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       401:
 *         description: Unauthorized - Token tidak valid
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  verifyToken,
  deleteValidation,
  validateMiddleware,
  handler.remove
);

module.exports = router;

