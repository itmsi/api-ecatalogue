# Type Axel Module

Module untuk mengelola data type axel dalam sistem catalog.

## Endpoints

### 1. Get All Type Axels (dengan pagination dan filter)
```
POST /api/catalogs/type_axel/get
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
        "type_axel_id": "uuid",
        "type_axel_name_en": "string",
        "type_axel_name_cn": "string",
        "type_axel_description": "string",
        "created_at": "timestamp",
        "created_by": "uuid",
        "updated_at": "timestamp",
        "updated_by": "uuid",
        "deleted_at": null,
        "deleted_by": null,
        "is_delete": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### 2. Get Type Axel by ID
```
GET /api/catalogs/type_axel/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type_axel_id": "uuid",
    "type_axel_name_en": "string",
    "type_axel_name_cn": "string",
    "type_axel_description": "string",
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  }
}
```

### 3. Create Type Axel
```
POST /api/catalogs/type_axel/create
```

**Request Body:**
```json
{
  "type_axel_name_en": "Standard Type",
  "type_axel_name_cn": "标准类型",
  "type_axel_description": "Description of the type axel"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type_axel_id": "uuid",
    "type_axel_name_en": "Standard Type",
    "type_axel_name_cn": "标准类型",
    "type_axel_description": "Description of the type axel",
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Type axel berhasil dibuat"
}
```

### 4. Update Type Axel
```
PUT /api/catalogs/type_axel/:id
```

**Request Body:**
```json
{
  "type_axel_name_en": "Updated Type",
  "type_axel_name_cn": "更新类型",
  "type_axel_description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type_axel_id": "uuid",
    "type_axel_name_en": "Updated Type",
    "type_axel_name_cn": "更新类型",
    "type_axel_description": "Updated description",
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Type axel berhasil diupdate"
}
```

### 5. Delete Type Axel (Soft Delete)
```
DELETE /api/catalogs/type_axel/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Type axel berhasil dihapus"
}
```

### 6. Restore Type Axel
```
POST /api/catalogs/type_axel/:id/restore
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type_axel_id": "uuid",
    "type_axel_name_en": "string",
    "type_axel_name_cn": "string",
    "type_axel_description": "string",
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Type axel berhasil direstore"
}
```

## Authentication

Semua endpoint memerlukan authentication token (Bearer Token) dalam header:
```
Authorization: Bearer <your_token_here>
```

## Field Descriptions

- `type_axel_id`: UUID unik untuk setiap type axel
- `type_axel_name_en`: Nama type axel dalam bahasa Inggris (opsional)
- `type_axel_name_cn`: Nama type axel dalam bahasa China (opsional)
- `type_axel_description`: Deskripsi type axel (opsional)
- `created_at`: Timestamp pembuatan record
- `created_by`: UUID user yang membuat record (diambil dari token)
- `updated_at`: Timestamp update terakhir
- `updated_by`: UUID user yang mengupdate record (diambil dari token)
- `deleted_at`: Timestamp penghapusan (null jika belum dihapus)
- `deleted_by`: UUID user yang menghapus record
- `is_delete`: Boolean flag penghapusan

## Validation Rules

### Create & Update:
- `type_axel_name_en`: Opsional, maksimal 255 karakter
- `type_axel_name_cn`: Opsional, maksimal 255 karakter
- `type_axel_description`: Opsional, maksimal 1000 karakter

### List (GET with filters):
- `page`: Integer positif (min: 1)
- `limit`: Integer antara 1-100
- `search`: String maksimal 255 karakter
- `sort_by`: Salah satu dari: created_at, updated_at, type_axel_name_en, type_axel_name_cn
- `sort_order`: Salah satu dari: asc, desc

### Get by ID / Delete / Restore:
- `id`: Wajib, harus format UUID yang valid

