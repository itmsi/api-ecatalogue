/**
 * Swagger Schema Definitions for Sidebar Module
 */

const sidebarSchemas = {
  SidebarItem: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'catalog_id',
        example: 'SIS-5255847923'
      },
      masterId: {
        type: 'string',
        nullable: true,
        description: 'catalog_parent_id', 
        example: 'SIS-2448820'
      },
      partNumber: {
        type: 'string',
        nullable: true,
        description: 'Part number',
        example: null
      },
      partName: {
        type: 'string',
        nullable: true,
        description: 'Combined catalog name (English and Chinese)',
        example: '(WP10.340E32)卡车用柴油机'
      },
      softtype: {
        type: 'string',
        nullable: true,
        description: 'Soft type',
        example: 'null'
      },
      epcType: {
        type: 'string',
        nullable: true,
        description: 'EPC type',
        example: 'null'
      },
      catalog_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk catalog',
        example: 'faef7b51-5e12-4e15-9acf-e27e32f95d3c'
      },
      category_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Foreign key ke tabel categories',
        example: 'f22396c7-2ffa-4ab3-bf0f-883c7b3ef61c'
      },
      catalog_parent_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Foreign key ke parent catalog',
        example: null
      },
      catalog_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama catalog dalam bahasa Inggris',
        example: 'Electronic Component Set edit csv'
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
        example: 12,
        default: 0
      },
      catalog_image: {
        type: 'string',
        nullable: true,
        description: 'URL atau path gambar catalog',
        example: 'https://minio-bucket.motorsights.com/msi-e-catalogue/catalog-images/1759368645880_21af3aa3-e0a5-4674-b5ba-f8a5006186bc_testdebug2.jpg'
      },
      catalog_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi catalog',
        example: 'Complete set of electronic components for Arduino projects'
      },
      production_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Foreign key ke tabel productions',
        example: null
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
        example: null
      },
      parent_catalog_name: {
        type: 'string',
        nullable: true,
        description: 'Nama parent catalog (dari join table)',
        example: null
      },
      production_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama production dalam bahasa Inggris (dari join table)',
        example: null
      },
      production_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Nama production dalam bahasa China (dari join table)',
        example: null
      },
      vin_number: {
        type: 'string',
        nullable: true,
        description: 'VIN number (dari join table)',
        example: null
      },
      children: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/SidebarItem'
        },
        description: 'Array of child catalog items (recursive structure)'
      }
    }
  },

  SidebarGetInput: {
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
        description: 'Search keyword (catalog names, categories, descriptions)',
        example: 'electronic'
      },
      sort_by: {
        type: 'string',
        default: 'created_at',
        enum: ['created_at', 'updated_at', 'catalog_name_en', 'category_name_en'],
        description: 'Field to sort by',
        example: 'created_at'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order',
        example: 'desc'
      },
      vin_number: {
        type: 'string',
        nullable: true,
        description: 'Filter berdasarkan VIN number (dari tabel productions)',
        example: 'VIN123456789'
      }
    },
    required: []
  },

  SidebarResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Status response',
        example: true
      },
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/SidebarItem'
        },
        description: 'Array of sidebar catalog items in hierarchical structure'
      },
      pagination: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'Current page',
            example: 1
          },
          limit: {
            type: 'integer',
            description: 'Items per page',
            example: 10
          },
          total: {
            type: 'integer',
            description: 'Total items',
            example: 100
          },
          totalPages: {
            type: 'integer',
            description: 'Total pages',
            example: 10
          }
        }
      }
    }
  }
};

module.exports = sidebarSchemas;
