# Item Catalog Cabine Module

Module untuk mengelola item katalog cabine.

## Endpoints

### 1. Get List Item Catalog Cabine
**POST** `/api/catalogs/item_catalog_cabine/get`

Filter dan pagination untuk list item catalog cabine.

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

### 2. Get Item Catalog Cabine by ID
**GET** `/api/catalogs/item_catalog_cabine/:id`

Mendapatkan detail item catalog cabine berdasarkan ID.

### 3. Create Item Catalog Cabine
**POST** `/api/catalogs/item_catalog_cabine/create`

Membuat item catalog cabine baru.

**Request Body:**
```json
{
  "name_pdf": "Cabine Catalog 2024",
  "data_items": [
    {
      "cabine_id": "uuid-string",
      "type_cabine_id": "uuid-string",
      "target_id": "T001",
      "diagram_serial_number": "DSN001",
      "part_number": "PN001",
      "catalog_item_name_en": "Cabine Part 1",
      "catalog_item_name_ch": "驾驶室部件1",
      "description": "Description",
      "quantity": 10
    }
  ]
}
```

### 4. Update Item Catalog Cabine
**PUT** `/api/catalogs/item_catalog_cabine/:id`

Update item catalog cabine.

### 5. Delete Item Catalog Cabine
**DELETE** `/api/catalogs/item_catalog_cabine/:id`

Soft delete item catalog cabine.

## Database Structure

### Table: item_catalog_cabines
- `item_catalog_cabine_id` (UUID, PK)
- `master_pdf_id` (UUID, FK to master_pdf)
- `cabine_id` (UUID, FK to cabines)
- `type_cabine_id` (UUID, FK to type_cabines)
- `target_id` (String)
- `diagram_serial_number` (String)
- `part_number` (String)
- `catalog_item_name_en` (String)
- `catalog_item_name_ch` (String)
- `description` (Text)
- `quantity` (Integer)
- Audit fields (created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, is_delete)

## Authentication

Semua endpoint memerlukan authentication token (Bearer Token) yang berisi `employee_id` atau `user_id`.

