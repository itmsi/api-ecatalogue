# Item Catalog Transmission Module

Module untuk mengelola item katalog transmission.

## Endpoints

### 1. Get List Item Catalog Transmission
**POST** `/api/catalogs/item_catalog_transmission/get`

Filter dan pagination untuk list item catalog transmission.

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

### 2. Get Item Catalog Transmission by ID
**GET** `/api/catalogs/item_catalog_transmission/:id`

Mendapatkan detail item catalog transmission berdasarkan ID.

### 3. Create Item Catalog Transmission
**POST** `/api/catalogs/item_catalog_transmission/create`

Membuat item catalog transmission baru.

**Request Body:**
```json
{
  "name_pdf": "Transmission Catalog 2024",
  "data_items": [
    {
      "transmission_id": "uuid-string",
      "type_transmission_id": "uuid-string",
      "target_id": "T001",
      "diagram_serial_number": "DSN001",
      "part_number": "PN001",
      "catalog_item_name_en": "Transmission Part 1",
      "catalog_item_name_ch": "变速器部件1",
      "description": "Description",
      "quantity": 10
    }
  ]
}
```

### 4. Update Item Catalog Transmission
**PUT** `/api/catalogs/item_catalog_transmission/:id`

Update item catalog transmission.

### 5. Delete Item Catalog Transmission
**DELETE** `/api/catalogs/item_catalog_transmission/:id`

Soft delete item catalog transmission.

## Database Structure

### Table: item_catalog_transmissions
- `item_catalog_transmission_id` (UUID, PK)
- `master_pdf_id` (UUID, FK to master_pdf)
- `transmission_id` (UUID, FK to transmissions)
- `type_transmission_id` (UUID, FK to type_transmissions)
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

