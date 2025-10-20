# Production Module

Module untuk mengelola data produksi kendaraan beserta detail komponennya.

## 📁 Struktur File

```
src/modules/production/
├── handler.js              # Request handlers / Controllers
├── postgre_repository.js   # Database operations
├── validation.js           # Input validation rules
├── index.js               # Route definitions
└── README.md              # Dokumentasi module (ini)
```

## 🎯 Fitur

Module ini menyediakan:
- ✅ CRUD operations untuk production data
- ✅ Support multiple production details (engine, steering, cabine, axle, transmission)
- ✅ Transaction-based operations untuk data consistency
- ✅ Soft delete dengan cascade ke production details
- ✅ Pagination dan search functionality
- ✅ Input validation dengan express-validator
- ✅ Auto-populate user data dari token (created_by, updated_by, deleted_by)
- ✅ Error handling yang konsisten
- ✅ Response format yang standar

## 📊 Database Schema

### Tabel `productions`

| Column | Type | Description |
|--------|------|-------------|
| production_id | UUID | Primary key (auto-generated) |
| vin_number | VARCHAR(255) | VIN number kendaraan (nullable) |
| production_name_en | VARCHAR(255) | Nama produksi (English) (nullable) |
| production_name_cn | VARCHAR(255) | Nama produksi (Chinese) (nullable) |
| production_sequence_number | VARCHAR(50) | Nomor urut produksi (nullable) |
| production_month | VARCHAR(50) | Bulan produksi (nullable) |
| production_year | VARCHAR(50) | Tahun produksi (nullable) |
| production_description | TEXT | Deskripsi produksi (nullable) |
| production_location_id | UUID | Foreign key ke locations (nullable) |
| production_brand_id | UUID | Foreign key ke brands (nullable) |
| production_driver_type_id | UUID | Foreign key ke driver_types (nullable) |
| production_vehicle_weight_id | UUID | Foreign key ke vehicle_weights (nullable) |
| production_world_manufacturing_plant_id | UUID | Foreign key ke world_manufacturing_plants (nullable) |
| created_at | TIMESTAMP | Waktu pembuatan |
| created_by | UUID | User yang membuat |
| updated_at | TIMESTAMP | Waktu update terakhir |
| updated_by | UUID | User yang mengupdate |
| deleted_at | TIMESTAMP | Waktu soft delete (nullable) |
| deleted_by | UUID | User yang menghapus |
| is_delete | BOOLEAN | Flag soft delete |

### Tabel `productions_detail`

| Column | Type | Description |
|--------|------|-------------|
| production_detail_id | UUID | Primary key (auto-generated) |
| production_id | UUID | Foreign key ke productions (nullable) |
| master_pdf_id | UUID | Foreign key ke master_pdf (nullable) |
| created_at | TIMESTAMP | Waktu pembuatan |
| created_by | UUID | User yang membuat |
| updated_at | TIMESTAMP | Waktu update terakhir |
| updated_by | UUID | User yang mengupdate |
| deleted_at | TIMESTAMP | Waktu soft delete (nullable) |
| deleted_by | UUID | User yang menghapus |
| is_delete | BOOLEAN | Flag soft delete |

## 🔌 API Endpoints

### 1. Get All Productions (with pagination & search)
```http
POST /api/catalogs/productions/get
Authorization: Bearer {token}
Content-Type: application/json

{
    "page": 1,
    "limit": 10,
    "search": "",
    "sort_by": "created_at",
    "sort_order": "desc"
}
```

**Request Body:**
- `page` (optional): Halaman yang ingin ditampilkan (default: 1)
- `limit` (optional): Jumlah item per halaman (default: 10, max: 100)
- `search` (optional): Keyword pencarian (max: 255 characters)
- `sort_by` (optional): Kolom untuk sorting (default: created_at)
- `sort_order` (optional): Urutan sorting: asc/desc (default: desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "production_id": "uuid",
        "vin_number": "VIN12345678",
        "production_name_en": "Production Name EN",
        "production_name_cn": "Production Name CN",
        "production_sequence_number": "001",
        "production_month": "January",
        "production_year": "2025",
        "production_description": "Description",
        "production_location_id": "uuid",
        "production_brand_id": "uuid",
        "production_driver_type_id": "uuid",
        "production_vehicle_weight_id": "uuid",
        "production_world_manufacturing_plant_id": "uuid",
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
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### 2. Get Production by ID
```http
GET /api/catalogs/productions/:id
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "production_id": "uuid",
    "vin_number": "VIN12345678",
    "production_name_en": "Production Name EN",
    "production_name_cn": "Production Name CN",
    "production_sequence_number": "001",
    "production_month": "January",
    "production_year": "2025",
    "production_description": "Description",
    "production_location_id": "uuid",
    "production_brand_id": "uuid",
    "production_driver_type_id": "uuid",
    "production_vehicle_weight_id": "uuid",
    "production_world_manufacturing_plant_id": "uuid",
    "created_at": "2025-01-01T00:00:00.000Z",
    "created_by": "uuid",
    "updated_at": "2025-01-01T00:00:00.000Z",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false,
    "details": [
      {
        "production_detail_id": "uuid",
        "production_id": "uuid",
        "production_detail_description": "Detail description",
        "engine_id": "uuid",
        "steering_id": "uuid",
        "cabine_id": "uuid",
        "axle_id": "uuid",
        "transmission_id": "uuid",
        "created_at": "2025-01-01T00:00:00.000Z",
        "created_by": "uuid",
        "updated_at": "2025-01-01T00:00:00.000Z",
        "updated_by": "uuid",
        "deleted_at": null,
        "deleted_by": null,
        "is_delete": false
      }
    ]
  }
}
```

### 3. Create Production with Details
```http
POST /api/catalogs/productions/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "vin_number": "VIN12345678",
  "production_name_en": "Production Name EN",
  "production_name_cn": "Production Name CN",
  "production_sequence_number": "001",
  "production_month": "January",
  "production_year": "2025",
  "production_description": "Production description",
  "production_location_id": "uuid",
  "production_brand_id": "uuid",
  "production_driver_type_id": "uuid",
  "production_vehicle_weight_id": "uuid",
  "production_world_manufacturing_plant_id": "uuid",
  "data_details": [
    {
      "master_pdf_id": "uuid"
    },
    {
      "master_pdf_id": "uuid"
    }
  ]
}
```

**Notes:**
- Semua field adalah optional (nullable)
- `data_details` adalah array, bisa kosong atau berisi multiple details
- `created_by` dan `updated_by` akan otomatis diisi dari token (employee_id atau user_id)
- Menggunakan transaction untuk memastikan data production dan details tersimpan secara konsisten

**Response:**
```json
{
  "success": true,
  "data": {
    "production_id": "uuid",
    "vin_number": "VIN12345678",
    "production_name_en": "Production Name EN",
    "production_name_cn": "Production Name CN",
    "production_sequence_number": "001",
    "production_month": "January",
    "production_year": "2025",
    "production_description": "Production description",
    "production_location_id": "uuid",
    "production_brand_id": "uuid",
    "production_driver_type_id": "uuid",
    "production_vehicle_weight_id": "uuid",
    "production_world_manufacturing_plant_id": "uuid",
    "created_at": "2025-01-01T00:00:00.000Z",
    "created_by": "uuid",
    "updated_at": "2025-01-01T00:00:00.000Z",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false,
    "details": [
      {
        "production_detail_id": "uuid",
        "production_id": "uuid",
        "production_detail_description": "Detail 1",
        "engine_id": "uuid",
        "steering_id": "uuid",
        "cabine_id": "uuid",
        "axle_id": "uuid",
        "transmission_id": "uuid",
        "created_at": "2025-01-01T00:00:00.000Z",
        "created_by": "uuid",
        "updated_at": "2025-01-01T00:00:00.000Z",
        "updated_by": "uuid",
        "deleted_at": null,
        "deleted_by": null,
        "is_delete": false
      }
    ]
  },
  "message": "Production berhasil dibuat"
}
```

### 4. Update Production
```http
PUT /api/catalogs/productions/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "vin_number": "VIN12345678_UPDATED",
  "production_name_en": "Updated Production Name EN",
  "production_name_cn": "Updated Production Name CN",
  "production_sequence_number": "002",
  "production_month": "February",
  "production_year": "2025",
  "production_description": "Updated description",
  "production_location_id": "uuid",
  "production_brand_id": "uuid",
  "production_driver_type_id": "uuid",
  "production_vehicle_weight_id": "uuid",
  "production_world_manufacturing_plant_id": "uuid",
  "data_details": [
    {
      "master_pdf_id": "uuid"
    }
  ]
}
```

**Notes:**
- Semua field adalah optional
- Jika `data_details` disertakan, detail yang lama akan di-soft delete dan diganti dengan yang baru
- Jika `data_details` tidak disertakan, detail yang lama tidak akan berubah
- `updated_by` akan otomatis diisi dari token

**Response:**
```json
{
  "success": true,
  "data": {
    "production_id": "uuid",
    "vin_number": "VIN12345678_UPDATED",
    "production_name_en": "Updated Production Name EN",
    "production_name_cn": "Updated Production Name CN",
    "production_sequence_number": "002",
    "production_month": "February",
    "production_year": "2025",
    "production_description": "Updated description",
    "production_location_id": "uuid",
    "production_brand_id": "uuid",
    "production_driver_type_id": "uuid",
    "production_vehicle_weight_id": "uuid",
    "production_world_manufacturing_plant_id": "uuid",
    "created_at": "2025-01-01T00:00:00.000Z",
    "created_by": "uuid",
    "updated_at": "2025-01-02T00:00:00.000Z",
    "updated_by": "uuid",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false,
    "details": [
      {
        "production_detail_id": "uuid",
        "production_id": "uuid",
        "production_detail_description": "Updated Detail 1",
        "engine_id": "uuid",
        "steering_id": "uuid",
        "cabine_id": "uuid",
        "axle_id": "uuid",
        "transmission_id": "uuid",
        "created_at": "2025-01-02T00:00:00.000Z",
        "created_by": "uuid",
        "updated_at": "2025-01-02T00:00:00.000Z",
        "updated_by": "uuid",
        "deleted_at": null,
        "deleted_by": null,
        "is_delete": false
      }
    ]
  },
  "message": "Production berhasil diupdate"
}
```

### 5. Delete Production (Soft Delete)
```http
DELETE /api/catalogs/productions/:id
Authorization: Bearer {token}
```

**Notes:**
- Soft delete production akan cascade ke semua production details
- `deleted_by` akan otomatis diisi dari token

**Response:**
```json
{
  "success": true,
  "message": "Production berhasil dihapus"
}
```

## 📝 Validation Rules

### Create Validation
- `vin_number`: Optional, max 255 characters
- `production_name_en`: Optional, max 255 characters
- `production_name_cn`: Optional, max 255 characters
- `production_sequence_number`: Optional, max 50 characters
- `production_month`: Optional, max 50 characters
- `production_year`: Optional, max 50 characters
- `production_description`: Optional, max 1000 characters
- `production_location_id`: Optional, must be valid UUID
- `production_brand_id`: Optional, must be valid UUID
- `production_driver_type_id`: Optional, must be valid UUID
- `production_vehicle_weight_id`: Optional, must be valid UUID
- `production_world_manufacturing_plant_id`: Optional, must be valid UUID
- `data_details`: Optional, must be array
- `data_details.*.master_pdf_id`: Optional, must be valid UUID

### Update Validation
- `id`: Required, must be valid UUID (from params)
- Semua field lainnya sama dengan Create Validation (semua optional)

### Get Productions Validation
- `page`: Optional, must be integer >= 1
- `limit`: Optional, must be integer between 1-100
- `search`: Optional, max 255 characters
- `sort_by`: Optional, must be one of: created_at, updated_at, production_name_en, production_name_cn, vin_number
- `sort_order`: Optional, must be: asc or desc

## 🔄 Special Features

### 1. Transaction-Based Operations
Semua operasi create, update, dan delete menggunakan database transaction untuk memastikan data consistency antara tabel productions dan productions_detail.

### 2. Auto User Tracking
Field `created_by`, `updated_by`, dan `deleted_by` akan otomatis diisi dari token JWT yang dikirimkan. System akan menggunakan `employee_id` atau `user_id` dari token.

### 3. Cascade Soft Delete
Ketika production di-soft delete, semua production details yang terkait juga akan di-soft delete secara otomatis.

### 4. Flexible Detail Management
- Create: Bisa create production dengan atau tanpa details
- Update: Bisa update production saja, atau production + replace all details
- Details akan di-soft delete dan diganti dengan data baru saat update

## 🧪 Testing dengan cURL

### Create Production
```bash
curl -X POST http://localhost:3000/api/catalogs/productions/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "vin_number": "VIN12345678",
    "production_name_en": "Test Production EN",
    "production_name_cn": "Test Production CN",
    "production_sequence_number": "001",
    "production_month": "January",
    "production_year": "2025",
    "production_description": "Test description",
    "data_details": [
      {
        "master_pdf_id": "master-pdf-uuid"
      }
    ]
  }'
```

### Get All Productions
```bash
curl -X POST http://localhost:3000/api/catalogs/productions/get \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "test",
    "sort_by": "created_at",
    "sort_order": "desc"
  }'
```

### Get by ID
```bash
curl http://localhost:3000/api/catalogs/productions/{production_id} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update
```bash
curl -X PUT http://localhost:3000/api/catalogs/productions/{production_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "production_name_en": "Updated Production Name"
  }'
```

### Delete
```bash
curl -X DELETE http://localhost:3000/api/catalogs/productions/{production_id} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔐 Authentication

Semua endpoint memerlukan authentication token JWT:
```
Authorization: Bearer {your_jwt_token}
```

Token akan di-verify oleh middleware `verifyToken` dan user data akan tersedia di `req.user`.

## 📚 Best Practices

1. **Transaction Pattern**: Gunakan transaction untuk operasi yang melibatkan multiple tables
2. **Auto Tracking**: Manfaatkan auto user tracking untuk audit trail
3. **Soft Delete**: Selalu gunakan soft delete untuk production data
4. **Validation**: Validasi semua input sebelum masuk ke database
5. **Error Handling**: Gunakan try-catch dan return consistent error response
6. **Search**: Implement search untuk user experience yang lebih baik

## 🎯 Related Tables

Module ini berhubungan dengan tables:
- `locations` - Lokasi produksi
- `brands` - Brand kendaraan
- `driver_types` - Tipe driver
- `vehicle_weights` - Berat kendaraan
- `world_manufacturing_plants` - Pabrik manufaktur
- `engines` - Engine details
- `steerings` - Steering details
- `cabines` - Cabine details
- `axles` - Axle details
- `transmissions` - Transmission details

---

Module Production dengan support multiple details! 🚀
