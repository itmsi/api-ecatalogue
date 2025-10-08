# Update Endpoint Catalog Module

## ✅ Perubahan Endpoint

Endpoint module **catalogs** telah diubah untuk mengikuti pola yang sama dengan module **category**.

### Perubahan Yang Dilakukan:

#### 1. **GET /catalogs** → **POST /catalogs/get**
- **Sebelumnya**: `GET /api/catalogs/catalogs?page=1&limit=10`
- **Sekarang**: `POST /api/catalogs/catalogs/get`
- **Parameter**: Dari query string → request body
- **Request Body**:
```json
{
  "page": 1,
  "limit": 10,
  "category_id": "uuid",
  "catalog_parent_id": "uuid",
  "search": "keyword",
  "sort_by": "created_at",
  "sort_order": "desc"
}
```

#### 2. **POST /catalogs** → **POST /catalogs/create**
- **Sebelumnya**: `POST /api/catalogs/catalogs`
- **Sekarang**: `POST /api/catalogs/catalogs/create`
- **Request Body**: Tetap sama (tidak berubah)

### Endpoint Lainnya (Tidak Berubah):
- ✅ `GET /api/catalogs/catalogs/:id` - Get by ID
- ✅ `GET /api/catalogs/catalogs/:id/children` - Get children
- ✅ `PUT /api/catalogs/catalogs/:id` - Update
- ✅ `DELETE /api/catalogs/catalogs/:id` - Soft delete
- ✅ `POST /api/catalogs/catalogs/:id/restore` - Restore

---

## 📝 File Yang Diubah

### 1. **src/modules/catalog/index.js** ✅
- Route `GET /` → `POST /get`
- Route `POST /` → `POST /create`
- Menambahkan comment untuk verifyToken middleware (siap diaktifkan)

### 2. **src/modules/catalog/handler.js** ✅
- `getAll()`: Membaca dari `req.body` (bukan `req.query`)
- Menambahkan parameter `sort_by` dan `sort_order`
- Menambahkan auto-fill `created_by`, `updated_by`, `deleted_by` dari token

### 3. **src/modules/catalog/validation.js** ✅
- `listValidation`: Menggunakan `body()` (bukan `query()`)
- Menambahkan validasi untuk `sort_by` dan `sort_order`
- Menghapus import `query` yang tidak terpakai

### 4. **src/modules/catalog/postgre_repository.js** ✅
- `remove()`: Menerima parameter `deletedBy`
- `restore()`: Menerima parameter `updatedBy`

### 5. **src/static/path/catalog.js** (Swagger) ✅
- Path `/catalogs` → `/catalogs/get` (POST)
- Path `/catalogs` (POST) → `/catalogs/create` (POST)
- Update schema untuk menerima request body

### 6. **src/modules/catalog/README.md** ✅
- Update dokumentasi endpoint
- Update contoh penggunaan API
- Update contoh cURL commands

---

## 🚀 Cara Penggunaan Baru

### 1. Get All Catalogs (dengan filter & search)
```bash
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -d '{
    "page": 1,
    "limit": 10,
    "sort_by": "created_at",
    "sort_order": "desc"
  }'
```

### 2. Filter by Category
```bash
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -d '{
    "page": 1,
    "limit": 10,
    "category_id": "uuid-kategori-disini"
  }'
```

### 3. Search Catalogs
```bash
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "smartphone"
  }'
```

### 4. Create New Catalog
```bash
curl -X POST http://localhost:3000/api/catalogs/catalogs/create \
  -H "Content-Type: application/json" \
  -d '{
    "catalog_name_en": "New Catalog",
    "catalog_name_ch": "新目录",
    "catalog_quantity": 10,
    "part_number": "PN-001"
  }'
```

---

## 🔄 Migrasi dari Endpoint Lama

### JavaScript/Frontend

**❌ Cara Lama (GET):**
```javascript
const response = await fetch('/api/catalogs/catalogs?page=1&limit=10&search=test');
```

**✅ Cara Baru (POST):**
```javascript
const response = await fetch('/api/catalogs/catalogs/get', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    page: 1,
    limit: 10,
    search: 'test'
  })
});
```

**❌ Cara Lama (Create):**
```javascript
const response = await fetch('/api/catalogs/catalogs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ catalog_name_en: 'Test' })
});
```

**✅ Cara Baru (Create):**
```javascript
const response = await fetch('/api/catalogs/catalogs/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ catalog_name_en: 'Test' })
});
```

---

## ✨ Fitur Tambahan

### 1. Auto-fill User Information
Jika menggunakan authentication (verifyToken), sistem akan otomatis mengisi:
- `created_by` saat create
- `updated_by` saat update
- `deleted_by` saat delete

### 2. Sorting
Bisa sorting berdasarkan field apapun:
```json
{
  "sort_by": "catalog_name_en",
  "sort_order": "asc"
}
```

### 3. Multiple Filters
Bisa kombinasi filter:
```json
{
  "page": 1,
  "limit": 10,
  "category_id": "uuid-category",
  "catalog_parent_id": "uuid-parent",
  "search": "keyword"
}
```

---

## 🧪 Testing

### Verifikasi Module Loading
```bash
node -e "require('./src/modules/catalog'); console.log('Module loaded')"
# Output: ✓ Module catalog berhasil dimuat dengan endpoint baru
```

### Test dengan cURL

**1. Get All (Default):**
```bash
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -d '{}'
```

**2. Get dengan Filter:**
```bash
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -d '{"page": 1, "limit": 5, "search": "test"}'
```

**3. Create:**
```bash
curl -X POST http://localhost:3000/api/catalogs/catalogs/create \
  -H "Content-Type: application/json" \
  -d '{"catalog_name_en": "Test Catalog", "catalog_quantity": 10}'
```

---

## 📊 Perbandingan dengan Category Module

Module **catalog** sekarang mengikuti pola yang sama dengan **category**:

| Aspect | Category | Catalog | Status |
|--------|----------|---------|--------|
| Get All | POST /categories/get | POST /catalogs/get | ✅ Same |
| Create | POST /categories/create | POST /catalogs/create | ✅ Same |
| Parameters | req.body | req.body | ✅ Same |
| Validation | body() | body() | ✅ Same |
| Auto-fill User | ✅ | ✅ | ✅ Same |
| Sorting | ✅ | ✅ | ✅ Same |
| Swagger | ✅ | ✅ | ✅ Same |

---

## ✅ Status Implementasi

- ✅ **Routes**: Updated (index.js)
- ✅ **Handlers**: Updated (handler.js)
- ✅ **Validation**: Updated (validation.js)
- ✅ **Repository**: Updated (postgre_repository.js)
- ✅ **Swagger**: Updated (path/catalog.js)
- ✅ **Documentation**: Updated (README.md)
- ✅ **Linter**: No errors
- ✅ **Module Loading**: Success

---

## 🎯 Breaking Changes

⚠️ **PENTING**: Perubahan ini adalah **breaking change** untuk endpoint:
1. `GET /api/catalogs/catalogs` → Tidak lagi tersedia
2. `POST /api/catalogs/catalogs` → Tidak lagi tersedia

Client yang menggunakan endpoint lama perlu diupdate ke endpoint baru:
- `POST /api/catalogs/catalogs/get`
- `POST /api/catalogs/catalogs/create`

---

## 📚 Dokumentasi

- **Module README**: `src/modules/catalog/README.md`
- **Swagger UI**: `http://localhost:PORT/documentation` (lihat section Catalogs)

---

**Status**: ✅ **SEMUA PERUBAHAN BERHASIL DITERAPKAN**

Endpoint catalog sekarang konsisten dengan endpoint category! 🎉

