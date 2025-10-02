# Driver Types Module

Module untuk mengelola data tipe driver dengan fitur CRUD lengkap.

## Endpoints

### 1. Get All Driver Types
- **Method**: POST
- **URL**: `/api/catalogs/driver_types/get`
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

### 2. Get Driver Type by ID
- **Method**: GET
- **URL**: `/api/catalogs/driver_types/:id`
- **Auth**: Required (Bearer Token)

### 3. Create Driver Type
- **Method**: POST
- **URL**: `/api/catalogs/driver_types/create`
- **Auth**: Required (Bearer Token)
- **Body**:
```json
{
  "driver_type_name": "Driver Type Name",
  "driver_type_code": "DRV_CODE",
  "driver_type_description": "Description"
}
```

### 4. Update Driver Type
- **Method**: PUT
- **URL**: `/api/catalogs/driver_types/:id`
- **Auth**: Required (Bearer Token)
- **Body**:
```json
{
  "driver_type_name": "Updated Name",
  "driver_type_code": "UPDATED_CODE",
  "driver_type_description": "Updated Description"
}
```

### 5. Delete Driver Type
- **Method**: DELETE
- **URL**: `/api/catalogs/driver_types/:id`
- **Auth**: Required (Bearer Token)

### 6. Restore Driver Type
- **Method**: POST
- **URL**: `/api/catalogs/driver_types/:id/restore`
- **Auth**: Required (Bearer Token)

## Database Schema

### Table: driver_types
- `driver_type_id` (UUID, Primary Key)
- `driver_type_name` (VARCHAR(255), Nullable)
- `driver_type_code` (VARCHAR(255), Nullable)
- `driver_type_description` (TEXT, Nullable)
- `created_at` (TIMESTAMP)
- `created_by` (VARCHAR(255), Nullable)
- `updated_at` (TIMESTAMP)
- `updated_by` (VARCHAR(255), Nullable)
- `deleted_at` (TIMESTAMP, Nullable)
- `deleted_by` (VARCHAR(255), Nullable)
- `is_delete` (BOOLEAN, Default: false)

## Features
- CRUD operations
- Soft delete functionality
- Pagination and search
- Sorting capabilities
- Token-based authentication
- Input validation
- Audit trail (created_by, updated_by, deleted_by)
