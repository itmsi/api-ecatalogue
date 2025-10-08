# Type Engine Module

Module untuk mengelola data type engine dengan fitur CRUD lengkap.

## Endpoints

### 1. Get All Type Engines
- **Method**: POST
- **URL**: `/api/catalogs/type_engine/get`
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

### 2. Get Type Engine by ID
- **Method**: GET
- **URL**: `/api/catalogs/type_engine/:id`
- **Auth**: Required (verifyToken)

### 3. Create Type Engine
- **Method**: POST
- **URL**: `/api/catalogs/type_engine/create`
- **Auth**: Required (verifyToken)
- **Body**:
```json
{
    "type_engine_name_en": "Engine Type Name EN",
    "type_engine_name_cn": "Engine Type Name CN",
    "type_engine_description": "Description"
}
```

### 4. Update Type Engine
- **Method**: PUT
- **URL**: `/api/catalogs/type_engine/:id`
- **Auth**: Required (verifyToken)
- **Body**: Same as create (all fields optional)

### 5. Delete Type Engine
- **Method**: DELETE
- **URL**: `/api/catalogs/type_engine/:id`
- **Auth**: Required (verifyToken)

### 6. Restore Type Engine
- **Method**: POST
- **URL**: `/api/catalogs/type_engine/:id/restore`
- **Auth**: Required (verifyToken)

## Database Schema

Table: `type_engines`

| Column | Type | Description |
|--------|------|-------------|
| type_engine_id | UUID | Primary Key |
| type_engine_name_en | VARCHAR(255) | Name in English (nullable) |
| type_engine_name_cn | VARCHAR(255) | Name in Chinese (nullable) |
| type_engine_description | TEXT | Description (nullable) |
| created_at | TIMESTAMP | Created timestamp |
| created_by | UUID | Created by user ID |
| updated_at | TIMESTAMP | Updated timestamp |
| updated_by | UUID | Updated by user ID |
| deleted_at | TIMESTAMP | Deleted timestamp (nullable) |
| deleted_by | UUID | Deleted by user ID (nullable) |
| is_delete | BOOLEAN | Soft delete flag |

## Features

- ✅ CRUD Operations
- ✅ Soft Delete
- ✅ Search functionality
- ✅ Pagination
- ✅ Sorting
- ✅ Authentication required
- ✅ Input validation
- ✅ Audit trail (created_by, updated_by, deleted_by)
