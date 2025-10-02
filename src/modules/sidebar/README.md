# Sidebar Module

Module untuk menampilkan data catalog dalam struktur hierarkis (tree structure) yang dapat digunakan sebagai sidebar navigation.

## Endpoint

### POST /api/catalogs/sidebars/get

Mengambil data catalog dengan struktur hierarkis berdasarkan parent-child relationship.

**Authentication:** Required (Bearer Token)

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "",
  "sort_by": "created_at",
  "sort_order": "desc",
  "vin_number": "string (nullable)"
}
```

**Response:**
```json
{
  "success": true,
  "data": [...], // Array of sidebar items with children
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Fitur

1. **Struktur Hierarkis**: Menampilkan catalog dalam format tree dengan parent-child relationship
2. **Filter**: Mendukung pencarian dan filter berdasarkan VIN number
3. **Paginating**: Menggunakan pagination untuk performa yang lebih baik
4. **Sorting**: Mendukung sorting berdasarkan berbagai field
5. **Recursive Children**: Menampilkan children hingga 3 level untuk mencegah infinite loop

## Struktur Data

Setiap item sidebar memiliki struktur:
- `id`: catalog_id
- `masterId`: catalog_parent_id
- `partNumber`: null (untuk kompatibilitas dengan format yang diminta)
- `partName`: gabungan nama English dan Chinese
- `children`: array dari child catalog items (recursive)

## Filter yang Didukung

- **search**: Mencari berdasarkan nama catalog, deskripsi, atau nama kategori
- **vin_number**: Filter berdasarkan VIN number dari tabel productions
- **sort_by**: Field untuk sorting (created_at, updated_at, catalog_name_en, category_name_en)
- **sort_order**: Urutan sorting (asc, desc)

## Join Tables

Module ini melakukan join ke beberapa tabel:
- `catalogs` (main table)
- `categories` (untuk nama kategori)
- `productions` (untuk informasi produksi dan VIN number)
