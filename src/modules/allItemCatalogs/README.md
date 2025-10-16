# All Item Catalogs Module

Module ini menyediakan API untuk mengelola semua jenis item katalog dalam satu endpoint yang unified. Module ini menggabungkan fungsionalitas dari semua module item catalog individual (engine, axle, cabin, steering, transmission) dengan parameter `master_catalog` untuk menentukan jenis katalog yang akan diproses.

## Fitur

- **Unified API**: Satu endpoint untuk semua jenis item catalog
- **Master Catalog Parameter**: Parameter `master_catalog` untuk menentukan jenis katalog (engine, axle, cabin, steering, transmission)
- **CRUD Operations**: Create, Read, Update, Delete untuk semua jenis item catalog
- **File Upload Support**: Upload file foto dan CSV
- **Pagination & Filtering**: Support pagination dan filtering untuk semua jenis
- **Search Functionality**: Pencarian di semua jenis item catalog
- **Transaction Support**: Database transaction untuk operasi yang kompleks

## Endpoints

### 1. Get All Items
```
POST /api/v1/all-item-catalogs/get
```

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "search term",
  "sort_by": "created_at",
  "sort_order": "desc",
  "master_pdf_id": "uuid",
  "master_catalog": "engine" // optional: engine, axle, cabin, steering, transmission
}
```

### 2. Get Item by ID
```
GET /api/v1/all-item-catalogs/{id}
```

### 3. Create Item
```
POST /api/v1/all-item-catalogs/create
```

**Form Data:**
- `name_pdf` (required): Nama file PDF
- `master_catalog` (required): Jenis katalog (engine, axle, cabin, steering, transmission)
- `use_csv` (optional): Boolean, default false
- `data_items` (required jika use_csv = false): JSON string array data items
- `file_foto` (optional): File foto
- `file_csv` (required jika use_csv = true): File CSV

### 4. Update Item
```
PUT /api/v1/all-item-catalogs/{id}
```

**Form Data:** Sama dengan create

### 5. Delete Item
```
DELETE /api/v1/all-item-catalogs/{id}
```

## Master Catalog Types

| Value | Description | Table Target |
|-------|-------------|--------------|
| `engine` | Engine catalog items | `item_catalog_engines` |
| `axle` | Axle catalog items | `item_catalog_axles` |
| `cabin` | Cabin catalog items | `item_catalog_cabines` |
| `steering` | Steering catalog items | `item_catalog_steerings` |
| `transmission` | Transmission catalog items | `item_catalog_transmissions` |

## Data Items Structure

Struktur data items yang sama untuk semua jenis catalog:

```json
[
  {
    "target_id": "string",
    "diagram_serial_number": "string",
    "part_number": "string",
    "catalog_item_name_en": "string",
    "catalog_item_name_ch": "string",
    "description": "string",
    "quantity": 1
  }
]
```

## File Upload

### Foto
- **Field name**: `file_foto`
- **Type**: Binary file
- **Required**: No
- **Storage**: MinIO

### CSV
- **Field name**: `file_csv`
- **Type**: CSV file
- **Required**: Yes (jika `use_csv = true`)
- **Format**: Standard CSV dengan kolom sesuai data_items structure

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "master_pdf_id": "uuid",
    "items": [...]
  },
  "message": "Data berhasil dibuat"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "detail": "Error detail"
}
```

## Database Tables

Module ini berinteraksi dengan tabel-tabel berikut:

1. `master_pdf` - Master PDF information
2. `item_catalog_engines` - Engine catalog items
3. `item_catalog_axles` - Axle catalog items
4. `item_catalog_cabines` - Cabin catalog items
5. `item_catalog_steerings` - Steering catalog items
6. `item_catalog_transmissions` - Transmission catalog items

## Dependencies

- Express.js
- PostgreSQL (via Knex.js)
- Multer (file upload)
- CSV Parser
- MinIO (file storage)

## Usage Example

### Create Engine Catalog Item
```javascript
const formData = new FormData();
formData.append('name_pdf', 'Engine Manual 2024');
formData.append('master_catalog', 'engine');
formData.append('use_csv', 'false');
formData.append('data_items', JSON.stringify([
  {
    "target_id": "ENG001",
    "part_number": "PN123456",
    "catalog_item_name_en": "Engine Filter",
    "quantity": 2
  }
]));

fetch('/api/v1/all-item-catalogs/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-token'
  },
  body: formData
});
```

### Get All Items with Filter
```javascript
fetch('/api/v1/all-item-catalogs/get', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  },
  body: JSON.stringify({
    page: 1,
    limit: 10,
    master_catalog: 'engine',
    search: 'filter'
  })
});
```

## Notes

- Jika `master_catalog` tidak diisi pada GET request, akan menampilkan data dari semua jenis catalog
- Module ini menggunakan soft delete (is_delete flag)
- Semua operasi menggunakan database transaction untuk konsistensi data
- File upload menggunakan Multer dengan memory storage
- CSV parsing menggunakan csv-parser library
