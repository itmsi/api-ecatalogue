# Cabines Module

Module untuk mengelola data cabines dengan relasi many-to-many ke type_cabines.

## Struktur Database

### Tabel `cabines`
- `cabines_id` (UUID, Primary Key)
- `cabines_name_en` (VARCHAR(255), nullable)
- `cabines_name_cn` (VARCHAR(255), nullable)
- `cabines_description` (TEXT, nullable)
- `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `is_delete`

### Tabel `cabines_type_cabines` (Relasi)
- `id` (UUID, Primary Key)
- `cabines_id` (UUID, Foreign Key ke cabines)
- `type_cabine_id` (UUID, Foreign Key ke type_cabines)
- `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `is_delete`

## Endpoints

### 1. GET Cabines List
**POST** `/api/catalogs/cabines/get`

**Body:**
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
                "cabines_id": "uuid",
                "cabines_name_en": "Standard Cab",
                "cabines_name_cn": "标准驾驶室",
                "cabines_description": "Standard cab type for trucks",
                "type_cabines": [
                    {
                        "type_cabine_id": "uuid",
                        "type_cabine_name_en": "Standard Cab",
                        "type_cabine_name_cn": "标准驾驶室",
                        "type_cabine_description": "Description"
                    }
                ],
                "created_at": "2025-01-01T00:00:00.000Z",
                "created_by": "uuid",
                "updated_at": "2025-01-01T00:00:00.000Z",
                "updated_by": "uuid",
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

### 2. GET Cabines by ID
**GET** `/api/catalogs/cabines/:id`

**Response:**
```json
{
    "success": true,
    "message": "Success",
    "data": {
        "cabines_id": "uuid",
        "cabines_name_en": "Standard Cab",
        "cabines_name_cn": "标准驾驶室",
        "cabines_description": "Standard cab type for trucks",
        "type_cabines": [
            {
                "type_cabine_id": "uuid",
                "type_cabine_name_en": "Standard Cab",
                "type_cabine_name_cn": "标准驾驶室",
                "type_cabine_description": "Description"
            }
        ],
        "created_at": "2025-01-01T00:00:00.000Z",
        "created_by": "uuid",
        "updated_at": "2025-01-01T00:00:00.000Z",
        "updated_by": "uuid",
        "deleted_at": null,
        "deleted_by": null,
        "is_delete": false
    }
}
```

### 3. CREATE Cabines
**POST** `/api/catalogs/cabines/create`

**Body:**
```json
{
    "cabines_name_en": "Standard Cab",
    "cabines_name_cn": "标准驾驶室",
    "cabines_description": "Standard cab type for trucks",
    "type_cabines": [
        {
            "type_cabine_name_en": "Standard Cab",
            "type_cabine_name_cn": "标准驾驶室",
            "type_cabine_description": "Standard cab type description"
        },
        {
            "type_cabine_name_en": "Extended Cab",
            "type_cabine_name_cn": "扩展驾驶室",
            "type_cabine_description": "Extended cab type description"
        }
    ]
}
```

### 4. UPDATE Cabines
**PUT** `/api/catalogs/cabines/:id`

**Body:**
```json
{
    "cabines_name_en": "Standard Cab",
    "cabines_name_cn": "标准驾驶室",
    "cabines_description": "Standard cab type for trucks",
    "type_cabines": [
        {
            "type_cabine_name_en": "Standard Cab",
            "type_cabine_name_cn": "标准驾驶室",
            "type_cabine_description": "Standard cab type description"
        },
        {
            "type_cabine_name_en": "Extended Cab",
            "type_cabine_name_cn": "扩展驾驶室",
            "type_cabine_description": "Extended cab type description"
        }
    ]
}
```

### 5. DELETE Cabines
**DELETE** `/api/catalogs/cabines/:id`

### 6. RESTORE Cabines
**POST** `/api/catalogs/cabines/:id/restore`

### 7. GET Type Cabines List
**GET** `/api/catalogs/cabines/type-cabines/list`

**Response:**
```json
{
    "success": true,
    "message": "Success",
    "data": [
        {
            "type_cabine_id": "uuid",
            "type_cabine_name_en": "Standard Cab",
            "type_cabine_name_cn": "标准驾驶室",
            "type_cabine_description": "Description"
        }
    ]
}
```

## Authentication

Semua endpoint memerlukan authentication token yang dikirim melalui header:
```
Authorization: Bearer <token>
```

User ID untuk audit fields (`created_by`, `updated_by`, `deleted_by`) akan diambil dari token yang dikirimkan.

## Validation

- `cabines_name_en`: Optional, maksimal 255 karakter
- `cabines_name_cn`: Optional, maksimal 255 karakter
- `cabines_description`: Optional
- `type_cabines`: Optional array, setiap item harus memiliki `type_cabine_name_en`, `type_cabine_name_cn`, dan `type_cabine_description`
- `page`: Optional, minimal 1
- `limit`: Optional, 1-100
- `search`: Optional string
- `sort_by`: Optional, salah satu dari: created_at, cabines_name_en, cabines_name_cn, updated_at
- `sort_order`: Optional, asc atau desc

## Error Handling

Module menggunakan standard error response format:
```json
{
    "success": false,
    "message": "Error message",
    "error": "Error message",
    "errors": null,
    "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## Notes

- Semua operasi menggunakan soft delete (tidak menghapus data secara permanen)
- Relasi dengan type_cabines adalah many-to-many, dimana type_cabines dibuat baru saat create/update
- Search dapat dilakukan berdasarkan nama (EN/CN) dan deskripsi
- Pagination menggunakan offset-based pagination
- Audit fields diisi otomatis berdasarkan token user
