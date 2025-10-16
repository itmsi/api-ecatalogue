# Improvements: Filter Master Catalog & Enhanced Search

## 📋 Ringkasan Perubahan

Memperbaiki filter `master_catalog` untuk menggunakan kolom `master_catalog` di tabel `master_pdf`, dan meningkatkan parameter `search` untuk mencari di multiple tabel dan kolom sesuai permintaan.

---

## 🔄 Perubahan Yang Dilakukan

### 1. **Filter Master Catalog** ✅

**Sebelum**:
- Filter `master_catalog` menggunakan parameter untuk menentukan tabel mana yang akan diquery
- Logika: `master_catalog = "engine"` → query tabel `item_catalog_engines`

**Sesudah**:
- Filter `master_catalog` menggunakan kolom `master_catalog` di tabel `master_pdf`
- Logika: `master_catalog = "transmission"` → query semua tabel dengan kondisi `WHERE master_pdf.master_catalog = 'transmission'`

### 2. **Enhanced Search Parameter** ✅

**Sebelum**:
```javascript
// Search hanya di beberapa kolom
.where('master_pdf.name_pdf', 'ilike', `%${search}%`)
.orWhere(`${tableName}.catalog_item_name_en`, 'ilike', `%${search}%`)
.orWhere(`${tableName}.catalog_item_name_ch`, 'ilike', `%${search}%`)
.orWhere(`${tableName}.part_number`, 'ilike', `%${search}%`)
.orWhere(`${tableName}.target_id`, 'ilike', `%${search}%`)
```

**Sesudah**:
```javascript
// Search di semua tabel dan kolom yang diminta
.where('master_pdf.name_pdf', 'ilike', `%${search}%`)
.orWhere(`${tableName}.catalog_item_name_en`, 'ilike', `%${search}%`)
.orWhere(`${tableName}.catalog_item_name_ch`, 'ilike', `%${search}%`)
.orWhere(`${tableName}.part_number`, 'ilike', `%${search}%`)
.orWhere(`${tableName}.target_id`, 'ilike', `%${search}%`)
// Search di master tables
.orWhere(`${relatedTables.master}.${relatedTables.masterNameEn}`, 'ilike', `%${search}%`)
.orWhere(`${relatedTables.master}.${relatedTables.masterNameCn}`, 'ilike', `%${search}%`)
// Search di type tables
.orWhere(`${relatedTables.type}.${relatedTables.typeNameEn}`, 'ilike', `%${search}%`)
.orWhere(`${relatedTables.type}.${relatedTables.typeNameCn}`, 'ilike', `%${search}%`)
```

---

## 🎯 Perilaku Setelah Perbaikan

### **1. Filter Master Catalog**

**Request**:
```json
{
  "page": 1,
  "limit": 10,
  "master_catalog": "transmission"
}
```

**SQL Query yang Dijalankan**:
```sql
-- Query semua tabel dengan filter master_pdf.master_catalog
SELECT * FROM item_catalog_engines 
LEFT JOIN master_pdf ON item_catalog_engines.master_pdf_id = master_pdf.master_pdf_id
WHERE master_pdf.master_catalog = 'transmission' AND item_catalog_engines.is_delete = false

UNION ALL

SELECT * FROM item_catalog_axles 
LEFT JOIN master_pdf ON item_catalog_axles.master_pdf_id = master_pdf.master_pdf_id
WHERE master_pdf.master_catalog = 'transmission' AND item_catalog_axles.is_delete = false

-- ... dan seterusnya untuk semua tabel
```

**Hasil**: Mengembalikan semua data yang memiliki `master_pdf.master_catalog = 'transmission'` dari semua tabel

### **2. Enhanced Search**

**Request**:
```json
{
  "page": 1,
  "limit": 10,
  "search": "engine"
}
```

**Tabel dan Kolom yang Dicari**:

| Tabel | Kolom yang Dicari |
|-------|-------------------|
| `master_pdf` | `name_pdf` |
| `item_catalog_*` | `catalog_item_name_en`, `catalog_item_name_ch`, `part_number`, `target_id` |
| `engines` | `engines_name_en`, `engines_name_cn` |
| `axels` | `axel_name_en`, `axel_name_cn` |
| `cabines` | `cabines_name_en`, `cabines_name_cn` |
| `steerings` | `steering_name_en`, `steering_name_cn` |
| `transmissions` | `transmission_name_en`, `transmission_name_cn` |
| `type_engines` | `type_engine_name_en`, `type_engine_name_cn` |
| `type_axels` | `type_axel_name_en`, `type_axel_name_cn` |
| `type_cabines` | `type_cabine_name_en`, `type_cabine_name_cn` |
| `type_steerings` | `type_steering_name_en`, `type_steering_name_cn` |
| `type_transmissions` | `type_transmission_name_en`, `type_transmission_name_cn` |

---

## 📊 Test Cases

### **Test 1: Filter Master Catalog**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/all-item-catalogs/get' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "page": 1,
    "limit": 10,
    "master_catalog": "transmission"
  }'
```

**Expected**: Mengembalikan semua data yang memiliki `master_pdf.master_catalog = 'transmission'` dari semua tabel

### **Test 2: Enhanced Search**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/all-item-catalogs/get' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "engine"
  }'
```

**Expected**: Mengembalikan data yang mengandung kata "engine" di:
- `master_pdf.name_pdf`
- `engines.engines_name_en`
- `type_engines.type_engine_name_en`
- Dan semua kolom lainnya yang disebutkan

### **Test 3: Combined Filter + Search**
```bash
curl -X 'POST' \
  'http://localhost:9549/api/catalogs/all-item-catalogs/get' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "oil",
    "master_catalog": "engine"
  }'
```

**Expected**: Mengembalikan data yang:
1. Memiliki `master_pdf.master_catalog = 'engine'`
2. DAN mengandung kata "oil" di salah satu kolom yang dicari

---

## 🔍 Detail Implementasi

### **Fungsi Baru**

#### 1. `findAllByMasterCatalog()`
- Fungsi untuk menangani filter `master_catalog`
- Query semua tabel dengan kondisi `master_pdf.master_catalog = filter_value`
- Menggabungkan hasil dari semua tabel

#### 2. `findAllByCatalogTypeWithMasterCatalogFilter()`
- Fungsi untuk query tabel spesifik dengan filter `master_catalog`
- Digunakan oleh `findAllByMasterCatalog()`

### **Mapping Tabel dan Kolom**

```javascript
const relatedTables = {
  'engine': {
    master: 'engines',
    masterNameEn: 'engines_name_en',
    masterNameCn: 'engines_name_cn',
    type: 'type_engines',
    typeNameEn: 'type_engine_name_en',
    typeNameCn: 'type_engine_name_cn'
  },
  'axle': {
    master: 'axels',
    masterNameEn: 'axel_name_en',
    masterNameCn: 'axel_name_cn',
    type: 'type_axels',
    typeNameEn: 'type_axel_name_en',
    typeNameCn: 'type_axel_name_cn'
  }
  // ... dan seterusnya
};
```

---

## 🎉 Keuntungan Perbaikan

### **1. Filter Master Catalog yang Akurat**
- Filter berdasarkan data yang sebenarnya tersimpan di database
- Konsisten dengan struktur data yang ada
- Memungkinkan filtering berdasarkan jenis katalog yang sebenarnya

### **2. Search yang Komprehensif**
- Mencari di semua tabel dan kolom yang relevan
- User bisa mencari berdasarkan nama master, type, atau item catalog
- Pencarian yang lebih akurat dan lengkap

### **3. Performance yang Optimal**
- Query yang efisien dengan JOIN yang tepat
- Index pada kolom `master_pdf.master_catalog` untuk performa yang baik
- Pagination yang tetap berfungsi dengan benar

### **4. Flexibility**
- Mendukung kombinasi filter dan search
- Backward compatible dengan API yang sudah ada
- Mudah untuk ditambahkan tabel atau kolom baru

---

## 📋 Checklist Implementasi

### **Filter Master Catalog**
- ✅ Menggunakan kolom `master_pdf.master_catalog`
- ✅ Query semua tabel dengan kondisi yang sama
- ✅ Menggabungkan hasil dari semua tabel
- ✅ Pagination tetap berfungsi

### **Enhanced Search**
- ✅ Search di `master_pdf.name_pdf`
- ✅ Search di item catalog tables
- ✅ Search di master tables (engines, axels, cabines, steerings, transmissions)
- ✅ Search di type tables (type_engines, type_axels, type_cabines, type_steerings, type_transmissions)
- ✅ Search di kolom English dan Chinese

### **Performance**
- ✅ Index pada `master_pdf.master_catalog`
- ✅ Query yang efisien dengan JOIN
- ✅ Count query yang optimal

---

## ✅ Status

- ✅ **Filter Master Catalog**: Implemented
- ✅ **Enhanced Search**: Implemented
- ✅ **New Functions**: Created
- ✅ **Linter**: No errors
- ✅ **Backward Compatibility**: Maintained

---

**Status**: ✅ **FILTER DAN SEARCH IMPROVEMENTS BERHASIL DIIMPLEMENTASI**

Sekarang API dapat memfilter berdasarkan `master_pdf.master_catalog` dan mencari di semua tabel dan kolom yang diminta! 🎉🔍
