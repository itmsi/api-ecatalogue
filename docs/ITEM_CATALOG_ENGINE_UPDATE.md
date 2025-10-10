# Item Catalog Engine - Update Dokumentasi

## Overview
Module `itemCatalogEngine` telah diupdate untuk mendukung multipart form-data dengan fitur upload file foto, import CSV, dan opsi untuk memilih antara CSV atau data items manual.

## Perubahan yang Dilakukan

### 1. Handler (handler.js)
- Ditambahkan support untuk multipart form-data
- Ditambahkan fungsi `parseCsvFile()` untuk parsing file CSV
- Ditambahkan fungsi `validateCsvRow()` untuk validasi data CSV
- Diupdate fungsi `create()` untuk mendukung:
  - Upload `file_foto` ke MinIO
  - Upload dan import `file_csv`
  - Parameter `use_csv` untuk memilih mode input (CSV atau manual)
  - Transaction support untuk rollback jika ada error
- Diupdate fungsi `update()` dengan fitur yang sama seperti `create()`

### 2. Repository (postgre_repository.js)
- Ditambahkan fungsi `findOrCreateMasterPdfWithTransaction()` untuk handle transaction
- Ditambahkan fungsi `createWithTransaction()` untuk create dengan transaction
- Ditambahkan fungsi `updateWithTransaction()` untuk update dengan transaction
- Support untuk field `file_foto` di tabel `master_pdf`

### 3. Validation (validation.js)
- Diupdate `createValidation` untuk multipart form-data:
  - `name_pdf`: required (string)
  - `use_csv`: optional (boolean)
  - `data_items`: conditional required (wajib jika use_csv = false)
- Diupdate `updateValidation` dengan aturan yang sama

### 4. Routes (index.js)
- Diupdate route POST `/create` untuk menggunakan middleware `handleItemCatalogEngineUpload`
- Diupdate route PUT `/:id` untuk menggunakan middleware `handleItemCatalogEngineUpload`
- Diupdate swagger documentation untuk multipart/form-data

### 5. Middleware (fileUpload.js)
- Ditambahkan `handleItemCatalogEngineUpload` middleware
- Support untuk upload 2 file: `file_foto` (image) dan `file_csv` (CSV)
- Validasi file type dan size (max 10MB per file)

## Cara Penggunaan

### A. Create dengan Data Items Manual

```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'use_csv=false' \
  -F 'file_foto=@/path/to/image.jpg' \
  -F 'data_items=[{"engine_id":"1cd67a84-c5d1-46ff-b5c2-f85a70512227","type_engine_id":"dec6d87f-ea6a-4a75-a11c-bda336c08275","target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1","catalog_item_name_ch":"引擎部件1","description":"Description","quantity":10}]'
```

### B. Create dengan File CSV

```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'use_csv=true' \
  -F 'file_foto=@/path/to/image.jpg' \
  -F 'file_csv=@/path/to/data.csv'
```

### C. Update dengan Data Items Manual

```bash
curl -X 'PUT' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024 Updated' \
  -F 'use_csv=false' \
  -F 'file_foto=@/path/to/new_image.jpg' \
  -F 'data_items=[{"engine_id":"1cd67a84-c5d1-46ff-b5c2-f85a70512227","type_engine_id":"dec6d87f-ea6a-4a75-a11c-bda336c08275","target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1","catalog_item_name_ch":"引擎部件1","description":"Description","quantity":10}]'
```

### D. Update dengan File CSV

```bash
curl -X 'PUT' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024 Updated' \
  -F 'use_csv=true' \
  -F 'file_foto=@/path/to/new_image.jpg' \
  -F 'file_csv=@/path/to/updated_data.csv'
```

## Format CSV

Template CSV tersedia di: `item_catalog_engine_template.csv`

Kolom CSV:
- `engine_id` - UUID dari tabel engines (optional)
- `type_engine_id` - UUID dari tabel type_engines (optional)
- `target_id` - String identifier (optional)
- `diagram_serial_number` - String serial number (optional)
- `part_number` - String part number (optional)
- `catalog_item_name_en` - String nama item (EN) (optional)
- `catalog_item_name_ch` - String nama item (CH) (optional)
- `description` - String deskripsi (optional)
- `quantity` - Integer jumlah (optional)

Contoh:
```csv
engine_id,type_engine_id,target_id,diagram_serial_number,part_number,catalog_item_name_en,catalog_item_name_ch,description,quantity
1cd67a84-c5d1-46ff-b5c2-f85a70512227,dec6d87f-ea6a-4a75-a11c-bda336c08275,T001,DSN001,PN001,Engine Part 1,引擎部件1,High performance engine part,10
```

## Parameter Request

### Required
- `name_pdf` (string) - Nama PDF catalog

### Optional
- `file_foto` (file) - File foto/gambar (format: jpg, jpeg, png, gif, webp, svg)
- `file_csv` (file) - File CSV untuk import (required jika use_csv = true)
- `use_csv` (boolean) - Mode input: true = gunakan CSV, false = gunakan data_items
- `data_items` (string/JSON) - Array JSON items (required jika use_csv = false)

## Response

### Success Response (201 Created / 200 OK)
```json
{
  "success": true,
  "message": "Data berhasil dibuat",
  "data": {
    "master_pdf_id": "uuid",
    "items": [
      {
        "item_catalog_engine_id": "uuid",
        "master_pdf_id": "uuid",
        "engine_id": "uuid",
        "type_engine_id": "uuid",
        "target_id": "T001",
        "diagram_serial_number": "DSN001",
        "part_number": "PN001",
        "catalog_item_name_en": "Engine Part 1",
        "catalog_item_name_ch": "引擎部件1",
        "description": "Description",
        "quantity": 10,
        "created_at": "timestamp",
        "created_by": "uuid",
        "updated_at": "timestamp",
        "updated_by": "uuid",
        "is_delete": false
      }
    ]
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detail error 1", "Detail error 2"]
}
```

## Validasi

### CSV Validasi
- Semua field di CSV adalah optional
- `quantity` harus berupa angka jika diisi
- `engine_id` dan `type_engine_id` harus berupa UUID yang valid jika diisi
- File CSV tidak boleh kosong

### File Upload Validasi
- `file_foto`: Max 10MB, format: jpg, jpeg, png, gif, webp, svg
- `file_csv`: Max 10MB, format: csv

## Database Schema

### Tabel: master_pdf
```sql
ALTER TABLE master_pdf ADD COLUMN file_foto TEXT;
```

Field `file_foto` menyimpan URL dari MinIO untuk foto catalog.

## Transaction Management

Semua operasi create dan update menggunakan database transaction untuk memastikan data consistency:
- Jika upload file gagal → rollback
- Jika validasi CSV gagal → rollback
- Jika insert/update database gagal → rollback
- Semua berhasil → commit

## Error Handling

1. **File Upload Error**: Jika MinIO tidak tersedia atau gagal upload
2. **CSV Parse Error**: Jika format CSV tidak valid
3. **CSV Validation Error**: Jika data di CSV tidak sesuai validasi
4. **Database Error**: Jika operasi database gagal
5. **Transaction Error**: Automatic rollback dan error message

## Testing

### Test dengan Postman
1. Set method ke POST atau PUT
2. Set Authorization header dengan Bearer token
3. Set body type ke `form-data`
4. Tambahkan field sesuai kebutuhan
5. Upload file jika diperlukan

### Test dengan cURL
Lihat contoh cURL di section "Cara Penggunaan" di atas.

## Notes

- File foto akan diupload ke MinIO dengan prefix `catalog-images/`
- Data CSV akan di-parse dan di-validasi sebelum insert ke database
- Semua operasi menggunakan soft delete (is_delete flag)
- User ID diambil dari JWT token (employee_id atau user_id)
- Timestamp otomatis ter-generate untuk created_at dan updated_at

## Migration Guide

Jika menggunakan kode lama (JSON body), perlu update:
1. Change Content-Type dari `application/json` ke `multipart/form-data`
2. Convert `data_items` dari JSON object ke JSON string
3. Tambahkan parameter `use_csv=false` jika tidak menggunakan CSV
4. Optional: tambahkan `file_foto` jika ingin upload foto

## Troubleshooting

### Error: "MinIO tidak aktif atau belum dikonfigurasi"
- Pastikan environment variables sudah di-set: S3_PROVIDER, S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET
- Pastikan MinIO service running

### Error: "File CSV kosong atau format tidak valid"
- Cek format CSV, pastikan ada header row
- Pastikan encoding UTF-8
- Pastikan tidak ada karakter special yang break parsing

### Error: "data_items wajib diisi jika use_csv = false"
- Jika `use_csv=false`, wajib kirim `data_items`
- Format `data_items` harus JSON string yang valid

### Error: "Validasi CSV gagal"
- Cek error details untuk mengetahui baris mana yang error
- Perbaiki data sesuai error message
- Pastikan UUID valid jika mengisi engine_id atau type_engine_id

