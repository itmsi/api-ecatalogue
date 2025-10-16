# S3 Base URL Replacement

Dokumentasi ini menjelaskan fitur replacement base URL untuk MinIO/S3 yang memungkinkan mengganti base URL dari file yang diupload.

## Konfigurasi

### Environment Variables

Tambahkan konfigurasi berikut ke file `.env`:

```env
# Base URL yang akan digunakan untuk mengganti URL asli
S3_BASE_URL=https://minio-bucket.motorsights.com
```

### Contoh Konfigurasi Lengkap

```env
# MinIO Configuration
S3_PROVIDER=minio
S3_REGION=us-east-1
S3_BUCKET=msi-e-catalogue
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_ENDPOINT=http://127.0.0.1:9508
S3_BASE_URL=https://minio-bucket.motorsights.com
S3_FORCE_PATH_STYLE=true
S3_SSL_ENABLED=false
S3_SIGNATURE_VERSION=v4
```

## Cara Kerja

### 1. Upload File Baru

Ketika file diupload melalui MinIO, sistem akan:

1. Upload file ke MinIO server menggunakan `S3_ENDPOINT`
2. Generate URL menggunakan `S3_ENDPOINT` 
3. Jika `S3_BASE_URL` dikonfigurasi, URL akan diganti dengan base URL baru
4. URL yang sudah diganti akan disimpan ke database

**Contoh:**
- URL asli: `http://127.0.0.1:9508/msi-e-catalogue/catalog-images/file.jpg`
- URL setelah replacement: `https://minio-bucket.motorsights.com/msi-e-catalogue/catalog-images/file.jpg`

### 2. Response API

Middleware `urlReplacerMiddleware` akan otomatis mengganti URL di response API jika `S3_BASE_URL` dikonfigurasi.

### 3. URL yang Sudah Ada di Database

Untuk URL yang sudah ada di database, gunakan script migration:

```bash
node src/scripts/migrate-urls.js
```

## Penggunaan

### 1. Middleware Otomatis

Middleware akan otomatis mengganti URL di semua response API:

```javascript
const { urlReplacerMiddleware } = require('./middlewares');

// Gunakan di route atau app level
app.use(urlReplacerMiddleware);
```

### 2. Middleware dengan Field Spesifik

Jika ingin mengganti URL hanya di field tertentu:

```javascript
const { urlReplacerMiddlewareWithFields } = require('./middlewares');

// Hanya ganti URL di field 'image_url' dan 'file_url'
app.use(urlReplacerMiddlewareWithFields(['image_url', 'file_url']));
```

### 3. Manual URL Replacement

```javascript
const { replaceExistingUrl } = require('./utils/url-replacer');

const originalUrl = 'http://127.0.0.1:9508/msi-e-catalogue/file.jpg';
const newUrl = replaceExistingUrl(originalUrl);
console.log(newUrl); // https://minio-bucket.motorsights.com/msi-e-catalogue/file.jpg
```

### 4. Batch URL Replacement

```javascript
const { replaceMultipleUrls } = require('./utils/url-replacer');

const urls = [
  'http://127.0.0.1:9508/msi-e-catalogue/file1.jpg',
  'http://127.0.0.1:9508/msi-e-catalogue/file2.jpg'
];
const newUrls = replaceMultipleUrls(urls);
```

### 5. Object URL Replacement

```javascript
const { replaceUrlsInObject } = require('./utils/url-replacer');

const data = {
  id: 1,
  name: 'Product',
  image_url: 'http://127.0.0.1:9508/msi-e-catalogue/image.jpg',
  file_url: 'http://127.0.0.1:9508/msi-e-catalogue/file.pdf'
};

const processedData = replaceUrlsInObject(data, ['image_url', 'file_url']);
```

## Migration Script

### Menjalankan Migration

```bash
# Jalankan migration untuk semua tabel
node src/scripts/migrate-urls.js
```

### Tabel yang Akan Dimigrasi

Script akan memproses tabel-tabel berikut:

- `catalogs` - field `catalog_image_url`
- `item_catalog_engines` - field `file_foto_url`
- `item_catalog_cabines` - field `file_foto_url`
- `item_catalog_transmissions` - field `file_foto_url`
- `item_catalog_axles` - field `file_foto_url`
- `item_catalog_steerings` - field `file_foto_url`

### Menambah Tabel Baru

Untuk menambah tabel baru ke migration script, edit file `src/scripts/migrate-urls.js`:

```javascript
const tables = [
  // ... existing tables
  {
    table: 'new_table_name',
    urlFields: ['url_field1', 'url_field2']
  }
];
```

## Troubleshooting

### 1. URL Tidak Terganti

- Pastikan `S3_BASE_URL` sudah dikonfigurasi di `.env`
- Restart aplikasi setelah mengubah konfigurasi
- Periksa log untuk melihat proses URL replacement

### 2. Error saat Migration

- Pastikan database connection berfungsi
- Periksa apakah tabel dan field yang dimigrasi ada
- Backup database sebelum menjalankan migration

### 3. Middleware Tidak Berfungsi

- Pastikan middleware sudah di-register di aplikasi
- Periksa urutan middleware (harus sebelum response dikirim)
- Periksa log untuk error messages

## Log dan Debug

Sistem akan mencatat proses URL replacement di log:

```
URL replacement: {
  original: 'http://127.0.0.1:9508/msi-e-catalogue/file.jpg',
  new: 'https://minio-bucket.motorsights.com/msi-e-catalogue/file.jpg',
  baseUrl: 'https://minio-bucket.motorsights.com'
}
```

## Keamanan

- Pastikan `S3_BASE_URL` menggunakan HTTPS untuk production
- Validasi URL sebelum melakukan replacement
- Backup database sebelum menjalankan migration script
