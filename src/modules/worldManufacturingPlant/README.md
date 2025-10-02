# World Manufacturing Plant Module

Module untuk mengelola data World Manufacturing Plant dengan full CRUD operations.

## Endpoints

### 1. Get All World Manufacturing Plants (with filters)
- **Method**: POST
- **URL**: `/api/catalogs/world_manufacturing_plants/get`
- **Auth**: Required (Bearer Token)
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

### 2. Get Single World Manufacturing Plant
- **Method**: GET
- **URL**: `/api/catalogs/world_manufacturing_plants/:id`
- **Auth**: Required (Bearer Token)

### 3. Create New World Manufacturing Plant
- **Method**: POST
- **URL**: `/api/catalogs/world_manufacturing_plants/create`
- **Auth**: Required (Bearer Token)
- **Body**:
```json
{
    "world_manufacturing_plant_code": "string (max 255 chars, nullable)",
    "world_manufacturing_plant_name": "string (max 255 chars, nullable)",
    "world_manufacturing_plant_description": "string (max 2000 chars, nullable)"
}
```

### 4. Update World Manufacturing Plant
- **Method**: PUT
- **URL**: `/api/catalogs/world_manufacturing_plants/:id`
- **Auth**: Required (Bearer Token)

### 5. Soft Delete World Manufacturing Plant
- **Method**: DELETE
- **URL**: `/api/catalogs/world_manufacturing_plants/:id`
- **Auth**: Required (Bearer Token)

### 6. Restore Soft Deleted World Manufacturing Plant
- **Method**: POST
- **URL**: `/api/catalogs/world_manufacturing_plants/:id/restore`
- **Auth**: Required (Bearer Token)

## Database Schema

```sql
CREATE TABLE world_manufacturing_plants (
    world_manufacturing_plant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    world_manufacturing_plant_code VARCHAR(255) NULL,
    world_manufacturing_plant_name VARCHAR(255) NULL,
    world_manufacturing_plant_description TEXT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID NULL,
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by UUID NULL,
    deleted_at TIMESTAMP NULL,
    deleted_by UUID NULL,
    is_delete BOOLEAN DEFAULT FALSE
);
```

## Features

- ✅ Full CRUD operations
- ✅ Soft delete dengan restore functionality  
- ✅ Search di semua fields utama
- ✅ Sorting dengan multiple field options
- ✅ Pagination
- ✅ Authentication & authorization
- ✅ Input validation
- ✅ Auto-filled audit fields (created_by, updated_by, deleted_by)
- ✅ Swagger documentation

## Authentication

All endpoints require Bearer token authentication. Token berisi `employee_id` atau `user_id` yang akan otomatis tersimpan di field audit:
- `created_by` - diisi saat create
- `updated_by` - diisi saat update
- `deleted_by` - diisi saat soft delete
