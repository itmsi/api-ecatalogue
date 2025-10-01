# Update Authentication - Catalog Module

## ✅ Bearer Token Authentication Diaktifkan

Module **catalogs** sekarang dilindungi dengan **Bearer Token Authentication** mengikuti pola yang sama dengan module **category**.

---

## 📝 Perubahan Yang Dilakukan

### 1. **Routes** (`src/modules/catalog/index.js`)
✅ Mengaktifkan middleware `verifyToken` di semua endpoint
✅ Mengubah access dari "Public" → "Protected"

**Sebelum:**
```javascript
// const { verifyToken } = require('../../middlewares/token');
router.post('/get', /* verifyToken, */ listValidation, validateMiddleware, handler.getAll);
```

**Sesudah:**
```javascript
const { verifyToken } = require('../../middlewares/token');
router.post('/get', verifyToken, listValidation, validateMiddleware, handler.getAll);
```

### 2. **Swagger** (`src/static/path/catalog.js`)
✅ Menambahkan `security: [{ bearerAuth: [] }]` di semua endpoint
✅ Menambahkan response `401 Unauthorized` di semua endpoint

**Sebelum:**
```javascript
'/catalogs/get': {
  post: {
    tags: ['Catalogs'],
    summary: 'Get all catalogs',
    // Tidak ada security
    requestBody: { ... }
  }
}
```

**Sesudah:**
```javascript
'/catalogs/get': {
  post: {
    tags: ['Catalogs'],
    summary: 'Get all catalogs',
    security: [{ bearerAuth: [] }],  // ✅ Ditambahkan
    requestBody: { ... },
    responses: {
      200: { ... },
      401: {  // ✅ Ditambahkan
        description: 'Unauthorized - Invalid or missing token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  }
}
```

---

## 🔐 Endpoint Yang Dilindungi

Semua endpoint catalog sekarang memerlukan **Bearer Token**:

| Endpoint | Method | Access |
|----------|--------|--------|
| `/catalogs/get` | POST | 🔒 Protected |
| `/catalogs/create` | POST | 🔒 Protected |
| `/catalogs/:id` | GET | 🔒 Protected |
| `/catalogs/:id/children` | GET | 🔒 Protected |
| `/catalogs/:id` | PUT | 🔒 Protected |
| `/catalogs/:id` | DELETE | 🔒 Protected |
| `/catalogs/:id/restore` | POST | 🔒 Protected |

---

## 🚀 Cara Menggunakan API dengan Token

### 1. Mendapatkan Token
Pertama, login untuk mendapatkan access token:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
}
```

### 2. Menggunakan Token di Request

**✅ cURL:**
```bash
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "page": 1,
    "limit": 10
  }'
```

**✅ JavaScript (Fetch):**
```javascript
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

const response = await fetch('/api/catalogs/catalogs/get', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    page: 1,
    limit: 10
  })
});

const data = await response.json();
```

**✅ Axios:**
```javascript
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

const response = await axios.post('/api/catalogs/catalogs/get', 
  {
    page: 1,
    limit: 10
  },
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);
```

**✅ Postman:**
1. Pilih tab **Authorization**
2. Type: **Bearer Token**
3. Token: Paste token Anda
4. Kirim request

---

## 🔍 Response Codes

### Success Responses
- **200 OK**: Request berhasil
- **201 Created**: Resource berhasil dibuat

### Error Responses

#### 401 Unauthorized
Token tidak valid atau tidak ada:
```json
{
  "success": false,
  "error": "Unauthorized - Invalid or missing token",
  "details": null
}
```

**Penyebab:**
- Token tidak dikirim di header
- Token expired
- Token tidak valid
- Token format salah

**Solusi:**
- Login ulang untuk mendapatkan token baru
- Pastikan format header: `Authorization: Bearer <token>`

#### 400 Bad Request
Validation error:
```json
{
  "success": false,
  "error": "Validation error",
  "details": {
    "errors": [
      {
        "field": "page",
        "message": "Page harus berupa angka positif"
      }
    ]
  }
}
```

#### 404 Not Found
Resource tidak ditemukan:
```json
{
  "success": false,
  "error": "Data katalog tidak ditemukan",
  "details": null
}
```

---

## 🧪 Testing dengan Bearer Token

### Test Get All Catalogs
```bash
TOKEN="your-token-here"

curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "page": 1,
    "limit": 10
  }'
```

### Test Create Catalog
```bash
TOKEN="your-token-here"

curl -X POST http://localhost:3000/api/catalogs/catalogs/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "catalog_name_en": "New Catalog",
    "catalog_name_ch": "新目录",
    "catalog_quantity": 10
  }'
```

### Test Update Catalog
```bash
TOKEN="your-token-here"
CATALOG_ID="uuid-catalog-disini"

curl -X PUT http://localhost:3000/api/catalogs/catalogs/$CATALOG_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "catalog_quantity": 20
  }'
```

### Test Delete Catalog
```bash
TOKEN="your-token-here"
CATALOG_ID="uuid-catalog-disini"

curl -X DELETE http://localhost:3000/api/catalogs/catalogs/$CATALOG_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📱 Swagger UI Testing

### Cara Menggunakan Swagger dengan Token:

1. **Buka Swagger UI**
   ```
   http://localhost:PORT/documentation
   ```

2. **Klik tombol "Authorize" 🔓** (di kanan atas)

3. **Masukkan Token**
   - Pilih `bearerAuth`
   - Format: Cukup paste token saja (tanpa "Bearer ")
   - Contoh: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Klik **Authorize**

4. **Test Endpoint**
   - Sekarang semua request akan otomatis menyertakan token
   - Coba endpoint di section **Catalogs**
   - Klik **Try it out**
   - Isi body request
   - Klik **Execute**

5. **Status**
   - 🔒 Locked icon = Token sudah di-set
   - 🔓 Unlocked icon = Belum login

---

## ⚙️ Auto-fill User Information

Dengan authentication aktif, sistem akan otomatis mengisi field audit:

### Saat **Create**:
```javascript
// User tidak perlu kirim created_by
{
  "catalog_name_en": "Test Catalog"
}

// Sistem otomatis tambahkan dari token:
{
  "catalog_name_en": "Test Catalog",
  "created_by": "uuid-dari-token"  // ✅ Auto-fill
}
```

### Saat **Update**:
```javascript
// Sistem otomatis tambahkan:
{
  "updated_by": "uuid-dari-token"  // ✅ Auto-fill
}
```

### Saat **Delete**:
```javascript
// Sistem otomatis tambahkan:
{
  "deleted_at": "2025-01-01T10:00:00.000Z",
  "deleted_by": "uuid-dari-token"  // ✅ Auto-fill
}
```

### Saat **Restore**:
```javascript
// Sistem otomatis tambahkan:
{
  "deleted_at": null,
  "deleted_by": null,
  "updated_by": "uuid-dari-token"  // ✅ Auto-fill
}
```

Field yang di-auto-fill diambil dari token JWT:
- `req.user.employee_id` atau
- `req.user.user_id`

---

## 📊 Perbandingan: Sebelum vs Sesudah

### Request Sebelumnya (Tanpa Token) ❌
```bash
# Dulu bisa langsung akses tanpa token
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -d '{"page": 1}'

# Response: 200 OK ✅
```

### Request Sekarang (Dengan Token) ✅
```bash
# Tanpa token = ERROR
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -d '{"page": 1}'

# Response: 401 Unauthorized ❌

# Dengan token = SUCCESS
curl -X POST http://localhost:3000/api/catalogs/catalogs/get \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"page": 1}'

# Response: 200 OK ✅
```

---

## 🔧 Token Middleware (`verifyToken`)

Middleware `verifyToken` melakukan:
1. ✅ Ekstrak token dari header `Authorization: Bearer <token>`
2. ✅ Verify token signature dengan secret key
3. ✅ Check token expiration
4. ✅ Decode user info dari token
5. ✅ Set `req.user` dengan user data
6. ✅ Lanjutkan ke handler jika valid
7. ❌ Return 401 jika invalid/expired/missing

---

## 🎯 Breaking Changes

⚠️ **PENTING**: Perubahan ini adalah **breaking change**!

**Client yang sudah ada harus diupdate untuk:**
1. ✅ Login terlebih dahulu untuk mendapatkan token
2. ✅ Menyertakan header `Authorization: Bearer <token>` di setiap request
3. ✅ Handle response 401 (token expired/invalid)
4. ✅ Implement token refresh mechanism (jika ada)

**Endpoint yang terpengaruh:**
- Semua endpoint `/api/catalogs/catalogs/*`

---

## 📚 Dokumentasi Tambahan

### Files Yang Diubah:
1. ✅ `src/modules/catalog/index.js` - Routes dengan verifyToken
2. ✅ `src/static/path/catalog.js` - Swagger dengan security schema

### Security Schema:
Bearer token sudah terdaftar di `src/static/index.js`:
```javascript
components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
}
```

---

## ✅ Status

- ✅ **verifyToken Middleware**: Aktif di semua endpoint
- ✅ **Swagger Security**: Configured dengan bearerAuth
- ✅ **401 Response**: Ditambahkan di semua endpoints
- ✅ **Auto-fill User**: Diaktifkan untuk created_by, updated_by, deleted_by
- ✅ **Linter**: No errors
- ✅ **Module Loading**: Success

---

**Status**: ✅ **AUTHENTICATION BERHASIL DIAKTIFKAN**

Semua endpoint catalog sekarang dilindungi dengan Bearer Token Authentication! 🔐🎉

