# Fix Update All Item Catalogs - Delete Insert Implementation

## Masalah yang Diperbaiki

Ketika melakukan update pada endpoint PUT `/api/catalogs/all-item-catalogs/{id}`, data di tabel `item_catalog_cabines`, `item_catalog_engines`, `item_catalog_axles`, `item_catalog_steerings`, dan `item_catalog_transmissions` terus bertambah alih-alih diupdate. Ini menyebabkan duplikasi data yang tidak diinginkan.

## Solusi yang Diimplementasikan

### 1. Perubahan Logika Delete di `updateWithTransaction`

**Sebelum:**
- Delete hanya berdasarkan kombinasi `master_pdf_id` + `master_category_id` + `type_category_id`
- Data lama tidak terhapus jika ada perubahan pada `master_category_id` atau `type_category_id`

**Sesudah:**
- Delete **SEMUA** data berdasarkan `master_pdf_id` saja
- Tidak mempedulikan `master_category_id` dan `type_category_id`
- Memastikan semua data lama terhapus sebelum insert data baru

### 2. Perubahan pada Parent Catalog Records

**Sebelum:**
- Update parent catalog record yang sudah ada
- Bisa menyebabkan konflik atau duplikasi

**Sesudah:**
- Delete **SEMUA** parent catalog record lama berdasarkan `master_pdf_id`
- Insert parent catalog record baru dengan data yang benar

### 3. Alur Proses Update yang Baru

```javascript
// STEP 1: HARD DELETE semua data_items lama berdasarkan master_pdf_id
const deleteWhereClause = {
  master_pdf_id: finalMasterPdfId
};

deletedItems = await trx(tableName)
  .where(deleteWhereClause)
  .del()  // Hard delete - hapus langsung dari database
  .returning('*');

// STEP 2: INSERT semua data_items baru
// ... insert logic ...

// STEP 3: HARD DELETE semua parent catalog records lama berdasarkan master_pdf_id
deletedParentRecords = await trx('all_item_parents_catalogs')
  .where({ master_pdf_id: finalMasterPdfId })
  .del()  // Hard delete - hapus langsung dari database
  .returning('*');

// STEP 4: INSERT parent catalog record baru
parentCatalogRecord = await allItemParentsCatalogsRepo.createWithTransaction(...);
```

## File yang Dimodifikasi

- `src/modules/allItemCatalogs/postgre_repository.js`
  - Method `updateWithTransaction` (baris 851-1051)
  - Perubahan logika delete untuk data_items
  - Perubahan logika delete untuk parent catalog records

## Testing

Untuk menguji perbaikan ini:

1. Buat data catalog baru
2. Update data catalog tersebut dengan data yang berbeda
3. Verifikasi bahwa data lama sudah terhapus dan data baru sudah tersimpan
4. Pastikan tidak ada duplikasi data di tabel item_catalog_*

## Contoh Curl Test

```bash
curl -X 'PUT' \
  'http://localhost:9550/api/catalogs/all-item-catalogs/85d0065a-fa3c-497f-843c-b9d075162e41' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=Cabin ku edit' \
  -F 'master_catalog=cabin' \
  -F 'master_category_id=4ffed14d-8f12-4a81-ae01-1ab1ba2d97ba' \
  -F 'type_category_id=d60257a1-aafd-454b-9e4a-fc1c9f3a02e1' \
  -F 'use_csv=false' \
  -F 'data_items=[{"target_id":"T001","part_number":"PN-12345","catalog_item_name_en":"Engine Oil Filter","catalog_item_name_ch":"机油滤清器","description":"High quality engine oil filter","quantity":2}]' \
  -F 'file_foto=' \
  -F 'file_csv='
```

## Hasil yang Diharapkan

- Data lama di tabel item_catalog_* akan terhapus langsung dari database (hard delete)
- Data baru akan tersimpan dengan benar
- Tidak ada duplikasi data
- Parent catalog record akan terupdate dengan benar
- Response akan menampilkan informasi tentang data yang dihapus dan data yang baru

## Catatan Penting

- Perubahan ini menggunakan **hard delete** - data lama akan dihapus langsung dari database
- Ini akan menghemat ruang penyimpanan database karena data lama tidak disimpan lagi
- Logging telah ditambahkan untuk memudahkan debugging
- Implementasi ini berlaku untuk semua tabel item_catalog (engines, axles, cabines, steerings, transmissions)
- **PERINGATAN**: Data yang dihapus tidak dapat dikembalikan karena menggunakan hard delete