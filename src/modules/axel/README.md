# Axel Module

Module untuk mengelola data axel dengan relasi many-to-many ke type_axels dalam sistem catalog.

## Endpoints

### 1. Get All Axels (dengan pagination dan filter)
```
POST /api/catalogs/axel/get
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
        "axel_id": "uuid",
        "axel_name_en": "Standard Axel",
        "axel_name_cn": "标准轴",
        "axel_description": "Standard axel type",
        "type_axels": [
          {
            "type_axel_id": "uuid",
            "type_axel_name_en": "Front Axel",
            "type_axel_name_cn": "前轴",
            "type_axel_description": "Front axel type"
          }
        ],
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

### 2. Get Axel by ID
```
GET /api/catalogs/axel/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "axel_id": "uuid",
    "axel_name_en": "Standard Axel",
    "axel_name_cn": "标准轴",
    "axel_description": "Standard axel type",
    "type_axels": [
      {
        "type_axel_id": "uuid",
        "type_axel_name_en": "Front Axel",
        "type_axel_name_cn": "前轴",
        "type_axel_description": "Front axel type"
      }
    ],
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

### 3. Create Axel (dengan Type Axels)
```
POST /api/catalogs/axel/create
```

**Request Body:**
```json
{
  "axel_name_en": "Standard Axel",
  "axel_name_cn": "标准轴",
  "axel_description": "Standard axel type for trucks",
  "type_axels": [
    {
      "type_axel_name_en": "Front Axel",
      "type_axel_name_cn": "前轴"
    },
    {
      "type_axel_name_en": "Rear Axel",
      "type_axel_name_cn": "后轴"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "axel_id": "uuid",
    "axel_name_en": "Standard Axel",
    "axel_name_cn": "标准轴",
    "axel_description": "Standard axel type for trucks",
    "type_axels": [
      {
        "type_axel_id": "uuid",
        "type_axel_name_en": "Front Axel",
        "type_axel_name_cn": "前轴",
        "type_axel_description": null
      },
      {
        "type_axel_id": "uuid",
        "type_axel_name_en": "Rear Axel",
        "type_axel_name_cn": "后轴",
        "type_axel_description": null
      }
    ],
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Data berhasil dibuat"
}
```

### 4. Update Axel (dengan Type Axels)
```
PUT /api/catalogs/axel/:id
```

**Request Body:**
```json
{
  "axel_name_en": "Updated Axel",
  "axel_name_cn": "更新轴",
  "axel_description": "Updated description",
  "type_axels": [
    {
      "type_axel_name_en": "New Type",
      "type_axel_name_cn": "新型号"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "axel_id": "uuid",
    "axel_name_en": "Updated Axel",
    "axel_name_cn": "更新轴",
    "axel_description": "Updated description",
    "type_axels": [
      {
        "type_axel_id": "uuid",
        "type_axel_name_en": "New Type",
        "type_axel_name_cn": "新型号",
        "type_axel_description": null
      }
    ],
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Data berhasil diupdate"
}
```

### 5. Delete Axel (Soft Delete)
```
DELETE /api/catalogs/axel/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Data berhasil dihapus"
}
```

### 6. Restore Axel
```
POST /api/catalogs/axel/:id/restore
```

**Response:**
```json
{
  "success": true,
  "data": {
    "axel_id": "uuid",
    "axel_name_en": "string",
    "axel_name_cn": "string",
    "axel_description": "string",
    "created_at": "timestamp",
    "created_by": "uuid",
    "updated_at": "timestamp",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "message": "Data berhasil direstore"
}
```

## Authentication

Semua endpoint memerlukan authentication token (Bearer Token) dalam header:
```
Authorization: Bearer <your_token_here>
```

## Field Descriptions

### Axel Fields:
- `axel_id`: UUID unik untuk setiap axel
- `axel_name_en`: Nama axel dalam bahasa Inggris (opsional)
- `axel_name_cn`: Nama axel dalam bahasa China (opsional)
- `axel_description`: Deskripsi axel (opsional)
- `type_axels`: Array of type axel objects (relasi many-to-many)

### Type Axel Fields (dalam array):
- `type_axel_id`: UUID unik untuk type axel
- `type_axel_name_en`: Nama type axel dalam bahasa Inggris (opsional)
- `type_axel_name_cn`: Nama type axel dalam bahasa China (opsional)
- `type_axel_description`: Deskripsi type axel (opsional)

## Validation Rules

### Create & Update:
- `axel_name_en`: Opsional, maksimal 255 karakter
- `axel_name_cn`: Opsional, maksimal 255 karakter
- `axel_description`: Opsional, string
- `type_axels`: Opsional, harus berupa array
- `type_axels.*.type_axel_name_en`: Opsional, string
- `type_axels.*.type_axel_name_cn`: Opsional, string
- `type_axels.*.type_axel_description`: Opsional, string

### List (GET with filters):
- `page`: Integer positif (min: 1)
- `limit`: Integer antara 1-100
- `search`: String (search di name_en, name_cn, description)
- `sort_by`: Salah satu dari: created_at, axel_name_en, axel_name_cn, updated_at
- `sort_order`: Salah satu dari: asc, desc

### Get by ID / Delete / Restore:
- `id`: Wajib, harus format UUID yang valid

## Proses Create/Update Type Axels

Saat membuat atau mengupdate axel:
1. Data axel utama akan disimpan ke tabel `axels`
2. Setiap item dalam array `type_axels` akan disimpan sebagai record baru di tabel `type_axels`
3. Relasi antara axel dan type_axels akan disimpan di tabel junction `axels_type_axels`
4. Pada update, semua relasi lama akan dihapus dan diganti dengan relasi baru

## Database Tables

### axels
- Menyimpan data axel utama

### type_axels  
- Menyimpan data type axel

### axels_type_axels (Junction Table)
- Menyimpan relasi many-to-many antara axels dan type_axels
- Foreign key ke axels.axel_id
- Foreign key ke type_axels.type_axel_id
- Unique constraint pada kombinasi axel_id dan type_axel_id

