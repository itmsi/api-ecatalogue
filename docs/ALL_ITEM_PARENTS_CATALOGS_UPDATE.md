# All Item Parents Catalogs Update

## 📋 Ringkasan Perubahan

Telah ditambahkan tabel baru `all_item_parents_catalogs` yang berfungsi untuk mengelompokkan data item catalog berdasarkan kombinasi `master_pdf_id`, `master_catalog`, `master_category_id`, dan `type_category_id`.

## 🗄️ Tabel Baru: all_item_parents_catalogs

### Struktur Tabel

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `all_item_parents_catalog_id` | UUID | PRIMARY KEY | Auto-generated UUID |
| `master_pdf_id` | UUID | FOREIGN KEY | Relasi ke tabel master_pdf |
| `master_catalog` | ENUM | NOT NULL | engine, axle, cabin, steering, transmission |
| `master_category_id` | UUID | NULLABLE | engine_id, axle_id, cabin_id, steering_id, transmission_id |
| `type_category_id` | UUID | NULLABLE | type_engine_id, type_axle_id, type_cabin_id, type_steering_id, type_transmission_id |
| `file_foto` | TEXT | NULLABLE | File foto yang dikelompokkan |
| `created_at` | TIMESTAMP | NOT NULL | Waktu pembuatan |
| `created_by` | UUID | NULLABLE | User yang membuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update terakhir |
| `updated_by` | UUID | NULLABLE | User yang update terakhir |
| `deleted_at` | TIMESTAMP | NULLABLE | Waktu soft delete |
| `deleted_by` | UUID | NULLABLE | User yang soft delete |
| `is_delete` | BOOLEAN | NOT NULL | Status soft delete |

### Indexes

- `idx_all_item_parents_catalogs_master_pdf_id`
- `idx_all_item_parents_catalogs_master_catalog`
- `idx_all_item_parents_catalogs_master_category_id`
- `idx_all_item_parents_catalogs_type_category_id`
- `idx_all_item_parents_catalogs_deleted_at`
- `idx_all_item_parents_catalogs_is_delete`
- `idx_all_item_parents_catalogs_created_at`
- `idx_all_item_parents_catalogs_master_pdf_catalog` (composite)
- `idx_all_item_parents_catalogs_composite` (composite)

## 🔧 Perubahan pada Kode

### 1. Migration File
- **File**: `src/repository/postgres/migrations/20251017022626_create_all_item_parents_catalogs_table.js`
- **Status**: ✅ Berhasil dijalankan (Batch 33)

### 2. Repository Baru
- **File**: `src/repository/postgres/all_item_parents_catalogs.js`
- **Fungsi**: CRUD operations untuk tabel all_item_parents_catalogs
- **Fitur**: 
  - `findOrCreate()` - Cari atau buat record baru
  - `findOrCreateWithTransaction()` - Dengan transaction support
  - CRUD operations lengkap

### 3. Update Handler allItemCatalogs
- **File**: `src/modules/allItemCatalogs/postgre_repository.js`
- **Perubahan**: 
  - Ditambahkan import repository baru
  - Update fungsi `createWithTransaction()` untuk insert ke tabel parent
  - Update fungsi `updateWithTransaction()` untuk insert ke tabel parent

## 🚀 Cara Kerja

### Saat Create/Update Item Catalog

1. **Proses Normal**: Data item catalog tetap disimpan ke tabel masing-masing (item_catalog_engines, item_catalog_axles, dll)

2. **Auto Insert Parent**: Setelah item catalog berhasil disimpan/update, sistem akan otomatis:
   - Cek apakah sudah ada record parent dengan kombinasi yang sama
   - Jika sudah ada, update file_foto jika ada perubahan
   - Jika belum ada, buat record parent baru

3. **Data Parent**: Record parent akan berisi:
   - `master_pdf_id`: ID dari master PDF
   - `master_catalog`: Jenis catalog (engine, axle, dll)
   - `master_category_id`: ID kategori master
   - `type_category_id`: ID tipe kategori
   - `file_foto`: File foto yang dikelompokkan

## 📝 Contoh Penggunaan

### CURL Request (Tidak Berubah)
```bash
curl -X 'POST' \
  'http://localhost:9550/api/catalogs/all-item-catalogs/create' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name_pdf=EN898983' \
  -F 'master_catalog=engine' \
  -F 'master_category_id=fba70960-15d8-43eb-9315-814d80b77666' \
  -F 'type_category_id=a24d68e3-69c9-4e04-a7ee-f8bb8ddf5b3b' \
  -F 'use_csv=true' \
  -F 'data_items=' \
  -F 'file_foto=@testdebug2.jpg;type=image/jpeg' \
  -F 'file_csv=@template_import_csv_epc.csv;type=text/csv'
```

### Response (Ditambahkan parent_catalog)
```json
{
  "status": "success",
  "data": {
    "master_pdf_id": "uuid-master-pdf",
    "items": [...],
    "parent_catalog": {
      "all_item_parents_catalog_id": "uuid-parent-catalog",
      "master_pdf_id": "uuid-master-pdf",
      "master_catalog": "engine",
      "master_category_id": "fba70960-15d8-43eb-9315-814d80b77666",
      "type_category_id": "a24d68e3-69c9-4e04-a7ee-f8bb8ddf5b3b",
      "file_foto": "https://minio-url/file-foto.jpg",
      "created_at": "2025-01-17T02:26:26.000Z",
      "created_by": "user-uuid",
      "updated_at": "2025-01-17T02:26:26.000Z",
      "updated_by": "user-uuid",
      "is_delete": false
    }
  },
  "message": "Data berhasil dibuat"
}
```

## 🎯 Manfaat

1. **Pengelompokan Data**: Data item catalog sekarang dapat dikelompokkan berdasarkan kombinasi yang sama
2. **File Foto Terpusat**: File foto dapat dikelompokkan per kombinasi master_category + type_category
3. **Query Lebih Efisien**: Dapat query data parent tanpa perlu join ke tabel item catalog individual
4. **Audit Trail**: Tetap memiliki audit trail lengkap untuk parent records
5. **Backward Compatible**: Tidak mengubah struktur API yang sudah ada

## 🔍 Query Contoh

### Cari Parent Catalog berdasarkan Master PDF
```sql
SELECT * FROM all_item_parents_catalogs 
WHERE master_pdf_id = 'uuid-master-pdf' 
AND is_delete = false;
```

### Cari Parent Catalog berdasarkan Master Catalog
```sql
SELECT * FROM all_item_parents_catalogs 
WHERE master_catalog = 'engine' 
AND is_delete = false;
```

### Join dengan Master PDF
```sql
SELECT 
  apc.*,
  mp.name_pdf
FROM all_item_parents_catalogs apc
LEFT JOIN master_pdf mp ON apc.master_pdf_id = mp.master_pdf_id
WHERE apc.is_delete = false;
```

## ✅ Status Implementasi

- [x] Migration file dibuat dan dijalankan
- [x] Repository all_item_parents_catalogs dibuat
- [x] Handler allItemCatalogs diupdate
- [x] Testing dengan CURL request yang ada
- [x] Dokumentasi lengkap

## 🚨 Catatan Penting

1. **Error Handling**: Jika insert ke tabel parent gagal, operasi utama tetap berlanjut (non-blocking)
2. **Transaction Safety**: Semua operasi menggunakan database transaction
3. **Soft Delete**: Tabel parent mendukung soft delete
4. **Performance**: Indexes sudah dioptimalkan untuk query yang sering digunakan

---

**Tanggal Update**: 17 Januari 2025  
**Batch Migration**: 33  
**Status**: ✅ Production Ready
