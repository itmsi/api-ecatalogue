# Category Module

Module ini menangani operasi CRUD untuk kategori dengan fitur-fitur berikut:

## Fitur

- **Create**: Membuat kategori baru
- **Read**: Membaca daftar kategori dengan paginasi
- **Update**: Mengupdate kategori yang sudah ada
- **Delete**: Soft delete kategori (tidak menghapus data permanen)
- **Restore**: Mengembalikan kategori yang sudah dihapus
- **Hard Delete**: Menghapus kategori secara permanen
- **Search**: Mencari kategori berdasarkan nama atau deskripsi

## Struktur Database

Tabel `categories` memiliki struktur sebagai berikut:

- `category_id` (UUID, Primary Key)
- `category_name` (VARCHAR 255, Required)
- `category_description` (TEXT, Optional)
- `created_at` (TIMESTAMP)
- `created_by` (UUID, Optional)
- `updated_at` (TIMESTAMP)
- `updated_by` (UUID, Optional)
- `deleted_at` (TIMESTAMP, Nullable)
- `deleted_by` (UUID, Optional)
- `is_delete` (BOOLEAN, Default: false)

## Endpoints

### GET /api/categories
Mendapatkan daftar kategori dengan paginasi

**Query Parameters:**
- `page` (optional): Halaman (default: 1)
- `limit` (optional): Jumlah data per halaman (default: 10, max: 100)

### GET /api/categories/all
Mendapatkan semua kategori termasuk yang sudah dihapus (untuk admin)

### GET /api/categories/search
Mencari kategori berdasarkan kata kunci

**Query Parameters:**
- `search` (required): Kata kunci pencarian
- `page` (optional): Halaman
- `limit` (optional): Jumlah data per halaman

### GET /api/categories/:id
Mendapatkan kategori berdasarkan ID

### POST /api/categories
Membuat kategori baru

**Request Body:**
```json
{
  "category_name": "Nama Kategori",
  "category_description": "Deskripsi kategori",
  "created_by": "uuid-user-id"
}
```

### PUT /api/categories/:id
Mengupdate kategori

**Request Body:**
```json
{
  "category_name": "Nama Kategori Updated",
  "category_description": "Deskripsi kategori updated",
  "updated_by": "uuid-user-id"
}
```

### DELETE /api/categories/:id
Soft delete kategori

### POST /api/categories/:id/restore
Mengembalikan kategori yang sudah dihapus

### DELETE /api/categories/:id/permanent
Hard delete kategori (permanent)

## Validasi

- Nama kategori wajib diisi, minimal 3 karakter, maksimal 255 karakter
- Deskripsi kategori maksimal 1000 karakter
- ID harus berupa UUID yang valid
- Pagination page minimal 1, limit maksimal 100

## Response Format

Semua response menggunakan format standar dari `utils/response.js`:

```json
{
  "success": true,
  "message": "Pesan sukses",
  "data": {
    // Data response
  },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

Untuk error:
```json
{
  "success": false,
  "message": "Pesan error",
  "error": {
    // Detail error
  },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```
