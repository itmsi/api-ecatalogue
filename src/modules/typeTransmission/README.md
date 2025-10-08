# Type Transmission Module

Module ini menangani operasi CRUD untuk data type transmission dengan fitur pagination, search, dan filtering.

## Endpoints

### GET Data Type Transmission
- **POST** `/api/catalogs/type_transmission/get` - Ambil data dengan pagination dan filtering
- **GET** `/api/catalogs/type_transmission/:id` - Ambil data berdasarkan ID

### CREATE Type Transmission
- **POST** `/api/catalogs/type_transmission/create` - Buat data baru

### UPDATE Type Transmission
- **PUT** `/api/catalogs/type_transmission/:id` - Update data

### DELETE Type Transmission
- **DELETE** `/api/catalogs/type_transmission/:id` - Soft delete data
- **POST** `/api/catalogs/type_transmission/:id/restore` - Restore data yang dihapus

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
  "type_transmission_name_en": "Manual Transmission",
  "type_transmission_name_cn": "手动变速器",
  "type_transmission_description": "Transmission yang dioperasikan secara manual"
}
```

### Update Data (PUT /:id)
```json
{
  "type_transmission_name_en": "Automatic Transmission",
  "type_transmission_name_cn": "自动变速器",
  "type_transmission_description": "Transmission yang beroperasi otomatis"
}
```

## Authentication
Semua endpoint memerlukan authentication token yang valid melalui middleware `verifyToken`.

## Database Schema
- `type_transmission_id` (UUID, Primary Key)
- `type_transmission_name_en` (VARCHAR 255, nullable)
- `type_transmission_name_cn` (VARCHAR 255, nullable)
- `type_transmission_description` (TEXT, nullable)
- `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `is_delete`
