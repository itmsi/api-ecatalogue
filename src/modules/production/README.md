# Production Module

Module untuk mengelola data produksi kendaraan dengan fitur CRUD lengkap.

## Endpoint

### GET Production List
- **URL**: `POST /api/catalogs/productions/get`
- **Method**: POST
- **Authentication**: Required (Bearer Token)
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

### Create Production
- **URL**: `POST /api/catalogs/productions/create`
- **Method**: POST
- **Authentication**: Required (Bearer Token)
- **Body**:
```json
{
    "vin_number": "VIN1234567890ABCDEF",
    "production_name_en": "Toyota Camry 2024",
    "production_name_cn": "丰田凯美瑞 2024",
    "production_sequence_number": 1001,
    "production_month": "March",
    "production_year": "2024",
    "production_description": "High-quality production with premium materials",
    "location_id": "123e4567-e89b-12d3-a456-426614174001",
    "brand_id": "123e4567-e89b-12d3-a456-426614174002",
    "driver_type_id": "123e4567-e89b-12d3-a456-426614174003",
    "vehicle_weight_id": "123e4567-e89b-12d3-a456-426614174004",
    "world_manufacturing_plant_id": "123e4567-e89b-12d3-a456-426614174005"
}
```

### Get Production by ID
- **URL**: `GET /api/catalogs/productions/:id`
- **Method**: GET
- **Authentication**: Required (Bearer Token)

### Update Production
- **URL**: `PUT /api/catalogs/productions/:id`
- **Method**: PUT
- **Authentication**: Required (Bearer Token)
- **Body**: Same as create production (all fields optional)

### Delete Production
- **URL**: `DELETE /api/catalogs/productions/:id`
- **Method**: DELETE
- **Authentication**: Required (Bearer Token)

## Database Schema

### Table: productions

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| production_id | uuid | No | Primary key |
| vin_number | varchar(255) | Yes | Vehicle Identification Number |
| production_name_en | varchar(255) | Yes | Production name in English |
| production_name_cn | varchar(255) | Yes | Production name in Chinese |
| production_sequence_number | integer | Yes | Production sequence number |
| production_month | varchar(50) | Yes | Production month |
| production_year | varchar(50) | Yes | Production year |
| production_description | text | Yes | Production description |
| location_id | uuid | Yes | Location reference |
| brand_id | uuid | Yes | Brand reference |
| driver_type_id | uuid | Yes | Driver type reference |
| vehicle_weight_id | uuid | Yes | Vehicle weight reference |
| world_manufacturing_plant_id | uuid | Yes | World manufacturing plant reference |
| created_at | timestamp | No | Creation timestamp |
| created_by | uuid | Yes | Creator user/employee ID |
| updated_at | timestamp | No | Last update timestamp |
| updated_by | uuid | Yes | Last updater user/employee ID |
| deleted_at | timestamp | Yes | Deletion timestamp |
| deleted_by | uuid | Yes | Deleter user/employee ID |
| is_delete | boolean | No | Soft deletion flag |

## Features

- CRUD operations dengan soft delete
- Pagination dengan search dan sorting
- Auto-set audit fields (created_by, updated_by, deleted_by) dari token JWT
- Validation lengkap untuk semua field
- Swagger documentation
- Error handling yang konsisten

## Authentication

Semua endpoint memerlukan authentication dengan Bearer Token. Token harus mengandung:
- `employee_id` atau `user_id` untuk auto-set audit fields
- `roles` untuk akses control
