# Update Swagger Schema - Catalog Module

## ✅ Request Body Schema Ditambahkan

Schema untuk request body telah ditambahkan ke `src/static/schema/catalog.js` agar lebih rapi dan reusable.

---

## 📝 Perubahan Yang Dilakukan

### 1. **Schema Baru: CatalogGetInput**

Ditambahkan schema baru untuk request body endpoint `POST /catalogs/get`:

**File**: `src/static/schema/catalog.js`

```javascript
CatalogGetInput: {
  type: 'object',
  properties: {
    page: {
      type: 'integer',
      minimum: 1,
      default: 1,
      description: 'Page number',
      example: 1
    },
    limit: {
      type: 'integer',
      minimum: 1,
      maximum: 100,
      default: 10,
      description: 'Items per page (max 100)',
      example: 10
    },
    category_id: {
      type: 'string',
      format: 'uuid',
      description: 'Filter by category UUID',
      example: '123e4567-e89b-12d3-a456-426614174001'
    },
    catalog_parent_id: {
      type: 'string',
      format: 'uuid',
      description: 'Filter by parent catalog UUID',
      example: '123e4567-e89b-12d3-a456-426614174002'
    },
    search: {
      type: 'string',
      default: '',
      description: 'Search keyword (catalog names, part number, target ID)',
      example: 'smartphone'
    },
    sort_by: {
      type: 'string',
      default: 'created_at',
      description: 'Field to sort by',
      example: 'created_at'
    },
    sort_order: {
      type: 'string',
      enum: ['asc', 'desc'],
      default: 'desc',
      description: 'Sort order',
      example: 'desc'
    }
  }
}
```

### 2. **Update Swagger Path**

Path `/catalogs/get` sekarang menggunakan schema reference:

**Sebelum** (Inline Schema):
```javascript
'/catalogs/get': {
  post: {
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              page: { type: 'integer', ... },
              limit: { type: 'integer', ... },
              // ... banyak properties inline
            }
          }
        }
      }
    }
  }
}
```

**Sesudah** (Schema Reference):
```javascript
'/catalogs/get': {
  post: {
    requestBody: {
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CatalogGetInput' }
        }
      }
    }
  }
}
```

---

## 📊 Daftar Schema Catalog

Sekarang module catalog memiliki **3 schemas**:

| Schema | Deskripsi | Digunakan Di |
|--------|-----------|--------------|
| `Catalog` | Model data catalog lengkap | Response semua endpoint |
| `CatalogInput` | Input untuk create/update | POST /create, PUT /:id |
| `CatalogGetInput` | Input untuk get list | POST /get |

---

## ✨ Keuntungan Menggunakan Schema Reference

### 1. **Reusability**
Schema dapat digunakan di multiple endpoints tanpa duplikasi.

### 2. **Maintainability**
Perubahan schema cukup dilakukan di satu tempat.

### 3. **Consistency**
Memastikan format request/response konsisten di semua endpoint.

### 4. **Documentation**
Swagger UI otomatis menampilkan schema dengan lebih rapi.

### 5. **Type Safety**
Memudahkan validasi dan type checking di frontend.

---

## 🎯 Struktur File

```
src/static/
├── schema/
│   ├── catalog.js          ✅ 3 schemas
│   │   ├── Catalog
│   │   ├── CatalogInput
│   │   └── CatalogGetInput
│   ├── category.js         (similar structure)
│   └── example.js
└── path/
    ├── catalog.js          ✅ Reference ke schemas
    ├── category.js
    └── example.js
```

---

## 🚀 Penggunaan di Swagger UI

### 1. **Tampilan Schema**
Di Swagger UI, section **Schemas** akan menampilkan:
- `Catalog` - Model lengkap
- `CatalogInput` - Create/Update input
- `CatalogGetInput` - List/Filter input

### 2. **Try It Out**
Saat menggunakan "Try it out", Swagger UI akan:
- Auto-populate dengan nilai example
- Validasi berdasarkan type dan constraints
- Tampilkan description untuk setiap field

### 3. **Example Value**
```json
{
  "page": 1,
  "limit": 10,
  "category_id": "123e4567-e89b-12d3-a456-426614174001",
  "catalog_parent_id": "123e4567-e89b-12d3-a456-426614174002",
  "search": "smartphone",
  "sort_by": "created_at",
  "sort_order": "desc"
}
```

---

## 📝 Validasi Request Body

Schema mendefinisikan validation rules:

| Field | Type | Required | Constraint |
|-------|------|----------|------------|
| page | integer | Optional | min: 1, default: 1 |
| limit | integer | Optional | min: 1, max: 100, default: 10 |
| category_id | string (uuid) | Optional | Format UUID |
| catalog_parent_id | string (uuid) | Optional | Format UUID |
| search | string | Optional | default: '' |
| sort_by | string | Optional | default: 'created_at' |
| sort_order | string | Optional | enum: ['asc', 'desc'], default: 'desc' |

---

## 🔄 Konsistensi dengan Category

Module catalog sekarang mengikuti pola yang sama dengan category:

**Category:**
```javascript
// Schema
CategoryGetInput: { ... }

// Path
requestBody: {
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/CategoryGetInput' }
    }
  }
}
```

**Catalog:**
```javascript
// Schema
CatalogGetInput: { ... }

// Path
requestBody: {
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/CatalogGetInput' }
    }
  }
}
```

---

## 🧪 Testing

### Verifikasi Schema
```bash
node -e "const schema = require('./src/static/schema/catalog'); \
console.log('Schemas:', Object.keys(schema)); \
console.log('CatalogGetInput fields:', Object.keys(schema.CatalogGetInput.properties));"
```

**Output:**
```
Schemas: [ 'Catalog', 'CatalogInput', 'CatalogGetInput' ]
CatalogGetInput fields: [ 'page', 'limit', 'category_id', 'catalog_parent_id', 'search', 'sort_by', 'sort_order' ]
```

### Verifikasi Swagger
```bash
node -e "const swagger = require('./src/static'); \
console.log('Total schemas:', Object.keys(swagger.index.components.schemas).length); \
console.log('Total paths:', Object.keys(swagger.index.paths).length);"
```

**Output:**
```
Total schemas: 12
Total paths: 9
```

---

## 📚 Dokumentasi API

### Endpoint: POST /catalogs/get

**Request Body Schema:** `CatalogGetInput`

Semua field bersifat **optional**. Jika tidak dikirim, akan menggunakan nilai default.

**Minimal Request:**
```json
{}
```
Akan menggunakan:
- page: 1
- limit: 10
- sort_by: created_at
- sort_order: desc

**Full Request:**
```json
{
  "page": 2,
  "limit": 20,
  "category_id": "uuid-here",
  "catalog_parent_id": "uuid-here",
  "search": "keyword",
  "sort_by": "catalog_name_en",
  "sort_order": "asc"
}
```

---

## ✅ Status

- ✅ **Schema CatalogGetInput**: Created
- ✅ **Path Reference**: Updated
- ✅ **Linter**: No errors
- ✅ **Module Loading**: Success
- ✅ **Swagger Loading**: Success
- ✅ **Total Schemas**: 12 (global)
- ✅ **Catalog Schemas**: 3

---

**Status**: ✅ **SCHEMA REQUEST BODY BERHASIL DITAMBAHKAN**

Swagger documentation sekarang lebih rapi dan maintainable! 📚✨

