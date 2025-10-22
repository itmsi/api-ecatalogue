# Templates

Folder ini berisi template CSV yang digunakan untuk upload data catalog.

## File Template

- `item_catalog_axle_template.csv` - Template untuk upload data axle catalog
- `item_catalog_engine_template.csv` - Template untuk upload data engine catalog  
- `item_catalog_transmission_template.csv` - Template untuk upload data transmission catalog
- `test_catalog_items.csv` - File test untuk catalog items

## Cara Penggunaan

1. Download template yang sesuai dengan jenis catalog yang ingin diupload
2. Isi data sesuai dengan format template
3. Upload file CSV melalui endpoint upload catalog
4. Pastikan format data sesuai dengan kolom yang tersedia di template

## Catatan

- Pastikan file CSV menggunakan encoding UTF-8
- Header kolom harus sesuai dengan template
- Data yang diupload akan divalidasi sesuai dengan schema yang ditentukan
