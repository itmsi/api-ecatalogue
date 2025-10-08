# Engines Module

Module untuk mengelola data engines dengan relasi ke type_engines dan fitur CRUD lengkap.

## Endpoints

### 1. Get All Engines
- **Method**: POST
- **URL**: `/api/catalogs/engines/get`
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

### 2. Get Engine by ID
- **Method**: GET
- **URL**: `/api/catalogs/engines/:id`
- **Auth**: Required (verifyToken)
- **Response**: Engine dengan relasi type_engines

### 3. Create Engine
- **Method**: POST
- **URL**: `/api/catalogs/engines/create`
- **Auth**: Required (verifyToken)
- **Body**:
```json
{
    "engines_name_en": "Standard Engine",
    "engines_name_cn": "标准发动机",
    "engines_description": "Standard engine type",
    "type_engines": [
        {
            "type_engine_name_en": "Diesel Engine",
            "type_engine_name_cn": "柴油发动机",
            "type_engine_description": "Diesel engine type"
        },
        {
            "type_engine_name_en": "Gasoline Engine",
            "type_engine_name_cn": "汽油发动机",
            "type_engine_description": "Gasoline engine type"
        }
    ]
}
```

### 4. Update Engine
- **Method**: PUT
- **URL**: `/api/catalogs/engines/:id`
- **Auth**: Required (verifyToken)
- **Body**: Same as create (all fields optional)

### 5. Delete Engine
- **Method**: DELETE
- **URL**: `/api/catalogs/engines/:id`
- **Auth**: Required (verifyToken)

### 6. Restore Engine
- **Method**: POST
- **URL**: `/api/catalogs/engines/:id/restore`
- **Auth**: Required (verifyToken)

## Database Schema

### Table: `engines`

| Column | Type | Description |
|--------|------|-------------|
| engines_id | UUID | Primary Key |
| engines_name_en | VARCHAR(255) | Name in English (nullable) |
| engines_name_cn | VARCHAR(255) | Name in Chinese (nullable) |
| engines_description | TEXT | Description (nullable) |
| created_at | TIMESTAMP | Created timestamp |
| created_by | UUID | Created by user ID |
| updated_at | TIMESTAMP | Updated timestamp |
| updated_by | UUID | Updated by user ID |
| deleted_at | TIMESTAMP | Deleted timestamp (nullable) |
| deleted_by | UUID | Deleted by user ID (nullable) |
| is_delete | BOOLEAN | Soft delete flag |

### Table: `engines_type_engines` (Relation Table)

| Column | Type | Description |
|--------|------|-------------|
| engines_type_engines_id | UUID | Primary Key |
| engines_id | UUID | Foreign Key to engines |
| type_engine_id | UUID | Foreign Key to type_engines |
| created_at | TIMESTAMP | Created timestamp |
| created_by | UUID | Created by user ID |
| updated_at | TIMESTAMP | Updated timestamp |
| updated_by | UUID | Updated by user ID |
| deleted_at | TIMESTAMP | Deleted timestamp (nullable) |
| deleted_by | UUID | Deleted by user ID (nullable) |
| is_delete | BOOLEAN | Soft delete flag |

## Features

- ✅ CRUD Operations
- ✅ Relasi dengan type_engines
- ✅ Auto-create type_engines jika belum ada
- ✅ Soft Delete dengan cascade
- ✅ Search functionality
- ✅ Pagination
- ✅ Sorting
- ✅ Authentication required
- ✅ Input validation
- ✅ Audit trail (created_by, updated_by, deleted_by)
- ✅ Transaction support untuk data consistency

## Response Format

### Get Engine by ID Response:
```json
{
    "success": true,
    "message": "Success",
    "data": {
        "engines_id": "123e4567-e89b-12d3-a456-426614174000",
        "engines_name_en": "Standard Engine",
        "engines_name_cn": "标准发动机",
        "engines_description": "Standard engine type",
        "type_engines": [
            {
                "type_engine_id": "123e4567-e89b-12d3-a456-426614174001",
                "type_engine_name_en": "Diesel Engine",
                "type_engine_name_cn": "柴油发动机",
                "type_engine_description": "Diesel engine type"
            }
        ],
        "created_at": "2025-01-17T10:00:00.000Z",
        "created_by": "123e4567-e89b-12d3-a456-426614174002",
        "updated_at": "2025-01-17T10:00:00.000Z",
        "updated_by": "123e4567-e89b-12d3-a456-426614174002",
        "deleted_at": null,
        "deleted_by": null,
        "is_delete": false
    }
}
```
