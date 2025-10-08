# Type Steering Module

Module ini mengelola data type steering (jenis kemudi) dalam sistem e-katalog.

## Deskripsi

Module Type Steering menyediakan fungsionalitas CRUD lengkap untuk mengelola jenis-jenis kemudi kendaraan dengan dukungan multi-bahasa (English dan Chinese), termasuk pencarian, pagination, sorting, dan soft delete.

## Fitur

- ✅ Pagination dan sorting
- ✅ Search/filter berdasarkan nama (EN/CN) dan deskripsi
- ✅ Multi-bahasa (English & Chinese)
- ✅ Soft delete dengan kemampuan restore
- ✅ Audit trail (created_by, updated_by, deleted_by)
- ✅ Token authentication menggunakan JWT
- ✅ Validasi input menggunakan express-validator
- ✅ Response format standar

## Endpoints

### 1. Get All Type Steerings
**POST** `/api/catalogs/type_steering/get`

Mendapatkan daftar type steering dengan pagination, search, dan sorting.

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "",
  "sort_by": "created_at",
  "sort_order": "desc"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### 2. Get Type Steering by ID
**GET** `/api/catalogs/type_steering/:id`

Mendapatkan detail type steering berdasarkan ID.

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "type_steering_id": "uuid",
    "type_steering_name_en": "Power Steering",
    "type_steering_name_cn": "动力转向",
    "type_steering_description": "Kemudi dengan bantuan tenaga"
  }
}
```

### 3. Create Type Steering
**POST** `/api/catalogs/type_steering/create`

Membuat type steering baru.

**Request Body:**
```json
{
  "type_steering_name_en": "Power Steering",
  "type_steering_name_cn": "动力转向",
  "type_steering_description": "Kemudi dengan bantuan tenaga"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Type steering berhasil dibuat",
  "data": {...}
}
```

### 4. Update Type Steering
**PUT** `/api/catalogs/type_steering/:id`

Mengupdate type steering yang sudah ada.

**Request Body:**
```json
{
  "type_steering_name_en": "Electric Power Steering",
  "type_steering_name_cn": "电动助力转向",
  "type_steering_description": "Kemudi dengan bantuan tenaga listrik"
}
```

### 5. Delete Type Steering
**DELETE** `/api/catalogs/type_steering/:id`

Soft delete type steering (data tidak benar-benar dihapus).

**Response:**
```json
{
  "success": true,
  "message": "Type steering berhasil dihapus"
}
```

### 6. Restore Type Steering
**POST** `/api/catalogs/type_steering/:id/restore`

Restore type steering yang sudah di-soft delete.

## Database Schema

Tabel: `type_steerings`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| type_steering_id | UUID | Primary key |
| type_steering_name_en | VARCHAR(255) | Nama dalam bahasa Inggris (nullable) |
| type_steering_name_cn | VARCHAR(255) | Nama dalam bahasa China (nullable) |
| type_steering_description | TEXT | Deskripsi (nullable) |
| created_at | TIMESTAMP | Waktu pembuatan |
| created_by | UUID | User yang membuat (nullable) |
| updated_at | TIMESTAMP | Waktu update terakhir |
| updated_by | UUID | User yang mengupdate (nullable) |
| deleted_at | TIMESTAMP | Waktu soft delete (nullable) |
| deleted_by | UUID | User yang menghapus (nullable) |
| is_delete | BOOLEAN | Flag soft delete (default: false) |

## Authentication

Semua endpoint memerlukan token JWT yang valid. Token harus disertakan dalam header:

```
Authorization: Bearer <your-token>
```

Token akan diextract untuk mendapatkan `employee_id` atau `user_id` yang digunakan untuk audit trail.

## Validation

- **page**: Integer positif (minimum 1)
- **limit**: Integer antara 1-100
- **search**: String maksimal 255 karakter
- **sort_by**: Harus salah satu dari: created_at, updated_at, type_steering_name_en, type_steering_name_cn
- **sort_order**: Harus 'asc' atau 'desc'
- **type_steering_name_en**: String maksimal 255 karakter
- **type_steering_name_cn**: String maksimal 255 karakter
- **type_steering_description**: String (text)
- **id**: UUID valid

## Error Handling

Module ini menggunakan error handler standar yang sudah ada di utils/response:

- 400: Bad Request - Validation Error
- 401: Unauthorized - Token tidak valid/tidak ada
- 404: Not Found - Data tidak ditemukan
- 500: Internal Server Error

## Dependencies

- express
- express-validator
- knex (database query builder)
- JWT middleware untuk authentication

## Migration

Migration file: `20250117000014_create_type_steerings_table.js`

Untuk menjalankan migration:
```bash
npm run migrate
```

Untuk rollback:
```bash
npm run migrate:rollback
```

## File Structure

```
typeSteering/
├── handler.js           # Business logic handlers
├── index.js            # Routes definition
├── postgre_repository.js # Database operations
├── validation.js       # Input validation rules
└── README.md          # Documentation
```

## Usage Example

```javascript
// Import module
const typeSteeringModule = require('./modules/typeSteering');

// Register route
app.use('/api/catalogs/type_steering', typeSteeringModule);
```

## Swagger Documentation

Dokumentasi API lengkap tersedia di Swagger UI setelah server berjalan:
```
http://localhost:PORT/api-docs
```

## Notes

- Semua field nama dan deskripsi bersifat nullable/optional
- Search akan mencari di kolom: type_steering_name_en, type_steering_name_cn, dan type_steering_description
- Soft delete digunakan untuk menghindari kehilangan data permanen
- User ID untuk audit trail otomatis diambil dari token JWT

