# Contoh cURL untuk Item Catalog Engine

## Struktur Request Baru

**Perbedaan dengan struktur lama:**
- `engine_id` dan `type_engine_id` sekarang di level root (bukan di dalam data_items)
- Berlaku untuk SEMUA items
- Di dalam `data_items` tidak perlu ada `engine_id` dan `type_engine_id` lagi

## 1. POST Create - Menggunakan data_items Manual

```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjBiNTcyNTgtNWYzMy00ZTAzLTgxZjctY2Q3MGQ4MzNiNWM1IiwiZW1wbG95ZWVfaWQiOiJmMGI1NzI1OC01ZjMzLTRlMDMtODFmNy1jZDcwZDgzM2I1YzUiLCJpYXQiOjE3NTk5OTI4MzcsImV4cCI6MTc2MDA3OTIzNywiYXVkIjoic3RyaW5nIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.NvTfgbzy2WUhBeYd-jrt9nWl1gDwRwE7wX09BHOG0vI' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'engine_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_engine_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'use_csv=false' \
  -F 'data_items=[{"target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1","catalog_item_name_ch":"引擎部件1","description":"Description","quantity":10}]'
```

**Penjelasan:**
- `engine_id` dan `type_engine_id` di level root
- `data_items` hanya berisi field lain (tanpa engine_id dan type_engine_id)
- Semua items akan otomatis mendapat engine_id dan type_engine_id yang sama

## 2. POST Create - Menggunakan CSV

```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'engine_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_engine_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'use_csv=true' \
  -F 'file_csv=@item_catalog_engine_template.csv'
```

**Format CSV:**
```csv
target_id,diagram_serial_number,part_number,catalog_item_name_en,catalog_item_name_ch,description,quantity
T001,DSN001,PN001,Engine Part 1,引擎部件1,High performance engine part,10
T002,DSN002,PN002,Engine Part 2,引擎部件2,Durable engine component,5
```

**Catatan:** CSV tidak perlu kolom `engine_id` dan `type_engine_id`

## 3. POST Create - Dengan File Foto + data_items

```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'engine_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_engine_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'file_foto=@/path/to/engine_photo.jpg' \
  -F 'use_csv=false' \
  -F 'data_items=[{"target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1","catalog_item_name_ch":"引擎部件1","description":"Description","quantity":10}]'
```

## 4. POST Create - Dengan File Foto + CSV

```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/create' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024' \
  -F 'engine_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_engine_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'file_foto=@/path/to/engine_photo.jpg' \
  -F 'use_csv=true' \
  -F 'file_csv=@item_catalog_engine_template.csv'
```

## 5. PUT Update - Menggunakan data_items Manual

```bash
curl -X 'PUT' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024 Updated' \
  -F 'engine_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_engine_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'use_csv=false' \
  -F 'data_items=[{"target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1 Updated","catalog_item_name_ch":"引擎部件1更新","description":"Description Updated","quantity":15}]'
```

## 6. PUT Update - Menggunakan CSV

```bash
curl -X 'PUT' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024 Updated' \
  -F 'engine_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_engine_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'use_csv=true' \
  -F 'file_csv=@updated_data.csv'
```

## 7. PUT Update - Dengan File Foto Baru

```bash
curl -X 'PUT' \
  'http://localhost:9549/api/catalogs/item_catalog_engine/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Engine Catalog 2024 Updated' \
  -F 'engine_id=1cd67a84-c5d1-46ff-b5c2-f85a70512227' \
  -F 'type_engine_id=dec6d87f-ea6a-4a75-a11c-bda336c08275' \
  -F 'file_foto=@/path/to/new_engine_photo.jpg' \
  -F 'use_csv=false' \
  -F 'data_items=[{"target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1 Updated","catalog_item_name_ch":"引擎部件1更新","description":"Description Updated","quantity":15}]'
```

## Parameter Request

### Required
- `name_pdf` (string) - Nama PDF catalog

### Optional Root Level
- `engine_id` (uuid) - Engine ID berlaku untuk SEMUA items
- `type_engine_id` (uuid) - Type Engine ID berlaku untuk SEMUA items
- `file_foto` (file) - File foto/gambar (jpg, jpeg, png, gif, webp, svg, max 10MB)
- `use_csv` (boolean) - Mode: `true` = CSV, `false` = manual (default: false)

### Conditional
- `file_csv` (file) - Required jika `use_csv = true`
- `data_items` (json string) - Required jika `use_csv = false`

### Format data_items (JSON string)
```json
[
  {
    "target_id": "T001",
    "diagram_serial_number": "DSN001",
    "part_number": "PN001",
    "catalog_item_name_en": "Engine Part 1",
    "catalog_item_name_ch": "引擎部件1",
    "description": "Description",
    "quantity": 10
  }
]
```

**Catatan:** 
- `data_items` TIDAK perlu field `engine_id` dan `type_engine_id`
- Field tersebut diambil dari root level

## Response Success

```json
{
  "success": true,
  "message": "Data berhasil dibuat",
  "data": {
    "master_pdf_id": "uuid",
    "items": [
      {
        "item_catalog_engine_id": "uuid",
        "master_pdf_id": "uuid",
        "engine_id": "1cd67a84-c5d1-46ff-b5c2-f85a70512227",
        "type_engine_id": "dec6d87f-ea6a-4a75-a11c-bda336c08275",
        "target_id": "T001",
        "diagram_serial_number": "DSN001",
        "part_number": "PN001",
        "catalog_item_name_en": "Engine Part 1",
        "catalog_item_name_ch": "引擎部件1",
        "description": "Description",
        "quantity": 10,
        "created_at": "2024-10-10T10:00:00Z",
        "created_by": "uuid",
        "updated_at": "2024-10-10T10:00:00Z",
        "updated_by": "uuid",
        "is_delete": false
      }
    ]
  }
}
```

## Response Error

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detail error"]
}
```

## Notes

1. **engine_id dan type_engine_id di root level** - Berlaku untuk SEMUA items yang di-insert
2. **CSV tidak perlu engine_id/type_engine_id** - Sudah diambil dari root parameter
3. **data_items tidak perlu engine_id/type_engine_id** - Sudah diambil dari root parameter
4. **File foto optional** - Bisa diupload atau tidak
5. **Dual mode** - Pilih antara CSV atau manual via `use_csv`
6. **Transaction safe** - Auto rollback jika ada error

