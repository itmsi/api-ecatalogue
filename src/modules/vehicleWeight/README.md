# Vehicle Weight Module

Module untuk mengelola data berat kendaraan dalam sistem katalog.

## Endpoints

### 1. Get Vehicle Weights (POST)
- **URL**: `/api/catalogs/vehicle_weights/get`
- **Method**: `POST`
- **Authentication**: Required (verifyToken)
- **Body**:
```json
{
  "page": 1,
  "limit": 10,
  "search": "",
  "sort_by": "created_at",
  "sort_order": "desc"
}
```

### 2. Get Vehicle Weight by ID (GET)
- **URL**: `/api/catalogs/vehicle_weights/:id`
- **Method**: `GET`
- **Authentication**: Required (verifyToken)
- **Params**: `id` (UUID)

### 3. Create Vehicle Weight (POST)
- **URL**: `/api/catalogs/vehicle_weights/create`
- **Method**: `POST`
- **Authentication**: Required (verifyToken)
- **Body**:
```json
{
  "vehicle_weight_code": "string (optional, max 255 chars)",
  "vehicle_weight_name": "string (optional, max 255 chars)",
  "vehicle_weight_description": "string (optional, max 1000 chars)"
}
```

### 4. Update Vehicle Weight (PUT)
- **URL**: `/api/catalogs/vehicle_weights/:id`
- **Method**: `PUT`
- **Authentication**: Required (verifyToken)
- **Params**: `id` (UUID)
- **Body**: Same as create (all fields optional)

### 5. Delete Vehicle Weight (DELETE)
- **URL**: `/api/catalogs/vehicle_weights/:id`
- **Method**: `DELETE`
- **Authentication**: Required (verifyToken)
- **Params**: `id` (UUID)

### 6. Restore Vehicle Weight (POST)
- **URL**: `/api/catalogs/vehicle_weights/:id/restore`
- **Method**: `POST`
- **Authentication**: Required (verifyToken)
- **Params**: `id` (UUID)

## Database Schema

Tabel: `vehicle_weights`

| Column | Type | Description |
|--------|------|-------------|
| vehicle_weight_id | UUID | Primary key |
| vehicle_weight_code | VARCHAR(255) | Kode berat kendaraan (nullable) |
| vehicle_weight_name | VARCHAR(255) | Nama berat kendaraan (nullable) |
| vehicle_weight_description | TEXT | Deskripsi berat kendaraan (nullable) |
| created_at | TIMESTAMP | Waktu pembuatan |
| created_by | UUID | ID pembuat (dari token) |
| updated_at | TIMESTAMP | Waktu update terakhir |
| updated_by | UUID | ID pengupdate (dari token) |
| deleted_at | TIMESTAMP | Waktu penghapusan (soft delete) |
| deleted_by | UUID | ID penghapus (dari token) |
| is_delete | BOOLEAN | Status penghapusan |

## Features

- ✅ CRUD Operations
- ✅ Soft Delete dengan Restore
- ✅ Pagination dan Search
- ✅ Sorting (by field dan order)
- ✅ Authentication dengan verifyToken
- ✅ Auto-fill created_by, updated_by, deleted_by dari token
- ✅ Validation untuk semua input
- ✅ Error handling yang konsisten
- ✅ Response format yang standar

## Usage

Module ini mengikuti pola yang sama dengan module lainnya dalam sistem. Semua endpoint memerlukan authentication token dan menggunakan middleware validation untuk memastikan data input sesuai dengan yang diharapkan.

Auto-fill fields:
- `created_by` dan `updated_by` otomatis diisi dari `employee_id` atau `user_id` yang ada di token
- `deleted_by` diisi saat soft delete
- Timestamps (`created_at`, `updated_at`, `deleted_at`) diisi otomatis
