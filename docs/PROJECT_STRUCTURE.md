# Project Structure

Dokumentasi ini menjelaskan struktur folder dan file dalam proyek API eCatalogue.

## 📁 Root Directory Structure

```
api-ecatalogue/
├── 📁 docs/                    # Dokumentasi proyek
├── 📁 scripts/                 # Script deployment dan automation
├── 📁 templates/               # Template CSV untuk upload data
├── 📁 src/                     # Source code aplikasi
├── 📁 test/                    # File testing
├── 📁 docker/                  # Konfigurasi Docker
├── 📁 logs/                    # Log files
├── 📁 uploads/                 # File upload temporary
├── 📁 static/                  # Static assets (fonts)
├── 📁 public/                  # Public assets
├── 📄 package.json             # Dependencies dan scripts
├── 📄 docker-compose.yml       # Docker compose configuration
├── 📄 README.md                # Dokumentasi utama proyek
├── 📄 CHANGELOG.md             # History perubahan
├── 📄 CONTRIBUTING.md          # Panduan kontribusi
├── 📄 LICENSE                  # Lisensi proyek
├── 📄 Jenkinsfile              # CI/CD pipeline
└── 📄 bitbucket-pipelines.yml  # Bitbucket pipeline
```

## 📁 Folder Details

### 📁 docs/
Berisi semua dokumentasi proyek:
- `README.md` - Dokumentasi utama
- `PROJECT_STRUCTURE.md` - Struktur proyek (file ini)
- `UPDATE_FIX_DOCUMENTATION.md` - Dokumentasi perbaikan update
- `CURL_EXAMPLES_*.md` - Contoh penggunaan API
- `QUICKSTART.md` - Panduan quick start
- Dan dokumentasi lainnya...

### 📁 scripts/
Berisi script automation dan deployment:
- `deploy-server.sh` - Script deployment server
- `setup-server.sh` - Script setup server  
- `setup-server-dirs.sh` - Script pembuatan direktori server
- `run_migration.js` - Script database migration
- `README.md` - Dokumentasi penggunaan scripts

### 📁 templates/
Berisi template CSV untuk upload data:
- `item_catalog_axle_template.csv` - Template axle catalog
- `item_catalog_engine_template.csv` - Template engine catalog
- `item_catalog_transmission_template.csv` - Template transmission catalog
- `test_catalog_items.csv` - File test catalog
- `README.md` - Dokumentasi penggunaan template

### 📁 src/
Source code utama aplikasi:
```
src/
├── 📁 config/           # Konfigurasi aplikasi
├── 📁 modules/          # Module-module API
├── 📁 repository/       # Database repository
├── 📁 routes/           # API routes
├── 📁 middlewares/      # Custom middlewares
├── 📁 utils/            # Utility functions
├── 📁 static/           # Static API definitions
├── 📁 templates/        # Email templates
├── 📁 views/            # View templates
├── 📁 listeners/        # Event listeners
├── 📁 scripts/          # Internal scripts
├── 📁 debug/            # Debug utilities
├── 📁 job/              # Background jobs
├── 📁 lang/             # Internationalization
├── 📄 app.js            # Main application file
├── 📄 server.js         # Server entry point
└── 📄 knexfile.js       # Database configuration
```

### 📁 modules/
Setiap module memiliki struktur yang konsisten:
```
modules/moduleName/
├── 📄 handler.js        # Request handlers
├── 📄 index.js          # Route definitions
├── 📄 postgre_repository.js  # Database operations
├── 📄 validation.js     # Input validation
└── 📄 README.md         # Module documentation
```

## 🔄 File Organization Rules

### Dokumentasi
- Semua file `.md` yang berisi dokumentasi dipindahkan ke folder `docs/`
- File README.md di setiap folder menjelaskan isi folder tersebut

### Scripts
- Script deployment dan automation dipindahkan ke folder `scripts/`
- Script internal aplikasi tetap di `src/scripts/`

### Templates
- File template CSV dipindahkan ke folder `templates/`
- Template email tetap di `src/templates/`

### Root Directory
- Hanya menyimpan file konfigurasi utama (package.json, docker-compose.yml, dll)
- File dokumentasi dan script dipindahkan ke folder yang sesuai

## 📝 Best Practices

1. **Konsistensi**: Setiap module mengikuti struktur yang sama
2. **Dokumentasi**: Setiap folder memiliki README.md
3. **Organisasi**: File dikelompokkan berdasarkan fungsi dan tipe
4. **Naming**: Gunakan nama file yang deskriptif dan konsisten
5. **Separation**: Pisahkan konfigurasi, source code, dan dokumentasi

## 🚀 Development Workflow

1. **Setup**: Gunakan script di folder `scripts/` untuk setup environment
2. **Development**: Bekerja di folder `src/` dengan struktur module yang konsisten
3. **Testing**: Gunakan template di folder `templates/` untuk testing
4. **Documentation**: Update dokumentasi di folder `docs/`
5. **Deployment**: Gunakan script deployment di folder `scripts/`

---

*Terakhir diupdate: $(date)*
