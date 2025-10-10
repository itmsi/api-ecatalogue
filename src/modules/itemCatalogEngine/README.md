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

### 3. Create Item Catalog Engine
**POST** `/api/catalogs/item_catalog_engine/create`

Membuat item catalog engine baru. Jika `name_pdf` sudah ada di master_pdf, maka akan menggunakan ID yang ada. Jika belum ada, akan membuat entry baru di master_pdf.

**Request Body:**
```json
{
  "name_pdf": "Engine Catalog 2024",
  "data_items": [
    {
      "engine_id": "uuid-string",
      "type_engine_id": "uuid-string",
      "target_id": "T001",
      "diagram_serial_number": "DSN001",
      "part_number": "PN001",
      "catalog_item_name_en": "Engine Part 1",
      "catalog_item_name_ch": "引擎部件1",
      "description": "Description",
      "quantity": 10
    }
  ]
}
```

### 4. Update Item Catalog Engine
**PUT** `/api/catalogs/item_catalog_engine/:id`

Update item catalog engine. Strategi: menghapus (soft delete) semua item lama yang terkait dengan master_pdf_id, kemudian insert item baru.

**Request Body:**
```json
{
  "name_pdf": "Engine Catalog 2024 Updated",
  "data_items": [
    {
      "engine_id": "uuid-string",
      "type_engine_id": "uuid-string",
      "target_id": "T001",
      "diagram_serial_number": "DSN001",
      "part_number": "PN001",
      "catalog_item_name_en": "Engine Part 1 Updated",
      "catalog_item_name_ch": "引擎部件1更新",
      "description": "Description Updated",
      "quantity": 15
    }
  ]
}
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

## Notes

- Semua operasi create/update/delete akan otomatis mengisi `created_by`, `updated_by`, dan `deleted_by` dari token.
- Delete menggunakan soft delete (is_delete = true, deleted_at diisi).
- Update strategy: soft delete all old items, insert new items.

