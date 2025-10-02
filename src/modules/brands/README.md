# Brands Module

Module untuk mengelola data brands dalam sistem katalog.

## Struktur Tabel

Tabel `brands` memiliki struktur berikut:

- `brand_id` (uuid) - Primary key
- `brand_code` (varchar(255)) - Kode brand (nullable)
- `brand_name` (varchar(255)) - Nama brand (nullable)
- `brand_description` (text) - Deskripsi brand (nullable)
- `created_at` - Timestamp pembuatan
- `created_by` (uuid) - ID user yang membuat
- `updated_at` - Timestamp update terakhir
- `updated_by` (uuid) - ID user yang melakukan update terakhir
- `deleted_at` - Timestamp soft delete
- `deleted_by` (uuid) - ID user yang menghapus
- `is_delete` (boolean) - Flag soft delete

## API Endpoints

### 1. Get All Brands (dengan filtering dan pagination)
```
POST /api/catalogs/brands/get
```

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
    "data": {
        "items": [
            {
                "brand_id": "123e4567-e89b-12d3-a456-426614174000",
                "brand_code": "BRD001",
                "brand_name": "Brand Example",
                "brand_description": "Description example",
                "created_at": "2025-01-01T00:00:00.000Z",
                "created_by": "123e4567-e89b-12d3-a456-426614174001",
                "updated_at": "2025-01-01T00:00:00.000Z",
                "updated_by": null,
                "deleted_at": null,
                "deleted_by": null,
                "is_delete": false
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 1,
            "totalPages": 1
        }
    }
}
```

### 2. Get Brand by ID
```
GET /api/catalogs/brands/:id
```

### 3. Create Brand
```
POST /api/catalogs/brands/create
```

**Request Body:**
```json
{
    "brand_code": "BRD001",
    "brand_name": "Brand Example",
    "brand_description": "Description example"
}
```

### 4. Update Brand
```
PUT /api/catalogs/brands/:id
```

**Request Body:**
```json
{
    "brand_name": "Updated Brand Name",
    "brand_description": "Updated description"
}
```

### 5. Delete Brand (Soft Delete)
```
DELETE /api/catalogs/brands/:id
```

### 6. Restore Brand
```
POST /api/catalogs/brands/:id/restore
```

## Filtering dan Sorting

- **Search**: Mencari berdasarkan `brand_name`, `brand_code`, atau `brand_description`
- **Sort by**: `created_at`, `updated_at`, `brand_name`, `brand_code`
- **Sort order**: `asc` atau `desc`

## Authentication

Semua endpoint memerlukan authentication menggunakan `verifyToken` middleware. 
Data `created_by`, `updated_by`, dan `deleted_by` akan diisi otomatis dari token yang dikirimkan 
(tersedia di `req.user.employee_id` atau `req.user.user_id`).

## Validation

- Semua field bersifat opsional sesuai requirements
- Panjang maksimal: `brand_code` dan `brand_name` (255 karakter), `brand_description` (1000 karakter)
- ID harus berupa UUID yang valid
- Pagination: page (min 1), limit (1-100)
