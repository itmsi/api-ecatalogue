# Steering Module

Module ini mengelola data steering (kemudi) dalam sistem e-katalog dengan relasi ke type_steerings.

## Deskripsi

Module Steering menyediakan fungsionalitas CRUD lengkap untuk mengelola data kemudi kendaraan dengan dukungan multi-bahasa (English dan Chinese), termasuk relasi dengan type_steerings, pencarian, pagination, sorting, dan soft delete.

## Fitur

- ✅ CRUD lengkap dengan relasi ke type_steerings
- ✅ Pagination dan sorting
- ✅ Search/filter berdasarkan nama (EN/CN) dan deskripsi
- ✅ Multi-bahasa (English & Chinese)
- ✅ Soft delete dengan kemampuan restore
- ✅ Audit trail (created_by, updated_by, deleted_by)
- ✅ Token authentication menggunakan JWT
- ✅ Validasi input menggunakan express-validator
- ✅ Response format standar
- ✅ Transaction handling untuk data konsistensi

## Database Schema

### Tabel: `steerings`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| steering_id | UUID | Primary key |
| steering_name_en | VARCHAR(255) | Nama dalam bahasa Inggris (nullable) |
| steering_name_cn | VARCHAR(255) | Nama dalam bahasa China (nullable) |
| steering_description | TEXT | Deskripsi (nullable) |
| created_at | TIMESTAMP | Waktu pembuatan |
| created_by | UUID | User yang membuat (nullable) |
| updated_at | TIMESTAMP | Waktu update terakhir |
| updated_by | UUID | User yang mengupdate (nullable) |
| deleted_at | TIMESTAMP | Waktu soft delete (nullable) |
| deleted_by | UUID | User yang menghapus (nullable) |
| is_delete | BOOLEAN | Flag soft delete (default: false) |

### Tabel Junction: `steerings_type_steerings`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| steering_id | UUID | Foreign key ke steerings |
| type_steering_id | UUID | Foreign key ke type_steerings |
| created_at | TIMESTAMP | Waktu pembuatan |
| created_by | UUID | User yang membuat |
| updated_at | TIMESTAMP | Waktu update terakhir |
| updated_by | UUID | User yang mengupdate |
| deleted_at | TIMESTAMP | Waktu soft delete (nullable) |
| deleted_by | UUID | User yang menghapus (nullable) |
| is_delete | BOOLEAN | Flag soft delete |

## Endpoints

### 1. Get All Steerings
**POST** `/api/catalogs/steering/get`

Mendapatkan daftar steering dengan pagination, search, sorting, dan termasuk data type_steerings.

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
    "items": [
      {
        "steering_id": "uuid",
        "steering_name_en": "Power Steering",
        "steering_name_cn": "动力转向",
        "steering_description": "Power steering system",
        "type_steerings": [
          {
            "type_steering_id": "uuid",
            "type_steering_name_en": "Electric Power Steering",
            "type_steering_name_cn": "电动助力转向"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### 2. Get Steering by ID
**GET** `/api/catalogs/steering/:id`

Mendapatkan detail steering berdasarkan ID dengan data type_steerings.

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "steering_id": "uuid",
    "steering_name_en": "Power Steering",
    "steering_name_cn": "动力转向",
    "steering_description": "Power steering system",
    "type_steerings": [
      {
        "type_steering_id": "uuid",
        "type_steering_name_en": "Electric Power Steering",
        "type_steering_name_cn": "电动助力转向"
      }
    ]
  }
}
```

### 3. Create Steering
**POST** `/api/catalogs/steering/create`

Membuat steering baru dengan type_steerings.

**Request Body:**
```json
{
  "steering_name_en": "Power Steering",
  "steering_name_cn": "动力转向",
  "steering_description": "Power steering system",
  "type_steerings": [
    {
      "type_steering_name_en": "Electric Power Steering",
      "type_steering_name_cn": "电动助力转向"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Steering berhasil dibuat",
  "data": {
    "steering_id": "uuid",
    "steering_name_en": "Power Steering",
    "steering_name_cn": "动力转向",
    "steering_description": "Power steering system"
  }
}
```

### 4. Update Steering
**PUT** `/api/catalogs/steering/:id`

Mengupdate steering yang sudah ada beserta type_steerings-nya.

**Request Body:**
```json
{
  "steering_name_en": "Hydraulic Power Steering",
  "steering_name_cn": "液压助力转向",
  "steering_description": "Hydraulic power steering system",
  "type_steerings": [
    {
      "type_steering_name_en": "Hydraulic Assist",
      "type_steering_name_cn": "液压辅助"
    }
  ]
}
```

### 5. Delete Steering
**DELETE** `/api/catalogs/steering/:id`

Soft delete steering beserta relasi type_steerings-nya.

**Response:**
```json
{
  "success": true,
  "message": "Steering berhasil dihapus"
}
```

### 6. Restore Steering
**POST** `/api/catalogs/steering/:id/restore`

Restore steering yang sudah di-soft delete beserta relasinya.

### 7. Get All Type Steerings
**GET** `/api/catalogs/steering/type-steerings/all`

Mendapatkan semua type steerings untuk dropdown/selection.

## Cara Kerja Relasi

1. **Create**: Ketika membuat steering baru dengan type_steerings:
   - Data steering disimpan ke tabel `steerings`
   - Setiap type_steering di array akan disimpan ke tabel `type_steerings`
   - Relasi dibuat di tabel junction `steerings_type_steerings`
   - Semua proses dilakukan dalam satu transaction

2. **Update**: Ketika mengupdate steering:
   - Data steering di-update
   - Relasi lama di tabel junction dihapus
   - Type_steerings baru dibuat
   - Relasi baru dibuat di tabel junction
   - Semua proses dalam transaction untuk memastikan konsistensi

3. **Delete**: Ketika soft delete steering:
   - Steering di-soft delete
   - Semua relasi di tabel junction juga di-soft delete
   - Data tidak benar-benar dihapus

4. **Restore**: Ketika restore steering:
   - Steering di-restore
   - Semua relasi di tabel junction juga di-restore

## Authentication

Semua endpoint memerlukan token JWT yang valid. Token harus disertakan dalam header:

```
Authorization: Bearer <your-token>
```

Token akan diextract untuk mendapatkan `employee_id` atau `user_id` yang digunakan untuk audit trail.

## Validation

- **page**: Integer positif (minimum 1)
- **limit**: Integer antara 1-100
- **search**: String
- **sort_by**: Harus salah satu dari: created_at, updated_at, steering_name_en, steering_name_cn
- **sort_order**: Harus 'asc' atau 'desc'
- **steering_name_en**: String maksimal 255 karakter
- **steering_name_cn**: String maksimal 255 karakter
- **steering_description**: String (text)
- **type_steerings**: Array of objects
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

Migration files:
- `20250117000015_create_steerings_table.js`
- `20250117000016_create_steerings_type_steerings_table.js`

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
steering/
├── handler.js           # Business logic handlers
├── index.js            # Routes definition
├── postgre_repository.js # Database operations
├── validation.js       # Input validation rules
└── README.md          # Documentation
```

## Usage Example

```javascript
// Import module
const steeringModule = require('./modules/steering');

// Register route
app.use('/api/catalogs/steering', steeringModule);
```

## Swagger Documentation

Dokumentasi API lengkap tersedia di Swagger UI setelah server berjalan:
```
http://localhost:PORT/api-docs
```

## Notes

- Semua field nama dan deskripsi bersifat nullable/optional
- Search akan mencari di kolom: steering_name_en, steering_name_cn, dan steering_description
- Soft delete digunakan untuk menghindari kehilangan data permanen
- User ID untuk audit trail otomatis diambil dari token JWT
- Transaction digunakan untuk memastikan konsistensi data antara tabel steerings, type_steerings, dan junction table
- Ketika update, relasi lama akan dihapus dan diganti dengan yang baru

