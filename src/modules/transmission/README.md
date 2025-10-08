# Transmission Module

Module ini menangani operasi CRUD untuk data transmission dengan relasi ke type_transmissions dan fitur pagination, search, dan filtering.

## Endpoints

### GET Data Transmission
- **POST** `/api/catalogs/transmission/get` - Ambil data dengan pagination dan filtering
- **GET** `/api/catalogs/transmission/:id` - Ambil data berdasarkan ID dengan type_transmissions

### CREATE Transmission
- **POST** `/api/catalogs/transmission/create` - Buat data baru dengan type_transmissions

### UPDATE Transmission
- **PUT** `/api/catalogs/transmission/:id` - Update data dengan type_transmissions

### DELETE Transmission
- **DELETE** `/api/catalogs/transmission/:id` - Soft delete data
- **POST** `/api/catalogs/transmission/:id/restore` - Restore data yang dihapus

## Request/Response Format

### Get Data (POST /get)
```json
{
  "page": 1,
  "limit": 10,
  "search": "",
  "sort_by": "created_at",
  "sort_order": "desc"
}
```

### Create Data (POST /create)
```json
{
  "transmission_name_en": "Standard Cab",
  "transmission_name_cn": "标准驾驶室",
  "transmission_description": "Standard cab type for trucks",
  "type_transmissions": [
    {
      "type_transmission_name_en": "Standard Cab",
      "type_transmission_name_cn": "标准驾驶室"
    },
    {
      "type_transmission_name_en": "Extended Cab",
      "type_transmission_name_cn": "扩展驾驶室"
    }
  ]
}
```

### Update Data (PUT /:id)
```json
{
  "transmission_name_en": "Updated Cab",
  "transmission_name_cn": "更新驾驶室",
  "transmission_description": "Updated cab description",
  "type_transmissions": [
    {
      "type_transmission_name_en": "New Type",
      "type_transmission_name_cn": "新类型"
    }
  ]
}
```

### Get By ID Response
```json
{
  "transmission_id": "uuid",
  "transmission_name_en": "Standard Cab",
  "transmission_name_cn": "标准驾驶室",
  "transmission_description": "Standard cab type for trucks",
  "created_at": "2025-01-17T10:30:00.000Z",
  "created_by": "uuid",
  "updated_at": "2025-01-17T10:30:00.000Z",
  "updated_by": "uuid",
  "deleted_at": null,
  "deleted_by": null,
  "is_delete": false,
  "type_transmissions": [
    {
      "type_transmission_id": "uuid",
      "type_transmission_name_en": "Standard Cab",
      "type_transmission_name_cn": "标准驾驶室",
      "type_transmission_description": "Description"
    }
  ]
}
```

## Authentication
Semua endpoint memerlukan authentication token yang valid melalui middleware `verifyToken`.

## Database Schema
- **transmissions**: Tabel utama transmission
  - `transmission_id` (UUID, Primary Key)
  - `transmission_name_en` (VARCHAR 255, nullable)
  - `transmission_name_cn` (VARCHAR 255, nullable)
  - `transmission_description` (TEXT, nullable)
  - `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `is_delete`

- **transmissions_type_transmissions**: Tabel relasi
  - `id` (UUID, Primary Key)
  - `transmission_id` (UUID, Foreign Key)
  - `type_transmission_id` (UUID, Foreign Key)
  - `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `is_delete`

## Relasi
Module ini memiliki relasi many-to-many dengan tabel `type_transmissions` melalui tabel `transmissions_type_transmissions`.
