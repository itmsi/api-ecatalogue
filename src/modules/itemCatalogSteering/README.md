# Item Catalog Steering Module

Module untuk mengelola item katalog steering.

## Endpoints

### 1. Get List Item Catalog Steering
**POST** `/api/catalogs/item_catalog_steering/get`

Filter dan pagination untuk list item catalog steering.

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

### 2. Get Item Catalog Steering by ID
**GET** `/api/catalogs/item_catalog_steering/:id`

Mendapatkan detail item catalog steering berdasarkan ID.

### 3. Create Item Catalog Steering
**POST** `/api/catalogs/item_catalog_steering/create`

Membuat item catalog steering baru.

**Request Body:**
```json
{
  "name_pdf": "Steering Catalog 2024",
  "data_items": [
    {
      "steering_id": "uuid-string",
      "type_steering_id": "uuid-string",
      "target_id": "T001",
      "diagram_serial_number": "DSN001",
      "part_number": "PN001",
      "catalog_item_name_en": "Steering Part 1",
      "catalog_item_name_ch": "转向部件1",
      "description": "Description",
      "quantity": 10
    }
  ]
}
```

### 4. Update Item Catalog Steering
**PUT** `/api/catalogs/item_catalog_steering/:id`

Update item catalog steering.

### 5. Delete Item Catalog Steering
**DELETE** `/api/catalogs/item_catalog_steering/:id`

Soft delete item catalog steering.

## Database Structure

### Table: item_catalog_steerings
- `item_catalog_steering_id` (UUID, PK)
- `master_pdf_id` (UUID, FK to master_pdf)
- `steering_id` (UUID, FK to steerings)
- `type_steering_id` (UUID, FK to type_steerings)
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

