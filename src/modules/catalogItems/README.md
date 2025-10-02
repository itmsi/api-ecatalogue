# Catalog Items Module

Module ini menangani operasi CRUD untuk catalog items dan import CSV.

**Semua endpoint memerlukan autentikasi token Bearer.**

## Endpoints

### 1. Get All Catalog Items
- **Method**: POST
- **URL**: `/api/catalogs/catalogItems/get`
- **Description**: Mengambil semua catalog items dengan pagination
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "page": 1,
    "limit": 10
  }
  ```

### 2. Get Catalog Item by ID
- **Method**: GET
- **URL**: `/api/catalogs/catalogItems/:id`
- **Description**: Mengambil catalog item berdasarkan ID
- **Headers**: `Authorization: Bearer <token>`

### 3. Create Catalog Item
- **Method**: POST
- **URL**: `/api/catalogs/catalogItems/create`
- **Description**: Membuat catalog item baru
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "catalog_id": "uuid",
    "target_id": "TARGET001",
    "diagram_serial_number": "DSN001",
    "part_number": "PN001",
    "catalog_item_name_en": "Engine Component A",
    "catalog_item_name_ch": "发动机组件A",
    "catalog_item_quantity": 10,
    "catalog_item_description": "High quality engine component"
  }
  ```

### 4. Update Catalog Item
- **Method**: PUT
- **URL**: `/api/catalogs/catalogItems/:id`
- **Description**: Mengupdate catalog item yang sudah ada
- **Headers**: `Authorization: Bearer <token>`

### 5. Delete Catalog Item
- **Method**: DELETE
- **URL**: `/api/catalogs/catalogItems/:id`
- **Description**: Soft delete catalog item
- **Headers**: `Authorization: Bearer <token>`

### 6. Restore Catalog Item
- **Method**: POST
- **URL**: `/api/catalogs/catalogItems/:id/restore`
- **Description**: Restore catalog item yang sudah dihapus
- **Headers**: `Authorization: Bearer <token>`

### 7. Import CSV
- **Method**: POST
- **URL**: `/api/catalogs/catalogItems/import`
- **Description**: Import catalog items dari file CSV
- **Headers**: `Authorization: Bearer <token>`
- **Request**: Multipart form dengan field `file`

## CSV Format

File CSV harus memiliki header dengan kolom berikut:
- `catalog_id` (optional)
- `target_id` (optional)
- `diagram_serial_number` (optional)
- `part_number` (optional)
- `catalog_item_name_en` (optional)
- `catalog_item_name_ch` (optional)
- `catalog_item_quantity` (optional, default: 0)
- `catalog_item_description` (optional)

## Database Schema

Tabel `catalog_items` memiliki struktur:
- `catalog_item_id` (UUID, Primary Key)
- `catalog_id` (UUID, Foreign Key ke catalogs)
- `target_id` (VARCHAR 255)
- `diagram_serial_number` (VARCHAR 255)
- `part_number` (VARCHAR 255)
- `catalog_item_name_en` (VARCHAR 255)
- `catalog_item_name_ch` (VARCHAR 255)
- `catalog_item_quantity` (INTEGER, default: 0)
- `catalog_item_description` (TEXT)
- `created_at`, `updated_at`, `deleted_at` (timestamps)
- `created_by`, `updated_by`, `deleted_by` (UUIDs)
- `is_delete` (BOOLEAN, default: false)

## Validation

- Semua field optional kecuali ID untuk update/delete
- UUID validation untuk `catalog_id`
- String length validation untuk text fields
- Integer validation untuk quantity
- File validation untuk CSV upload

## Response Format

Semua response mengikuti format standar:
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

Untuk error:
```json
{
  "success": false,
  "error": "Error message",
  "details": {...}
}
```
