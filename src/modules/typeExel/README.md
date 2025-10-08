# Type Exel Module

Module untuk mengelola data type exel dalam sistem catalog.

## Endpoints

### 1. Get All Type Exels (dengan pagination dan filter)
```
POST /api/catalogs/type_exel/get
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
        "type_exel_id": "uuid",
        "type_exel_name_en": "string",
        "type_exel_name_cn": "string",
        "type_exel_description": "string",
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

### 2. Get Type Exel by ID
```
GET /api/catalogs/type_exel/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type_exel_id": "uuid",
    "type_exel_name_en": "string",
    "type_exel_name_cn": "string",
    "type_exel_description": "string",
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

### 3. Create Type Exel
```
POST /api/catalogs/type_exel/create
```

**Request Body:**
```json
{
  "type_exel_name_en": "Standard Type",
  "type_exel_name_cn": "标准类型",
  "type_exel_description": "Description of the type exel"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type_exel_id": "uuid",
    "type_exel_name_en": "Standard Type",
    "type_exel_name_cn": "标准类型",
    "type_exel_description": "Description of the type exel",
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Type exel berhasil dibuat"
}
```

### 4. Update Type Exel
```
PUT /api/catalogs/type_exel/:id
```

**Request Body:**
```json
{
  "type_exel_name_en": "Updated Type",
  "type_exel_name_cn": "更新类型",
  "type_exel_description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type_exel_id": "uuid",
    "type_exel_name_en": "Updated Type",
    "type_exel_name_cn": "更新类型",
    "type_exel_description": "Updated description",
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Type exel berhasil diupdate"
}
```

### 5. Delete Type Exel (Soft Delete)
```
DELETE /api/catalogs/type_exel/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Type exel berhasil dihapus"
}
```

### 6. Restore Type Exel
```
POST /api/catalogs/type_exel/:id/restore
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type_exel_id": "uuid",
    "type_exel_name_en": "string",
    "type_exel_name_cn": "string",
    "type_exel_description": "string",
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Type exel berhasil direstore"
}
```

## Authentication

Semua endpoint memerlukan authentication token (Bearer Token) dalam header:
```
Authorization: Bearer <your_token_here>
```

## Field Descriptions

- `type_exel_id`: UUID unik untuk setiap type exel
- `type_exel_name_en`: Nama type exel dalam bahasa Inggris (opsional)
- `type_exel_name_cn`: Nama type exel dalam bahasa China (opsional)
- `type_exel_description`: Deskripsi type exel (opsional)
- `created_at`: Timestamp pembuatan record
- `created_by`: UUID user yang membuat record (diambil dari token)
- `updated_at`: Timestamp update terakhir
- `updated_by`: UUID user yang mengupdate record (diambil dari token)
- `deleted_at`: Timestamp penghapusan (null jika belum dihapus)
- `deleted_by`: UUID user yang menghapus record
- `is_delete`: Boolean flag penghapusan

## Validation Rules

### Create & Update:
- `type_exel_name_en`: Opsional, maksimal 255 karakter
- `type_exel_name_cn`: Opsional, maksimal 255 karakter
- `type_exel_description`: Opsional, maksimal 1000 karakter

### List (GET with filters):
- `page`: Integer positif (min: 1)
- `limit`: Integer antara 1-100
- `search`: String maksimal 255 karakter
- `sort_by`: Salah satu dari: created_at, updated_at, type_exel_name_en, type_exel_name_cn
- `sort_order`: Salah satu dari: asc, desc

### Get by ID / Delete / Restore:
- `id`: Wajib, harus format UUID yang valid

