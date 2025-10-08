# Type Cabine Module

Module untuk mengelola data type cabine dengan operasi CRUD lengkap.

## Endpoints

### 1. Get All Type Cabines
- **Method**: POST
- **URL**: `/api/catalogs/type_cabine/get`
- **Auth**: Required (verifyToken)
- **Body**:
```json
{
    "page": 1,
    "limit": 10,
    "search": "",
    "sort_by": "created_at",
    "sort_order": "desc"
}
```

### 2. Get Type Cabine by ID
- **Method**: GET
- **URL**: `/api/catalogs/type_cabine/:id`
- **Auth**: Required (verifyToken)

### 3. Create Type Cabine
- **Method**: POST
- **URL**: `/api/catalogs/type_cabine/create`
- **Auth**: Required (verifyToken)
- **Body**:
```json
{
    "type_cabine_name_en": "Standard Cab",
    "type_cabine_name_cn": "标准驾驶室",
    "type_cabine_description": "Standard cab type for trucks"
}
```

### 4. Update Type Cabine
- **Method**: PUT
- **URL**: `/api/catalogs/type_cabine/:id`
- **Auth**: Required (verifyToken)
- **Body**:
```json
{
    "type_cabine_name_en": "Extended Cab",
    "type_cabine_name_cn": "扩展驾驶室",
    "type_cabine_description": "Extended cab type for trucks"
}
```

### 5. Delete Type Cabine
- **Method**: DELETE
- **URL**: `/api/catalogs/type_cabine/:id`
- **Auth**: Required (verifyToken)

### 6. Restore Type Cabine
- **Method**: POST
- **URL**: `/api/catalogs/type_cabine/:id/restore`
- **Auth**: Required (verifyToken)

## Database Schema

Tabel: `type_cabines`

| Column | Type | Description |
|--------|------|-------------|
| type_cabine_id | UUID | Primary key |
| type_cabine_name_en | VARCHAR(255) | Name in English (nullable) |
| type_cabine_name_cn | VARCHAR(255) | Name in Chinese (nullable) |
| type_cabine_description | TEXT | Description (nullable) |
| created_at | TIMESTAMP | Created timestamp |
| created_by | UUID | Created by user ID |
| updated_at | TIMESTAMP | Updated timestamp |
| updated_by | UUID | Updated by user ID |
| deleted_at | TIMESTAMP | Deleted timestamp (nullable) |
| deleted_by | UUID | Deleted by user ID (nullable) |
| is_delete | BOOLEAN | Delete flag |

## Features

- ✅ CRUD operations
- ✅ Soft delete with restore functionality
- ✅ Pagination and search
- ✅ Sorting capabilities
- ✅ Multi-language support (EN/CN)
- ✅ Audit trail (created_by, updated_by, deleted_by)
- ✅ Token-based authentication
- ✅ Input validation
- ✅ Error handling
