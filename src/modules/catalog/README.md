# Catalog Module

Module untuk mengelola data katalog produk dengan dukungan hierarki (parent-child relationship) dan kategorisasi.

## Features

- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Soft delete dengan kemampuan restore
- ✅ Pagination
- ✅ Filter berdasarkan category dan parent catalog
- ✅ Search (catalog name, part number, target ID)
- ✅ Multi-language support (English & Chinese)
- ✅ Hierarchical structure (parent-child catalogs)
- ✅ Foreign key relationship dengan categories
- ✅ Validation menggunakan express-validator
- ✅ Swagger documentation

## Database Schema

### Table: catalogs

| Column                  | Type         | Description                                    |
|------------------------|--------------|------------------------------------------------|
| catalog_id             | UUID         | Primary key (auto-generated)                   |
| category_id            | UUID         | Foreign key ke tabel categories (nullable)     |
| catalog_parent_id      | UUID         | Self-referencing untuk parent catalog (nullable) |
| target_id              | VARCHAR(255) | Target identifier (nullable)                   |
| diagram_serial_number  | VARCHAR(255) | Serial number diagram (nullable)               |
| part_number            | VARCHAR(255) | Part number (nullable)                         |
| catalog_name_en        | VARCHAR(255) | Nama katalog dalam bahasa Inggris (nullable)   |
| catalog_name_ch        | VARCHAR(255) | Nama katalog dalam bahasa China (nullable)     |
| catalog_quantity       | INTEGER      | Jumlah stok (default: 0)                       |
| catalog_image          | TEXT         | URL atau path gambar katalog (nullable)        |
| catalog_description    | TEXT         | Deskripsi katalog (nullable)                   |
| created_at             | TIMESTAMP    | Waktu pembuatan                                |
| created_by             | UUID         | User yang membuat (nullable)                   |
| updated_at             | TIMESTAMP    | Waktu update terakhir                          |
| updated_by             | UUID         | User yang mengupdate (nullable)                |
| deleted_at             | TIMESTAMP    | Waktu soft delete (nullable)                   |
| deleted_by             | UUID         | User yang menghapus (nullable)                 |
| is_delete              | BOOLEAN      | Flag soft delete (default: false)              |

### Indexes
- idx_catalogs_category_id
- idx_catalogs_parent_id
- idx_catalogs_deleted_at
- idx_catalogs_is_delete
- idx_catalogs_created_at
- idx_catalogs_part_number
- idx_catalogs_target_id

## API Endpoints

Base URL: `/api/catalogs/catalogs`

### 1. POST `/catalogs/get` - Get All Catalogs
🔒 **Protected** - Requires Bearer Token

```
POST /api/catalogs/catalogs/get
Content-Type: application/json
Authorization: Bearer <token>

{
  "page": 1,
  "limit": 10,
  "category_id": "uuid",
  "catalog_parent_id": "uuid",
  "search": "keyword",
  "sort_by": "created_at",
  "sort_order": "desc"
}
```

**Request Body Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `category_id` (optional): Filter by category UUID
- `catalog_parent_id` (optional): Filter by parent catalog UUID
- `search` (optional): Search in catalog names, part number, target ID
- `sort_by` (optional): Field to sort by (default: created_at)
- `sort_order` (optional): Sort order asc/desc (default: desc)

**Response:**
```json
{
  "success": true,
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

### 2. GET `/:id` - Get Catalog by ID
🔒 **Protected** - Requires Bearer Token

```
GET /api/catalogs/catalogs/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "catalog_id": "uuid",
    "category_id": "uuid",
    "category_name": "Category Name",
    "catalog_parent_id": "uuid",
    "parent_catalog_name": "Parent Catalog",
    "target_id": "T123",
    "diagram_serial_number": "DS-001",
    "part_number": "PN-12345",
    "catalog_name_en": "Catalog Name English",
    "catalog_name_ch": "目录名称",
    "catalog_quantity": 100,
    "catalog_image": "https://example.com/image.jpg",
    "catalog_description": "Description...",
    "created_at": "2025-01-01T00:00:00.000Z",
    "updated_at": "2025-01-01T00:00:00.000Z"
  }
}
```

### 3. GET `/:id/children` - Get Catalog Children
🔒 **Protected** - Requires Bearer Token

```
GET /api/catalogs/catalogs/:id/children
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "catalog_id": "uuid",
      "catalog_name_en": "Child Catalog 1",
      ...
    }
  ]
}
```

### 4. POST `/create` - Create Catalog
🔒 **Protected** - Requires Bearer Token

```
POST /api/catalogs/catalogs/create
Content-Type: application/json
Authorization: Bearer <token>

{
  "category_id": "uuid",
  "catalog_parent_id": "uuid",
  "target_id": "T123",
  "diagram_serial_number": "DS-001",
  "part_number": "PN-12345",
  "catalog_name_en": "Catalog Name",
  "catalog_name_ch": "目录名称",
  "catalog_quantity": 100,
  "catalog_image": "https://example.com/image.jpg",
  "catalog_description": "Description..."
}
```

**Note**: Field `created_by` akan otomatis diisi dari token.

**Response:**
```json
{
  "success": true,
  "message": "Data katalog berhasil dibuat",
  "data": {...}
}
```

### 5. PUT `/:id` - Update Catalog
🔒 **Protected** - Requires Bearer Token

```
PUT /api/catalogs/catalogs/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "catalog_name_en": "Updated Name",
  "catalog_quantity": 150
}
```

**Note**: Field `updated_by` akan otomatis diisi dari token.

**Response:**
```json
{
  "success": true,
  "message": "Data katalog berhasil diupdate",
  "data": {...}
}
```

### 6. DELETE `/:id` - Delete Catalog (Soft Delete)
🔒 **Protected** - Requires Bearer Token

```
DELETE /api/catalogs/catalogs/:id
Authorization: Bearer <token>
```

**Note**: Field `deleted_by` akan otomatis diisi dari token.

**Response:**
```json
{
  "success": true,
  "message": "Data katalog berhasil dihapus"
}
```

### 7. POST `/:id/restore` - Restore Deleted Catalog
🔒 **Protected** - Requires Bearer Token

```
POST /api/catalogs/catalogs/:id/restore
Authorization: Bearer <token>
```

**Note**: Field `updated_by` akan otomatis diisi dari token saat restore.

**Response:**
```json
{
  "success": true,
  "message": "Data katalog berhasil direstore",
  "data": {...}
}
```

## Usage Example

### Create a Parent Catalog
```javascript
const token = 'your-bearer-token-here';

const response = await fetch('/api/catalogs/catalogs/create', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    category_id: 'category-uuid-here',
    catalog_name_en: 'Electronics',
    catalog_name_ch': '电子产品',
    catalog_quantity: 0
  })
});
```

### Create a Child Catalog
```javascript
const token = 'your-bearer-token-here';

const response = await fetch('/api/catalogs/catalogs/create', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    category_id: 'category-uuid-here',
    catalog_parent_id: 'parent-catalog-uuid',
    catalog_name_en: 'Smartphones',
    catalog_name_ch': '智能手机',
    part_number: 'PN-001',
    catalog_quantity: 50
  })
});
```

### Search Catalogs
```javascript
const token = 'your-bearer-token-here';

const response = await fetch('/api/catalogs/catalogs/get', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    search: 'smartphone',
    page: 1,
    limit: 10
  })
});
```

### Get Catalogs by Category
```javascript
const token = 'your-bearer-token-here';

const response = await fetch('/api/catalogs/catalogs/get', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    category_id: 'category-uuid-here',
    page: 1,
    limit: 10
  })
});
```

## File Structure

```
src/modules/catalog/
├── index.js                  # Routes definition
├── handler.js                # Request handlers
├── postgre_repository.js     # Database operations
├── validation.js             # Input validation rules
└── README.md                 # This file
```

## Dependencies

- express
- express-validator
- knex (database query builder)

## Notes

- Semua field kecuali `catalog_id` bersifat nullable/optional
- `catalog_quantity` default value adalah 0
- Soft delete digunakan, jadi data tidak benar-benar dihapus dari database
- Support untuk hierarchical structure (parent-child relationship)
- Foreign key constraints memastikan data integrity
- Indexes ditambahkan untuk optimasi query performance

