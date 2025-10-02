# Locations Module

Module untuk mengelola data lokasi dalam sistem.

## Endpoints

Semua endpoints memerlukan autentikasi JWT token (Bearer token).

- `POST /api/catalogs/locations/get` - Mendapatkan daftar lokasi dengan paginasi
- `GET /api/catalogs/locations/:id` - Mendapatkan lokasi berdasarkan ID
- `POST /api/catalogs/locations/create` - Membuat lokasi baru
- `PUT /api/catalogs/locations/:id` - Mengupdate lokasi
- `DELETE /api/catalogs/locations/:id` - Soft delete lokasi
- `POST /api/catalogs/locations/:id/restore` - Restore lokasi yang sudah dihapus

## Database Schema

### Tabel: locations

| Column | Type | Description |
|--------|------|-------------|
| location_id | UUID | Primary key |
| location_name | VARCHAR(255) | Nama lokasi (nullable) |
| location_description | TEXT | Deskripsi lokasi (nullable) |
| created_at | TIMESTAMP | Waktu pembuatan |
| created_by | VARCHAR(255) | User yang membuat (nullable) |
| updated_at | TIMESTAMP | Waktu update terakhir |
| updated_by | VARCHAR(255) | User yang mengupdate (nullable) |
| deleted_at | TIMESTAMP | Waktu penghapusan (nullable) |
| deleted_by | VARCHAR(255) | User yang menghapus (nullable) |
| is_delete | BOOLEAN | Status penghapusan |

## Validation Rules

### Create/Update Location
- `location_name`: Maksimal 255 karakter (optional)
- `location_description`: Maksimal 1000 karakter (optional)

**Note**: `created_by`, `updated_by`, dan `deleted_by` akan diisi otomatis dari JWT token yang dikirimkan.

### Get by ID
- `id`: Harus berupa UUID yang valid

### Pagination & Filtering
- `page`: Harus berupa angka positif (default: 1)
- `limit`: Harus antara 1-100 (default: 10)
- `search`: String untuk pencarian di kolom location_name dan location_description (optional)
- `sort_by`: Kolom untuk sorting - location_id, location_name, created_at, updated_at (default: created_at)
- `sort_order`: Urutan sorting - asc atau desc (default: desc)

## Response Format

Semua response menggunakan format standar dari `utils/response.js`:

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

## Example Request

### Get Locations with Filter
```bash
curl -X POST http://localhost:9549/api/catalogs/locations/get \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "Jakarta",
    "sort_by": "created_at",
    "sort_order": "desc"
  }'
```

### Create Location
```bash
curl -X POST http://localhost:9549/api/catalogs/locations/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "location_name": "Jakarta Pusat",
    "location_description": "Kantor pusat di Jakarta Pusat"
  }'
```

**Note**: `created_by` akan diisi otomatis dari JWT token.

## Error Handling

Module ini menggunakan error handler standar yang mengembalikan:

```json
{
  "success": false,
  "error": "Error message",
  "details": {...}
}
```
