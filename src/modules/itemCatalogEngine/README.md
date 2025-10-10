# Item Catalog Engine Module

Module untuk mengelola item katalog engine.

## Endpoints

### 1. Get List Item Catalog Engine
**POST** `/api/catalogs/item_catalog_engine/get`

Filter dan pagination untuk list item catalog engine.

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "",
  "sort_by": "created_at",
  "sort_order": "desc",
  "master_pdf_id": "uuid-string"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### 2. Get Item Catalog Engine by ID
**GET** `/api/catalogs/item_catalog_engine/:id`

Mendapatkan detail item catalog engine berdasarkan ID.

**Response:**
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "name_pdf": "Engine Catalog 2024",
    "master_pdf_id": "uuid-string",
    "data_items": [...]
  }
}
```

### 3. Create Item Catalog Engine (UPSERT)
**POST** `/api/catalogs/item_catalog_engine/create`

Membuat item catalog engine baru dengan support multipart form-data. 

**LOGIC UPSERT:**
- Jika kombinasi `master_pdf_id` + `engine_id` + `type_engine_id` + `target_id` **sudah ada**, maka akan **UPDATE** data yang sudah ada
- Jika kombinasi tersebut **belum ada**, maka akan **INSERT** data baru
- Jika `name_pdf` sudah ada di master_pdf, maka akan menggunakan ID yang ada. Jika belum ada, akan membuat entry baru di master_pdf

**Content-Type:** `multipart/form-data`

**Request Parameters:**
- `name_pdf` (string, required): Nama PDF catalog
- `engine_id` (UUID, optional): ID engine (berlaku untuk semua items)
- `type_engine_id` (UUID, optional): ID type engine (berlaku untuk semua items)
- `file_foto` (file, optional): File foto/gambar untuk catalog (jpg, png, gif, webp, svg)
- `file_csv` (file, conditional): File CSV untuk import data (required jika use_csv = true)
- `use_csv` (boolean, optional): Mode input. `true` = gunakan CSV, `false` = gunakan data_items (default: false)
- `data_items` (string/JSON, conditional): Array JSON items (required jika use_csv = false)

**Contoh A - Menggunakan data_items manual:**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'use_csv=false' \
  -F 'file_foto=@/path/to/image.jpg' \
  -F 'data_items=[{"engine_id":"uuid","type_engine_id":"uuid","target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1","catalog_item_name_ch":"引擎部件1","description":"Description","quantity":10}]'
```

**Contoh B - Menggunakan file CSV:**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'use_csv=true' \
  -F 'file_foto=@/path/to/image.jpg' \
  -F 'file_csv=@/path/to/data.csv'
```

**Format CSV:**
Lihat file `item_catalog_engine_template.csv` di root project untuk template.

**PENTING:** Header CSV harus persis seperti di bawah ini (case-sensitive):
```
target_id,diagram_serial_number,part_number,catalog_item_name_en,catalog_item_name_ch,description,quantity
```

Kolom CSV (semua optional):
- target_id (string)
- diagram_serial_number (string)
- part_number (string)
- catalog_item_name_en (string)
- catalog_item_name_ch (string)
- description (text)
- quantity (integer)

**CATATAN:**
- `engine_id` dan `type_engine_id` TIDAK ada di CSV, karena diambil dari parameter root level (berlaku untuk semua items dalam CSV)
- Jika ingin update data yang sudah ada, pastikan `target_id` sama dengan data di database

### 4. Update Item Catalog Engine (UPSERT)
**PUT** `/api/catalogs/item_catalog_engine/:id`

Update item catalog engine dengan support multipart form-data.

**LOGIC UPSERT:**
- Jika kombinasi `master_pdf_id` + `engine_id` + `type_engine_id` + `target_id` **sudah ada**, maka akan **UPDATE** data yang sudah ada
- Jika kombinasi tersebut **belum ada**, maka akan **INSERT** data baru

**Content-Type:** `multipart/form-data`

**Request Parameters:**
- `name_pdf` (string, required): Nama PDF catalog
- `engine_id` (UUID, optional): ID engine (berlaku untuk semua items)
- `type_engine_id` (UUID, optional): ID type engine (berlaku untuk semua items)
- `file_foto` (file, optional): File foto/gambar untuk catalog (jpg, png, gif, webp, svg)
- `file_csv` (file, conditional): File CSV untuk import data (required jika use_csv = true)
- `use_csv` (boolean, optional): Mode input. `true` = gunakan CSV, `false` = gunakan data_items (default: false)
- `data_items` (string/JSON, conditional): Array JSON items (required jika use_csv = false)

**Contoh A - Menggunakan data_items manual:**
```bash
curl -X 'PUT' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/{id}' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024 Updated' \
  -F 'use_csv=false' \
  -F 'file_foto=@/path/to/image.jpg' \
  -F 'data_items=[{"engine_id":"uuid","type_engine_id":"uuid","target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1 Updated","catalog_item_name_ch":"引擎部件1更新","description":"Description Updated","quantity":15}]'
```

**Contoh B - Menggunakan file CSV:**
```bash
curl -X 'PUT' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/{id}' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024 Updated' \
  -F 'use_csv=true' \
  -F 'file_foto=@/path/to/image.jpg' \
  -F 'file_csv=@/path/to/updated_data.csv'
```

### 5. Delete Item Catalog Engine
**DELETE** `/api/catalogs/item_catalog_engine/:id`

Soft delete item catalog engine.

**Response:**
```json
{
  "status": true,
  "message": "Data berhasil dihapus"
}
```

## Database Structure

### Table: item_catalog_engines
- `item_catalog_engine_id` (UUID, PK)
- `master_pdf_id` (UUID, FK to master_pdf)
- `engine_id` (UUID, FK to engines)
- `type_engine_id` (UUID, FK to type_engines)
- `target_id` (String)
- `diagram_serial_number` (String)
- `part_number` (String)
- `catalog_item_name_en` (String)
- `catalog_item_name_ch` (String)
- `description` (Text)
- `quantity` (Integer)
- `created_at` (Timestamp)
- `created_by` (UUID)
- `updated_at` (Timestamp)
- `updated_by` (UUID)
- `deleted_at` (Timestamp)
- `deleted_by` (UUID)
- `is_delete` (Boolean)

## Authentication

Semua endpoint memerlukan authentication token (Bearer Token) yang berisi `employee_id` atau `user_id`.

## Database Structure (Updated)

### Table: master_pdf
- `master_pdf_id` (UUID, PK)
- `name_pdf` (String)
- `description` (Text)
- `file_foto` (Text) - **NEW**: URL foto dari MinIO storage
- `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `is_delete`

## Notes

- **UPSERT Logic**: Endpoint create dan update sekarang menggunakan UPSERT (UPDATE atau INSERT)
  - Jika kombinasi `master_pdf_id` + `engine_id` + `type_engine_id` + `target_id` sudah ada → UPDATE
  - Jika belum ada → INSERT
- Semua operasi create/update/delete akan otomatis mengisi `created_by`, `updated_by`, dan `deleted_by` dari token.
- Delete menggunakan soft delete (is_delete = true, deleted_at diisi).
- **NEW**: Endpoint create dan update menggunakan `multipart/form-data` untuk support upload file.
- **NEW**: Support upload file foto (file_foto) ke MinIO dengan format: jpg, png, gif, webp, svg (max 10MB).
- **NEW**: Kolom `file_foto` ditambahkan ke tabel `master_pdf` untuk menyimpan URL foto dari MinIO.
- **NEW**: Support import data dari CSV (file_csv) dengan format yang sudah ditentukan (max 10MB).
- **NEW**: Parameter `use_csv` untuk memilih mode: CSV import atau manual input data_items.
- **IMPORTANT**: Header CSV harus persis: `target_id,diagram_serial_number,part_number,catalog_item_name_en,catalog_item_name_ch,description,quantity`
- **IMPORTANT**: `engine_id` dan `type_engine_id` diambil dari parameter root level, TIDAK dari CSV.
- Jika `use_csv=true`, wajib upload file_csv. Jika `use_csv=false`, wajib isi data_items.
- File foto akan disimpan di MinIO dengan prefix `catalog-images/`.
- Semua operasi menggunakan database transaction untuk memastikan data consistency.
- Jika ada error (upload gagal, validasi gagal, dll), semua perubahan akan di-rollback.
- Template CSV tersedia di: `item_catalog_engine_template.csv` di root project.
- Dokumentasi lengkap tersedia di: `docs/ITEM_CATALOG_ENGINE_UPDATE.md`

