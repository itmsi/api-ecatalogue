/**
 * Swagger Schema Definitions for Catalog Module
 */

const catalogSchemas = {
  Catalog: {
    type: 'object',
    properties: {
      catalog_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk catalog',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      category_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Foreign key ke tabel categories',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      category_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama kategori dalam bahasa Inggris (dari join table)',
        example: 'Electronics'
      },
      category_name_ch: {
        type: 'string',
        nullable: true,
        description: 'Nama kategori dalam bahasa China (dari join table)',
        example: '电子产品'
      },
      catalog_parent_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Foreign key ke parent catalog',
        example: '123e4567-e89b-12d3-a456-426614174002'
      },
      parent_catalog_name: {
        type: 'string',
        nullable: true,
        description: 'Nama parent catalog (dari join table)',
        example: 'Main Catalog'
      },
      catalog_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama catalog dalam bahasa Inggris',
        example: 'Electronic Component Set'
      },
      catalog_name_ch: {
        type: 'string',
        nullable: true,
        description: 'Nama catalog dalam bahasa China',
        example: '电子元件套装'
      },
      catalog_quantity: {
        type: 'integer',
        description: 'Jumlah/kuantitas catalog',
        example: 100,
        default: 0
      },
      catalog_image: {
        type: 'string',
        nullable: true,
        description: 'URL atau path gambar catalog',
        example: 'https://example.com/images/catalog.jpg'
      },
      catalog_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi catalog',
        example: 'Complete set of electronic components for Arduino projects'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp pembuatan',
        example: '2025-01-01T00:00:00.000Z'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User yang membuat',
        example: null
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp update terakhir',
        example: '2025-01-01T00:00:00.000Z'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User yang mengupdate',
        example: null
      },
      deleted_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Timestamp soft delete (null jika tidak dihapus)',
        example: null
      },
      deleted_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User yang menghapus',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Flag soft delete',
        example: false,
        default: false
      }
    }
  },
  CatalogInput: {
    type: 'object',
    properties: {
      category_id: {
        type: 'string',
        format: 'uuid',
        description: 'Foreign key ke tabel categories',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      catalog_parent_id: {
        type: 'string',
        format: 'uuid',
        description: 'Foreign key ke parent catalog',
        example: '123e4567-e89b-12d3-a456-426614174002'
      },
      catalog_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Nama catalog dalam bahasa Inggris',
        example: 'Electronic Component Set'
      },
      catalog_name_ch: {
        type: 'string',
        maxLength: 255,
        description: 'Nama catalog dalam bahasa China',
        example: '电子元件套装'
      },
      catalog_quantity: {
        type: 'integer',
        minimum: 0,
        description: 'Jumlah/kuantitas catalog',
        example: 100
      },
      catalog_image: {
        type: 'string',
        format: 'binary',
        nullable: true,
        description: 'File gambar catalog (JPG, PNG, GIF, WebP, SVG) - maksimal 10MB. Optional field.',
        example: 'catalog-image.jpg'
      },
      catalog_description: {
        type: 'string',
        description: 'Deskripsi catalog',
        example: 'Complete set of electronic components for Arduino projects'
      }
    }
  },
  CatalogUpdateInput: {
    type: 'object',
    properties: {
      category_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Foreign key ke tabel categories',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      catalog_parent_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Foreign key ke parent catalog',
        example: '123e4567-e89b-12d3-a456-426614174002'
      },
      catalog_name_en: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama catalog dalam bahasa Inggris',
        example: 'Electronic Component Set'
      },
      catalog_name_ch: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama catalog dalam bahasa China',
        example: '电子元件套装'
      },
      catalog_quantity: {
        type: 'integer',
        minimum: 0,
        nullable: true,
        description: 'Jumlah/kuantitas catalog',
        example: 100
      },
      catalog_image: {
        type: 'string',
        format: 'binary',
        nullable: true,
        description: 'File gambar catalog (JPG, PNG, GIF, WebP, SVG) - maksimal 10MB. Untuk update, jika tidak diisi maka gambar lama akan tetap dipertahankan.',
        example: 'catalog-image.jpg'
      },
      catalog_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi catalog',
        example: 'Complete set of electronic components for Arduino projects'
      }
    }
  },
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
      search: {
        type: 'string',
        default: '',
        description: 'Search keyword (catalog names)',
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
};

module.exports = catalogSchemas;

