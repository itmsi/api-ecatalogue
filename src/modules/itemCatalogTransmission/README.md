# Item Catalog Transmission API

API untuk mengelola item katalog transmission dengan support upload foto dan import CSV.

## Fitur

- ✅ Create item catalog transmission dengan upload foto dan CSV
- ✅ Update item catalog transmission dengan UPSERT strategy
- ✅ Get list dengan pagination, filter, dan search
- ✅ Get detail by ID
- ✅ Soft delete item
- ✅ Support input via CSV atau JSON manual
- ✅ Upload foto ke MinIO
- ✅ Transaction handling untuk data integrity

## Endpoints

### 1. Get List Item Catalog Transmission

**POST** `/api/catalogs/item_catalog_transmission/get`

**Request Body (JSON):**
```json
{
  "page": 1,
  "limit": 10,
  "search": "",
  "sort_by": "created_at",
  "sort_order": "desc",
  "master_pdf_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 2. Get Item Catalog Transmission by ID

**GET** `/api/catalogs/item_catalog_transmission/{id}`

**Response:**
```json
{
  "success": true,
  "data": {
    "name_pdf": "Transmission Catalog 2024",
    "master_pdf_id": "550e8400-e29b-41d4-a716-446655440000",
    "data_items": [...]
  }
}
```

### 3. Create Item Catalog Transmission

**POST** `/api/catalogs/item_catalog_transmission/create`

**Content-Type:** `multipart/form-data`

#### Option A: Menggunakan CSV

**Form Data:**
- `name_pdf` (string, required): Nama PDF catalog
- `transmission_id` (UUID, optional): ID transmission
- `type_transmission_id` (UUID, optional): ID type transmission
- `file_foto` (file, optional): File foto (jpg/png/gif/webp, max 10MB)
- `file_csv` (file, required jika use_csv=true): File CSV
- `use_csv` (boolean, required): `true`

**Contoh cURL:**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_transmission/create' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -F 'name_pdf=Transmission Catalog 2024' \
  -F 'transmission_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_transmission_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'use_csv=true' \
  -F 'file_foto=@/path/to/image.jpg' \
  -F 'file_csv=@/path/to/data.csv'
```

#### Option B: Menggunakan Data Items (JSON)

**Form Data:**
- `name_pdf` (string, required): Nama PDF catalog
- `transmission_id` (UUID, optional): ID transmission
- `type_transmission_id` (UUID, optional): ID type transmission
- `file_foto` (file, optional): File foto
- `use_csv` (boolean, required): `false`
- `data_items` (JSON string, required): Array of items

**Contoh cURL:**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_transmission/create' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -F 'name_pdf=Transmission Catalog 2024' \
  -F 'transmission_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_transmission_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'use_csv=false' \
  -F 'file_foto=@/path/to/image.jpg' \
  -F 'data_items=[{"target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Transmission Part 1","catalog_item_name_ch":"传动部件1","description":"Description","quantity":10}]'
```

### 4. Update Item Catalog Transmission

**PUT** `/api/catalogs/item_catalog_transmission/{id}`

**Content-Type:** `multipart/form-data`

Sama seperti Create endpoint, dengan parameter yang sama. Perbedaannya:
- Menggunakan strategi UPSERT (update jika ada, insert jika belum)
- File foto baru akan menggantikan foto lama (jika diupload)
- Jika tidak upload foto baru, foto lama tetap dipertahankan

**Contoh cURL:**
```bash
curl -X 'PUT' \
  'http://localhost:9549/api/catalogs/item_catalog_transmission/{id}' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -F 'name_pdf=Transmission Catalog 2024 Updated' \
  -F 'transmission_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_transmission_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'use_csv=true' \
  -F 'file_foto=@/path/to/new_image.jpg' \
  -F 'file_csv=@/path/to/new_data.csv'
```

### 5. Delete Item Catalog Transmission

**DELETE** `/api/catalogs/item_catalog_transmission/{id}`

**Contoh cURL:**
```bash
curl -X 'DELETE' \
  'http://localhost:9549/api/catalogs/item_catalog_transmission/{id}' \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

## Format CSV

File CSV harus memiliki header dan kolom berikut:

| Kolom | Tipe | Required | Deskripsi |
|-------|------|----------|-----------|
| `target_id` | string | optional | Target ID |
| `diagram_serial_number` | string | optional | Diagram serial number |
| `part_number` | string | optional | Part number |
| `catalog_item_name_en` | string | optional | Nama item dalam bahasa Inggris |
| `catalog_item_name_ch` | string | optional | Nama item dalam bahasa China |
| `description` | string | optional | Deskripsi item |
| `quantity` | integer | optional | Jumlah/quantity |

**Contoh CSV:**
```csv
target_id,diagram_serial_number,part_number,catalog_item_name_en,catalog_item_name_ch,description,quantity
T001,DSN001,PN001,Transmission Gear Assembly,变速器齿轮总成,Main transmission gear assembly for heavy duty trucks,10
T002,DSN002,PN002,Clutch Plate,离合器片,High performance clutch plate,25
T003,DSN003,PN003,Input Shaft,输入轴,Forged steel input shaft,15
```

**Download template CSV:** [item_catalog_transmission_template.csv](../../../../item_catalog_transmission_template.csv)

## Format Data Items (JSON)

Jika menggunakan `use_csv=false`, Anda perlu mengirimkan `data_items` sebagai JSON string dengan format:

```json
[
  {
    "target_id": "T001",
    "diagram_serial_number": "DSN001",
    "part_number": "PN001",
    "catalog_item_name_en": "Transmission Part 1",
    "catalog_item_name_ch": "传动部件1",
    "description": "Description of the part",
    "quantity": 10
  },
  {
    "target_id": "T002",
    "diagram_serial_number": "DSN002",
    "part_number": "PN002",
    "catalog_item_name_en": "Transmission Part 2",
    "catalog_item_name_ch": "传动部件2",
    "description": "Another part description",
    "quantity": 5
  }
]
```

**Catatan:** Semua field di dalam data_items bersifat optional.

## Validasi

### File Upload
- **file_foto**: 
  - Format: jpg, jpeg, png, gif, webp, svg
  - Maksimal ukuran: 10MB
  - Optional
  
- **file_csv**:
  - Format: csv
  - Maksimal ukuran: 10MB
  - Required jika `use_csv=true`

### Field Validasi
- `name_pdf`: Required, string
- `transmission_id`: Optional, UUID format
- `type_transmission_id`: Optional, UUID format
- `use_csv`: Required, boolean (true/false)
- `data_items`: Required jika `use_csv=false`, JSON array

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validasi gagal atau file tidak valid |
| 401 | Unauthorized - Token tidak valid |
| 404 | Not Found - Data tidak ditemukan |
| 500 | Internal Server Error |

## Catatan Penting

1. **Transaction Handling**: Semua operasi create dan update menggunakan database transaction. Jika ada error, semua perubahan akan di-rollback.

2. **UPSERT Strategy**: Pada proses update, sistem menggunakan strategi UPSERT berdasarkan kombinasi unique key:
   - `master_pdf_id`
   - `transmission_id`
   - `type_transmission_id`
   - `target_id`
   
   Jika data dengan kombinasi key tersebut sudah ada, maka akan di-UPDATE. Jika belum ada, maka akan di-INSERT.

3. **File Foto**: 
   - File foto akan diupload ke MinIO
   - URL foto disimpan di field `file_foto` pada setiap item
   - Satu foto berlaku untuk semua items dalam satu catalog

4. **Transmission ID & Type**: 
   - `transmission_id` dan `type_transmission_id` diinput di root level (bukan di dalam data_items)
   - Nilai ini akan diterapkan ke semua items dalam catalog tersebut

5. **Soft Delete**: 
   - Delete menggunakan soft delete
   - Data tidak benar-benar dihapus, hanya ditandai dengan `is_delete=true` dan `deleted_at` timestamp

## Testing dengan Postman

1. Import Swagger documentation ke Postman
2. Set Authorization header dengan Bearer token
3. Untuk create/update, gunakan Body type: `form-data`
4. Upload file foto dan CSV melalui form-data
5. Test dengan berbagai skenario (dengan CSV, tanpa CSV, dengan foto, tanpa foto)

## Troubleshooting

### Error: "File CSV wajib diupload jika use_csv = true"
- Pastikan Anda mengupload file CSV ketika `use_csv=true`
- Pastikan field name adalah `file_csv` (bukan `csv` atau nama lain)

### Error: "data_items wajib diisi jika use_csv = false"
- Pastikan Anda mengirim `data_items` dalam format JSON string
- Pastikan JSON format valid (tidak ada syntax error)

### Error: "File terlalu besar"
- Ukuran maksimal file adalah 10MB
- Compress foto atau reduce file size sebelum upload

### Error: "Gagal mengupload file foto"
- Pastikan MinIO server berjalan dan dikonfigurasi dengan benar
- Check koneksi ke MinIO server
- Pastikan credentials MinIO valid

### Error: "Format data_items tidak valid"
- Pastikan data_items adalah JSON array yang valid
- Jika mengirim via form-data, pastikan dalam format JSON string
- Contoh: `'[{"target_id":"T001","part_number":"PN001"}]'`
