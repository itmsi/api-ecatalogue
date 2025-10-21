# Master PDF Module

Module ini menyediakan API untuk mengelola data master PDF dengan berbagai operasi pencarian dan filtering.

## Deskripsi

Master PDF Module menyediakan endpoint untuk:
- Mendapatkan daftar master PDF dengan pagination dan filtering
- Mendapatkan detail master PDF berdasarkan ID
- Mendapatkan statistik master PDF
- Mencari master PDF berdasarkan kriteria tertentu
- Mendapatkan daftar kategori dan status yang tersedia

## Struktur File

```
src/modules/masterPdf/
├── handler.js              # Handler untuk semua endpoint
├── index.js                # Router dan routing configuration
├── postgre_repository.js   # Repository untuk operasi database
├── validation.js           # Validasi input untuk semua endpoint
└── README.md              # Dokumentasi module ini
```

## Endpoints

### 1. Get Master PDF List (POST)
**Endpoint:** `POST /api/v1/master-pdf/get`

Mendapatkan daftar master PDF dengan pagination dan filtering.

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "",
  "sort_by": "created_at",
  "sort_order": "desc",
  "status": "",
  "category": ""
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data master PDF berhasil diambil",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Product Manual 2024",
      "description": "Manual produk terbaru tahun 2024",
      "file_path": "/uploads/manuals/product_manual_2024.pdf",
      "file_size": 2048576,
      "category": "manual",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 25,
    "total_pages": 3,
    "has_next_page": true,
    "has_prev_page": false
  }
}
```

### 2. Get Master PDF by ID (GET)
**Endpoint:** `GET /api/v1/master-pdf/:id`

Mendapatkan detail master PDF berdasarkan ID.

**Parameters:**
- `id` (UUID): ID master PDF

**Response:**
```json
{
  "success": true,
  "message": "Data master PDF berhasil diambil",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Product Manual 2024",
    "description": "Manual produk terbaru tahun 2024",
    "file_path": "/uploads/manuals/product_manual_2024.pdf",
    "file_size": 2048576,
    "category": "manual",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 3. Get Master PDF Statistics (GET)
**Endpoint:** `GET /api/v1/master-pdf/stats`

Mendapatkan statistik master PDF.

**Response:**
```json
{
  "success": true,
  "message": "Statistik master PDF berhasil diambil",
  "data": {
    "total_count": 100,
    "status_stats": [
      {
        "status": "active",
        "count": 80
      },
      {
        "status": "inactive",
        "count": 20
      }
    ],
    "category_stats": [
      {
        "category": "manual",
        "count": 50
      },
      {
        "category": "catalog",
        "count": 30
      }
    ],
    "recent_uploads": 5,
    "file_size_stats": {
      "total_files": 100,
      "total_size": 1048576000,
      "avg_size": 10485760,
      "min_size": 1024,
      "max_size": 104857600
    }
  }
}
```

### 4. Search Master PDF (POST)
**Endpoint:** `POST /api/v1/master-pdf/search`

Mencari master PDF berdasarkan kriteria tertentu.

**Request Body:**
```json
{
  "search_term": "manual",
  "category": "manual",
  "status": "active",
  "limit": 50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pencarian master PDF berhasil",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Product Manual 2024",
      "description": "Manual produk terbaru tahun 2024",
      "file_path": "/uploads/manuals/product_manual_2024.pdf",
      "file_size": 2048576,
      "category": "manual",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}
```

### 5. Get Categories (GET)
**Endpoint:** `GET /api/v1/master-pdf/categories`

Mendapatkan daftar kategori yang tersedia.

**Response:**
```json
{
  "success": true,
  "message": "Daftar kategori berhasil diambil",
  "data": ["manual", "catalog", "brochure", "specification", "guide"]
}
```

### 6. Get Statuses (GET)
**Endpoint:** `GET /api/v1/master-pdf/statuses`

Mendapatkan daftar status yang tersedia.

**Response:**
```json
{
  "success": true,
  "message": "Daftar status berhasil diambil",
  "data": ["active", "inactive", "draft", "archived"]
}
```

## Validasi Input

### Get List Validation
- `page`: Integer, minimum 1
- `limit`: Integer, 1-100
- `search`: String, maksimal 255 karakter
- `sort_by`: Enum ['id', 'name', 'description', 'file_path', 'file_size', 'category', 'status', 'created_at', 'updated_at']
- `sort_order`: Enum ['asc', 'desc']
- `status`: String, maksimal 50 karakter
- `category`: String, maksimal 100 karakter

### Get by ID Validation
- `id`: UUID format

### Search Validation
- `search_term`: String, maksimal 255 karakter
- `category`: String, maksimal 100 karakter
- `status`: String, maksimal 50 karakter
- `limit`: Integer, 1-100

## Database Schema

Module ini menggunakan tabel `master_pdf` dengan struktur:

```sql
CREATE TABLE master_pdf (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500),
    file_size INTEGER,
    category VARCHAR(100),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Error Handling

Semua endpoint mengembalikan response dengan format:

**Success Response:**
```json
{
  "success": true,
  "message": "Pesan sukses",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Pesan error"
}
```

## Authentication

Semua endpoint memerlukan authentication token yang valid melalui header:
```
Authorization: Bearer <token>
```

## Contoh Penggunaan

### Menggunakan cURL

```bash
# Get list dengan pagination
curl -X POST "http://localhost:3000/api/v1/master-pdf/get" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "manual",
    "sort_by": "created_at",
    "sort_order": "desc"
  }'

# Get by ID
curl -X GET "http://localhost:3000/api/v1/master-pdf/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer your-token"

# Get statistics
curl -X GET "http://localhost:3000/api/v1/master-pdf/stats" \
  -H "Authorization: Bearer your-token"

# Search
curl -X POST "http://localhost:3000/api/v1/master-pdf/search" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "search_term": "manual",
    "category": "manual",
    "limit": 20
  }'

# Get categories
curl -X GET "http://localhost:3000/api/v1/master-pdf/categories" \
  -H "Authorization: Bearer your-token"

# Get statuses
curl -X GET "http://localhost:3000/api/v1/master-pdf/statuses" \
  -H "Authorization: Bearer your-token"
```

## Dependencies

- `express`: Web framework
- `express-validator`: Input validation
- `knex`: Database query builder
- `pg`: PostgreSQL client

## Notes

- Semua endpoint menggunakan method POST untuk get data sesuai permintaan
- Pagination menggunakan offset-based pagination
- Search menggunakan ILIKE untuk case-insensitive search
- File size dalam bytes
- Timestamp menggunakan format ISO 8601
- Semua response menggunakan bahasa Indonesia
