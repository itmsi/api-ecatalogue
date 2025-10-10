# Item Catalog Axle Module

Module untuk mengelola item katalog axle.

## Endpoints

### 1. Get List Item Catalog Axle
**POST** `/api/catalogs/item_catalog_axle/get`

Filter dan pagination untuk list item catalog axle.

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

### 2. Get Item Catalog Axle by ID
**GET** `/api/catalogs/item_catalog_axle/:id`

Mendapatkan detail item catalog axle berdasarkan ID.

### 3. Create Item Catalog Axle
**POST** `/api/catalogs/item_catalog_axle/create`

Membuat item catalog axle baru.

**Request Body:**
```json
{
  "name_pdf": "Axle Catalog 2024",
  "data_items": [
    {
      "axel_id": "uuid-string",
      "type_axel_id": "uuid-string",
      "target_id": "T001",
      "diagram_serial_number": "DSN001",
      "part_number": "PN001",
      "catalog_item_name_en": "Axle Part 1",
      "catalog_item_name_ch": "车轴部件1",
      "description": "Description",
      "quantity": 10
    }
  ]
}
```

### 4. Update Item Catalog Axle
**PUT** `/api/catalogs/item_catalog_axle/:id`

Update item catalog axle.

### 5. Delete Item Catalog Axle
**DELETE** `/api/catalogs/item_catalog_axle/:id`

Soft delete item catalog axle.

## Database Structure

### Table: item_catalog_axles
- `item_catalog_axle_id` (UUID, PK)
- `master_pdf_id` (UUID, FK to master_pdf)
- `axel_id` (UUID, FK to axels)
- `type_axel_id` (UUID, FK to type_axels)
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

