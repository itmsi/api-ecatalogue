# Fix: Empty String untuk category_id dan catalog_parent_id

## ✅ Perubahan Validasi

Field `category_id` dan `catalog_parent_id` sekarang dapat dikosongkan (empty string) tanpa error validasi.

---

## 📝 File Yang Diubah:

### 1. **Validation** (`src/modules/catalog/validation.js`) ✅

**Perubahan:**
- Menggunakan `.optional({ values: 'falsy' })` untuk `category_id` dan `catalog_parent_id`
- Berlaku untuk: `createValidation`, `updateValidation`, `listValidation`

**Sebelum:**
```javascript
body('category_id')
  .optional()  // Empty string tetap akan di-validasi
  .isUUID()
  .withMessage('Format category_id tidak valid')
```

**Sesudah:**
```javascript
body('category_id')
  .optional({ values: 'falsy' })  // Empty string akan di-skip validasi
  .isUUID()
  .withMessage('Format category_id tidak valid')
```

**Penjelasan:**
- `optional()` → Validasi tetap berjalan jika ada nilai (termasuk empty string)
- `optional({ values: 'falsy' })` → Skip validasi jika nilai falsy (null, undefined, '', 0, false, NaN)

---

### 2. **Handler** (`src/modules/catalog/handler.js`) ✅

**Perubahan:**
- Menambahkan pengecekan `.trim() !== ''` sebelum menambahkan filter

**Sebelum:**
```javascript
const filters = {};
if (category_id) filters.category_id = category_id;
if (catalog_parent_id) filters.catalog_parent_id = catalog_parent_id;
if (search) filters.search = search;
```

**Sesudah:**
```javascript
const filters = {};
// Hanya tambahkan filter jika ada nilai dan bukan empty string
if (category_id && category_id.trim() !== '') filters.category_id = category_id;
if (catalog_parent_id && catalog_parent_id.trim() !== '') filters.catalog_parent_id = catalog_parent_id;
if (search && search.trim() !== '') filters.search = search;
```

**Penjelasan:**
- Empty string tidak akan ditambahkan ke filter
- Filter hanya ditambahkan jika ada nilai yang valid

---

### 3. **Schema** (`src/static/schema/catalog.js`) ✅

**Perubahan:**
- Menghapus `format: 'uuid'` dari schema
- Update description dan example

**Sebelum:**
```javascript
category_id: {
  type: 'string',
  format: 'uuid',
  description: 'Filter by category UUID',
  example: '123e4567-e89b-12d3-a456-426614174001'
}
```

**Sesudah:**
```javascript
category_id: {
  type: 'string',
  description: 'Filter by category UUID (kosongkan jika tidak ingin filter)',
  example: ''
}
```

---

## 🚀 Penggunaan

### Request dengan Empty String (✅ Valid)
```bash
curl -X POST http://localhost:9549/api/catalogs/catalogs/get \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
    "page": 1,
    "limit": 10,
    "category_id": "",
    "catalog_parent_id": "",
    "search": ""
  }'
```

**Result**: ✅ Berhasil - Akan menampilkan semua catalog tanpa filter

---

### Request dengan UUID (✅ Valid)
```bash
curl -X POST http://localhost:9549/api/catalogs/catalogs/get \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
    "page": 1,
    "limit": 10,
    "category_id": "f0b57258-5f33-4e03-81f7-cd70d833b5c5",
    "catalog_parent_id": "",
    "search": ""
  }'
```

**Result**: ✅ Berhasil - Akan menampilkan catalog dengan category_id tertentu

---

### Request tanpa Field (✅ Valid)
```bash
curl -X POST http://localhost:9549/api/catalogs/catalogs/get \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
    "page": 1,
    "limit": 10
  }'
```

**Result**: ✅ Berhasil - Akan menampilkan semua catalog tanpa filter

---

## 📊 Tabel Validasi

| Nilai | Validasi | Filter | Keterangan |
|-------|----------|--------|------------|
| `""` (empty string) | ✅ Skip | ❌ Tidak ditambahkan | Empty string diabaikan |
| `null` | ✅ Skip | ❌ Tidak ditambahkan | Null diabaikan |
| `undefined` | ✅ Skip | ❌ Tidak ditambahkan | Undefined diabaikan |
| `"f0b57258-..."` (UUID valid) | ✅ Pass | ✅ Ditambahkan | UUID valid digunakan |
| `"invalid-uuid"` | ❌ Fail | - | Error: Format tidak valid |

---

## 🔍 Contoh Response

### Request dengan Empty String:
```json
// Request
{
  "page": 1,
  "limit": 10,
  "category_id": "",
  "catalog_parent_id": "",
  "search": ""
}

// Response (200 OK)
{
  "success": true,
  "data": {
    "items": [
      {
        "catalog_id": "...",
        "catalog_name_en": "All Catalogs",
        // ... semua catalog tanpa filter
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

### Request dengan UUID:
```json
// Request
{
  "page": 1,
  "limit": 10,
  "category_id": "f0b57258-5f33-4e03-81f7-cd70d833b5c5",
  "catalog_parent_id": "",
  "search": ""
}

// Response (200 OK)
{
  "success": true,
  "data": {
    "items": [
      {
        "catalog_id": "...",
        "category_id": "f0b57258-5f33-4e03-81f7-cd70d833b5c5",
        "catalog_name_en": "Filtered Catalogs",
        // ... hanya catalog dengan category_id tersebut
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

---

## 🧪 Testing

### Test 1: Empty String
```bash
TOKEN="your-token-here"

curl -X POST http://localhost:9549/api/catalogs/catalogs/get \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"page":1,"limit":10,"category_id":"","catalog_parent_id":"","search":""}'
```
**Expected**: 200 OK, menampilkan semua catalog

### Test 2: Valid UUID
```bash
TOKEN="your-token-here"

curl -X POST http://localhost:9549/api/catalogs/catalogs/get \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"page":1,"limit":10,"category_id":"f0b57258-5f33-4e03-81f7-cd70d833b5c5"}'
```
**Expected**: 200 OK, menampilkan catalog terfilter

### Test 3: Invalid UUID
```bash
TOKEN="your-token-here"

curl -X POST http://localhost:9549/api/catalogs/catalogs/get \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"page":1,"limit":10,"category_id":"invalid-uuid"}'
```
**Expected**: 400 Bad Request, error validasi

---

## ✨ Keuntungan

✅ **Flexible Filtering** - User bisa kirim empty string tanpa error  
✅ **Clean API** - Tidak perlu menghapus field dari request  
✅ **Consistent** - Mengikuti pola yang sama di semua endpoint  
✅ **User Friendly** - Lebih mudah digunakan di frontend

---

## 📚 Dokumentasi Teknis

### express-validator: optional({ values: 'falsy' })

Menggunakan option `values: 'falsy'` akan skip validasi jika nilai adalah:
- `null`
- `undefined`
- `""` (empty string)
- `0`
- `false`
- `NaN`

Referensi: https://express-validator.github.io/docs/api/validation-chain/#optionaloptions

---

## ✅ Status

- ✅ **Validation**: Updated dengan `optional({ values: 'falsy' })`
- ✅ **Handler**: Tambah pengecekan empty string
- ✅ **Schema**: Update description dan example
- ✅ **Linter**: No errors
- ✅ **Module Loading**: Success
- ✅ **Testing**: Empty string diterima tanpa error

---

**Status**: ✅ **EMPTY STRING SUPPORT BERHASIL DITAMBAHKAN**

Field `category_id` dan `catalog_parent_id` sekarang dapat dikosongkan! 🎉

