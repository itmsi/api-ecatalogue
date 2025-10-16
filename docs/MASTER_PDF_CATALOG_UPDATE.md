# Update Master PDF - Tambah Kolom master_catalog

## 📋 Ringkasan Perubahan

Menambahkan kolom `master_catalog` ke tabel `master_pdf` untuk menyimpan informasi jenis katalog (engine, axle, cabin, steering, transmission) sesuai dengan request body dari curl.

---

## 🔄 Perubahan Yang Dilakukan

### 1. **Migration Database** ✅

**File**: `src/repository/postgres/migrations/20250120000001_add_master_catalog_to_master_pdf.js`

```javascript
exports.up = function(knex) {
  return knex.schema.alterTable('master_pdf', (table) => {
    // Tambahkan kolom master_catalog
    table.enum('master_catalog', ['engine', 'axle', 'cabin', 'steering', 'transmission'])
      .nullable()
      .comment('Jenis katalog: engine, axle, cabin, steering, atau transmission');
    
    // Tambahkan index untuk performa query yang lebih baik
    table.index(['master_catalog'], 'idx_master_pdf_master_catalog');
  });
};
```

**Detail Kolom**:
- **Nama**: `master_catalog`
- **Tipe**: ENUM dengan nilai: `'engine'`, `'axle'`, `'cabin'`, `'steering'`, `'transmission'`
- **Nullable**: Ya (untuk backward compatibility)
- **Index**: Ya (untuk performa query)

### 2. **Update Repository** ✅

**File**: `src/modules/allItemCatalogs/postgre_repository.js`

#### A. Update fungsi `findOrCreateMasterPdf`
```javascript
const findOrCreateMasterPdf = async (namePdf, masterCatalog = null, createdBy = null) => {
  // Cek apakah master_pdf sudah ada dengan kombinasi name_pdf dan master_catalog
  const whereClause = { name_pdf: namePdf, is_delete: false };
  if (masterCatalog) {
    whereClause.master_catalog = masterCatalog;
  }
  // ... rest of function
};
```

#### B. Update fungsi `findOrCreateMasterPdfWithTransaction`
```javascript
const findOrCreateMasterPdfWithTransaction = async (trx, namePdf, masterCatalog = null, createdBy = null) => {
  // Cek apakah master_pdf sudah ada dengan kombinasi name_pdf dan master_catalog
  const whereClause = { name_pdf: namePdf, is_delete: false };
  if (masterCatalog) {
    whereClause.master_catalog = masterCatalog;
  }
  // ... rest of function
};
```

#### C. Update query SELECT untuk menampilkan master_catalog
```javascript
.select(
  `${tableName}.*`,
  'master_pdf.name_pdf',
  'master_pdf.master_catalog', // ✅ Ditambahkan
  // ... other fields
)
```

### 3. **Update Swagger Schema** ✅

**File**: `src/static/schema/allItemCatalogs.js`

#### A. Tambah master_catalog di AllItemCatalog schema
```javascript
master_catalog: {
  type: 'string',
  enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
  description: 'Jenis katalog (engine, axle, cabin, steering, atau transmission)'
},
```

#### B. Tambah master_catalog di AllItemCatalogDetailResponse
```javascript
master_catalog: {
  type: 'string',
  enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
  description: 'Jenis katalog (engine, axle, cabin, steering, atau transmission)'
},
```

### 4. **Script Migration** ✅

**File**: `run_migration.js`

Script untuk menjalankan migration dengan verifikasi:

```bash
node run_migration.js
```

**Output yang diharapkan**:
```
Running migration for environment: development
Migration: Add master_catalog column to master_pdf table
✅ Migration completed successfully!
✅ Column master_catalog successfully added to master_pdf table
Column details: { column_name: 'master_catalog', data_type: 'USER-DEFINED', is_nullable: 'YES' }
```

---

## 🚀 Cara Menjalankan Migration

### 1. **Jalankan Migration**
```bash
# Pastikan environment variables sudah diset
node run_migration.js
```

### 2. **Verifikasi Manual (Optional)**
```sql
-- Cek struktur tabel
\d master_pdf

-- Cek data existing
SELECT master_pdf_id, name_pdf, master_catalog, created_at 
FROM master_pdf 
ORDER BY created_at DESC 
LIMIT 5;
```

---

## 📊 Struktur Tabel Setelah Update

### Tabel: `master_pdf`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `master_pdf_id` | uuid | NO | uuid_generate_v4() | Primary Key |
| `name_pdf` | varchar(255) | NO | - | Nama file PDF |
| `master_catalog` | enum | YES | NULL | **BARU**: Jenis katalog |
| `description` | text | YES | NULL | Deskripsi |
| `created_at` | timestamp | YES | now() | Waktu dibuat |
| `created_by` | uuid | YES | NULL | User yang membuat |
| `updated_at` | timestamp | YES | now() | Waktu diupdate |
| `updated_by` | uuid | YES | NULL | User yang update |
| `deleted_at` | timestamp | YES | NULL | Waktu dihapus |
| `deleted_by` | uuid | YES | NULL | User yang hapus |
| `is_delete` | boolean | YES | false | Status delete |

### Index Baru
- `idx_master_pdf_master_catalog` pada kolom `master_catalog`

---

## 🔄 Perilaku API Setelah Update

### 1. **Create Item Catalog**

**Request** (sama seperti sebelumnya):
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/all-item-catalogs/create' \
  -H 'Authorization: Bearer TOKEN' \
  -F 'name_pdf=EN' \
  -F 'master_catalog=engine' \
  -F 'master_category_id=fba70960-15d8-43eb-9315-814d80b77666' \
  -F 'type_category_id=a24d68e3-69c9-4e04-a7ee-f8bb8ddf5b3b' \
  -F 'use_csv=true' \
  -F 'file_foto=@testdebug2.jpg' \
  -F 'file_csv=@template_import_csv_epc.csv'
```

**Perubahan**:
- Kolom `master_catalog` di tabel `master_pdf` akan disimpan dengan nilai `'engine'`
- Query untuk mencari existing master_pdf akan menggunakan kombinasi `name_pdf + master_catalog`

### 2. **Response API**

**Sebelum**:
```json
{
  "success": true,
  "data": {
    "master_pdf_id": "uuid-here",
    "items": [
      {
        "id": "uuid-here",
        "name_pdf": "EN",
        // ... other fields
      }
    ]
  }
}
```

**Sesudah**:
```json
{
  "success": true,
  "data": {
    "master_pdf_id": "uuid-here",
    "items": [
      {
        "id": "uuid-here",
        "name_pdf": "EN",
        "master_catalog": "engine", // ✅ Ditambahkan
        // ... other fields
      }
    ]
  }
}
```

### 3. **Query Logic**

**Sebelum**: Cek existing berdasarkan `name_pdf` saja
```sql
SELECT * FROM master_pdf 
WHERE name_pdf = 'EN' AND is_delete = false;
```

**Sesudah**: Cek existing berdasarkan `name_pdf + master_catalog`
```sql
SELECT * FROM master_pdf 
WHERE name_pdf = 'EN' 
  AND master_catalog = 'engine' 
  AND is_delete = false;
```

---

## 🎯 Manfaat Update

### 1. **Data Integrity**
- Mencegah duplikasi master_pdf dengan nama sama tapi jenis katalog berbeda
- Memungkinkan nama PDF yang sama untuk jenis katalog yang berbeda

### 2. **Better Organization**
- Data terorganisir berdasarkan jenis katalog
- Mudah untuk filtering dan reporting

### 3. **API Consistency**
- Response API menampilkan informasi lengkap tentang jenis katalog
- Swagger documentation lebih lengkap

### 4. **Performance**
- Index pada kolom `master_catalog` untuk query yang lebih cepat
- Query lebih spesifik dengan kombinasi `name_pdf + master_catalog`

---

## 🔍 Testing

### 1. **Test Migration**
```bash
node run_migration.js
```

### 2. **Test API Create**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/all-item-catalogs/create' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -F 'name_pdf=Test_Engine_Catalog' \
  -F 'master_catalog=engine' \
  -F 'master_category_id=fba70960-15d8-43eb-9315-814d80b77666' \
  -F 'type_category_id=a24d68e3-69c9-4e04-a7ee-f8bb8ddf5b3b' \
  -F 'use_csv=true' \
  -F 'file_csv=@your_csv_file.csv'
```

### 3. **Test API Get**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/all-item-catalogs/get' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "page": 1,
    "limit": 10,
    "master_catalog": "engine"
  }'
```

---

## ✅ Status

- ✅ **Migration**: Created
- ✅ **Repository**: Updated
- ✅ **Swagger Schema**: Updated
- ✅ **Script Migration**: Created
- ✅ **Linter**: No errors
- ✅ **Backward Compatibility**: Maintained

---

**Status**: ✅ **KOLOM MASTER_CATALOG BERHASIL DITAMBAHKAN**

Sekarang tabel `master_pdf` memiliki kolom `master_catalog` yang akan menyimpan informasi jenis katalog sesuai dengan request body dari curl! 🎉📊
