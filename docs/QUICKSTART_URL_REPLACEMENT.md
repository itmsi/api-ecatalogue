# Quick Start: S3 Base URL Replacement

Panduan cepat untuk mengimplementasikan fitur replacement base URL MinIO.

## 1. Konfigurasi Environment

Tambahkan ke file `.env`:

```env
S3_BASE_URL=https://minio-bucket.motorsights.com
```

## 2. Restart Aplikasi

```bash
npm restart
# atau
pm2 restart your-app
```

## 3. Test Upload File

Upload file melalui API dan periksa URL yang dihasilkan:

**Sebelum:**
```
http://127.0.0.1:9508/msi-e-catalogue/catalog-images/file.jpg
```

**Sesudah:**
```
https://minio-bucket.motorsights.com/msi-e-catalogue/catalog-images/file.jpg
```

## 4. Migrate URL yang Sudah Ada

Jalankan script migration untuk URL yang sudah ada di database:

```bash
node src/scripts/migrate-urls.js
```

## 5. Gunakan Middleware (Opsional)

Untuk otomatis replace URL di response API:

```javascript
const { urlReplacerMiddleware } = require('./middlewares');

// Di app.js atau route file
app.use(urlReplacerMiddleware);
```

## 6. Verifikasi

1. Upload file baru - URL otomatis menggunakan S3_BASE_URL
2. Response API - URL otomatis diganti (jika middleware aktif)
3. Database - URL lama sudah dimigrasi ke URL baru

## Troubleshooting

- **URL tidak berubah**: Pastikan S3_BASE_URL sudah dikonfigurasi dan aplikasi sudah di-restart
- **Error migration**: Backup database dulu, periksa koneksi database
- **Middleware tidak bekerja**: Pastikan middleware di-register sebelum response dikirim

## File yang Dimodifikasi

- `src/config/minio.js` - Fungsi URL replacement
- `src/utils/url-replacer.js` - Utility functions
- `src/middlewares/url-replacer.js` - Middleware untuk response
- `src/scripts/migrate-urls.js` - Script migration
- `environment.example` - Template konfigurasi

## Dokumentasi Lengkap

Lihat `docs/S3_BASE_URL_REPLACEMENT.md` untuk dokumentasi lengkap.
