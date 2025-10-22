# CURL Examples untuk All Item Catalogs API

## 1. Create Item Catalog (Engine)

```bash
curl -X POST "http://localhost:9549/api/v1/all-item-catalogs/create" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name_pdf=Engine Catalog 2024" \
  -F "master_catalog=engine" \
  -F "master_category_id=550e8400-e29b-41d4-a716-446655440000" \
  -F "type_category_id=660e8400-e29b-41d4-a716-446655440001" \
  -F "use_csv=false" \
  -F "data_items=[{\"target_id\":\"T001\",\"diagram_serial_number\":\"DSN001\",\"part_number\":\"PN001\",\"catalog_item_name_en\":\"Engine Part 1\",\"catalog_item_name_ch\":\"发动机零件1\",\"description\":\"Engine component\",\"quantity\":2}]" \
  -F "file_foto=@/path/to/engine_photo.jpg"
```

## 2. Create Item Catalog (Axle)

```bash
curl -X POST "http://localhost:9549/api/v1/all-item-catalogs/create" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name_pdf=Axle Catalog 2024" \
  -F "master_catalog=axle" \
  -F "master_category_id=550e8400-e29b-41d4-a716-446655440002" \
  -F "type_category_id=660e8400-e29b-41d4-a716-446655440003" \
  -F "use_csv=false" \
  -F "data_items=[{\"target_id\":\"T002\",\"diagram_serial_number\":\"DSN002\",\"part_number\":\"PN002\",\"catalog_item_name_en\":\"Axle Part 1\",\"catalog_item_name_ch\":\"车轴零件1\",\"description\":\"Axle component\",\"quantity\":1}]" \
  -F "file_foto=@/path/to/axle_photo.jpg"
```

## 3. Create Item Catalog (Cabin)

```bash
curl -X POST "http://localhost:9549/api/v1/all-item-catalogs/create" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name_pdf=Cabin Catalog 2024" \
  -F "master_catalog=cabin" \
  -F "master_category_id=550e8400-e29b-41d4-a716-446655440004" \
  -F "type_category_id=660e8400-e29b-41d4-a716-446655440005" \
  -F "use_csv=false" \
  -F "data_items=[{\"target_id\":\"T003\",\"diagram_serial_number\":\"DSN003\",\"part_number\":\"PN003\",\"catalog_item_name_en\":\"Cabin Part 1\",\"catalog_item_name_ch\":\"驾驶室零件1\",\"description\":\"Cabin component\",\"quantity\":3}]" \
  -F "file_foto=@/path/to/cabin_photo.jpg"
```

## 4. Create Item Catalog (Steering)

```bash
curl -X POST "http://localhost:9549/api/v1/all-item-catalogs/create" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name_pdf=Steering Catalog 2024" \
  -F "master_catalog=steering" \
  -F "master_category_id=550e8400-e29b-41d4-a716-446655440006" \
  -F "type_category_id=660e8400-e29b-41d4-a716-446655440007" \
  -F "use_csv=false" \
  -F "data_items=[{\"target_id\":\"T004\",\"diagram_serial_number\":\"DSN004\",\"part_number\":\"PN004\",\"catalog_item_name_en\":\"Steering Part 1\",\"catalog_item_name_ch\":\"转向零件1\",\"description\":\"Steering component\",\"quantity\":1}]" \
  -F "file_foto=@/path/to/steering_photo.jpg"
```

## 5. Create Item Catalog (Transmission)

```bash
curl -X POST "http://localhost:9549/api/v1/all-item-catalogs/create" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name_pdf=Transmission Catalog 2024" \
  -F "master_catalog=transmission" \
  -F "master_category_id=550e8400-e29b-41d4-a716-446655440008" \
  -F "type_category_id=660e8400-e29b-41d4-a716-446655440009" \
  -F "use_csv=false" \
  -F "data_items=[{\"target_id\":\"T005\",\"diagram_serial_number\":\"DSN005\",\"part_number\":\"PN005\",\"catalog_item_name_en\":\"Transmission Part 1\",\"catalog_item_name_ch\":\"变速箱零件1\",\"description\":\"Transmission component\",\"quantity\":2}]" \
  -F "file_foto=@/path/to/transmission_photo.jpg"
```

## 6. Create Item Catalog dengan CSV

```bash
curl -X POST "http://localhost:9549/api/v1/all-item-catalogs/create" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name_pdf=Engine Catalog CSV 2024" \
  -F "master_catalog=engine" \
  -F "master_category_id=550e8400-e29b-41d4-a716-446655440000" \
  -F "type_category_id=660e8400-e29b-41d4-a716-446655440001" \
  -F "use_csv=true" \
  -F "file_csv=@/path/to/engine_items.csv" \
  -F "file_foto=@/path/to/engine_photo.jpg"
```

## 7. Get All Item Catalogs

```bash
curl -X POST "http://localhost:9549/api/v1/all-item-catalogs/get" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "",
    "sort_by": "created_at",
    "sort_order": "desc",
    "master_catalog": "engine"
  }'
```

## 8. Get All Item Catalogs (Semua Jenis)

```bash
curl -X POST "http://localhost:9549/api/v1/all-item-catalogs/get" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "",
    "sort_by": "created_at",
    "sort_order": "desc"
  }'
```

## 9. Get Item Catalog by ID

```bash
curl -X GET "http://localhost:9549/api/v1/all-item-catalogs/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 10. Update Item Catalog

```bash
curl -X PUT "http://localhost:9549/api/v1/all-item-catalogs/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name_pdf=Updated Engine Catalog 2024" \
  -F "master_catalog=engine" \
  -F "master_category_id=550e8400-e29b-41d4-a716-446655440000" \
  -F "type_category_id=660e8400-e29b-41d4-a716-446655440001" \
  -F "use_csv=false" \
  -F "data_items=[{\"target_id\":\"T001\",\"diagram_serial_number\":\"DSN001\",\"part_number\":\"PN001\",\"catalog_item_name_en\":\"Updated Engine Part 1\",\"catalog_item_name_ch\":\"更新的发动机零件1\",\"description\":\"Updated engine component\",\"quantity\":3}]" \
  -F "file_foto=@/path/to/updated_engine_photo.jpg"
```

## 11. Delete Item Catalog

```bash
curl -X DELETE "http://localhost:9549/api/v1/all-item-catalogs/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Body Request Format

### Untuk Create/Update (multipart/form-data):

```json
{
    "name_pdf": "string",
    "master_catalog": "engine|axle|cabin|steering|transmission",
    "master_category_id": "string (UUID)",
    "type_category_id": "string (UUID)",
    "use_csv": "boolean",
    "data_items": "string (JSON array)",
    "file_foto": "file (optional)",
    "file_csv": "file (required if use_csv = true)"
}
```

### Mapping master_category_id dan type_category_id berdasarkan master_catalog:

| master_catalog | master_category_id | type_category_id |
|----------------|-------------------|------------------|
| engine | engine_id | type_engine_id |
| axle | axle_id | type_axle_id |
| cabin | cabin_id | type_cabin_id |
| steering | steering_id | type_steering_id |
| transmission | transmission_id | type_transmission_id |

### Data Items Format:

```json
[
  {
    "target_id": "string",
    "diagram_serial_number": "string",
    "part_number": "string",
    "catalog_item_name_en": "string",
    "catalog_item_name_ch": "string",
    "description": "string",
    "quantity": "integer"
  }
]
```

## Notes

1. **master_catalog** menentukan jenis katalog dan tabel yang akan digunakan
2. **master_category_id** dan **type_category_id** harus sesuai dengan master_catalog yang dipilih
3. Jika **use_csv = true**, maka **file_csv** wajib diupload dan **data_items** tidak diperlukan
4. Jika **use_csv = false**, maka **data_items** wajib diisi dan **file_csv** tidak diperlukan
5. **file_foto** selalu optional untuk semua request
6. Semua endpoint memerlukan authentication token