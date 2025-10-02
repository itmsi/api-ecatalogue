/**
 * Swagger Schema Definitions for Catalog Items Module
 */

const catalogItemsSchemas = {
  CatalogItem: {
    type: 'object',
    properties: {
      catalog_item_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for catalog item',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      catalog_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Foreign key to catalogs table',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      target_id: {
        type: 'string',
        nullable: true,
        description: 'Target ID',
        example: 'TARGET001'
      },
      diagram_serial_number: {
        type: 'string',
        nullable: true,
        description: 'Diagram serial number',
        example: 'DSN001'
      },
      part_number: {
        type: 'string',
        nullable: true,
        description: 'Part number',
        example: 'PN001'
      },
      catalog_item_name_en: {
        type: 'string',
        nullable: true,
        description: 'Catalog item name in English',
        example: 'Engine Component A'
      },
      catalog_item_name_ch: {
        type: 'string',
        nullable: true,
        description: 'Catalog item name in Chinese',
        example: '发动机组件A'
      },
      catalog_item_quantity: {
        type: 'integer',
        description: 'Catalog item quantity',
        example: 10
      },
      catalog_item_description: {
        type: 'string',
        nullable: true,
        description: 'Catalog item description',
        example: 'High quality engine component for automotive use'
      },
      catalog_name_en: {
        type: 'string',
        nullable: true,
        description: 'Catalog name in English (from catalogs table)',
        example: 'Electronic Component Set'
      },
      catalog_name_ch: {
        type: 'string',
        nullable: true,
        description: 'Catalog name in Chinese (from catalogs table)',
        example: '电子元件套装'
      },
      category_name_en: {
        type: 'string',
        nullable: true,
        description: 'Category name in English (from categories table)',
        example: 'Electronics'
      },
      category_name_ch: {
        type: 'string',
        nullable: true,
        description: 'Category name in Chinese (from categories table)',
        example: '电子产品'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp',
        example: '2025-01-01T00:00:00.000Z'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who created the record',
        example: '123e4567-e89b-12d3-a456-426614174002'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp',
        example: '2025-01-01T00:00:00.000Z'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who last updated the record',
        example: '123e4567-e89b-12d3-a456-426614174002'
      },
      deleted_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Deletion timestamp (null if not deleted)',
        example: null
      },
      deleted_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who deleted the record',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag',
        example: false
      }
    }
  },
  CatalogItemInput: {
    type: 'object',
    properties: {
      catalog_id: {
        type: 'string',
        format: 'uuid',
        description: 'Foreign key to catalogs table',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      target_id: {
        type: 'string',
        maxLength: 255,
        description: 'Target ID',
        example: 'TARGET001'
      },
      diagram_serial_number: {
        type: 'string',
        maxLength: 255,
        description: 'Diagram serial number',
        example: 'DSN001'
      },
      part_number: {
        type: 'string',
        maxLength: 255,
        description: 'Part number',
        example: 'PN001'
      },
      catalog_item_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Catalog item name in English',
        example: 'Engine Component A'
      },
      catalog_item_name_ch: {
        type: 'string',
        maxLength: 255,
        description: 'Catalog item name in Chinese',
        example: '发动机组件A'
      },
      catalog_item_quantity: {
        type: 'integer',
        minimum: 0,
        description: 'Catalog item quantity',
        example: 10
      },
      catalog_item_description: {
        type: 'string',
        maxLength: 1000,
        description: 'Catalog item description',
        example: 'High quality engine component for automotive use'
      }
    }
  },
  CatalogItemListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/CatalogItem' }
          },
          pagination: { $ref: '#/components/schemas/Pagination' }
        }
      }
    }
  },
  CatalogItemResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: { $ref: '#/components/schemas/CatalogItem' },
      message: {
        type: 'string',
        example: 'Data berhasil dibuat'
      }
    }
  },
  ImportCsvResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: {
        type: 'object',
        properties: {
          imported: {
            type: 'integer',
            description: 'Number of successfully imported new items',
            example: 3
          },
          updated: {
            type: 'integer',
            description: 'Number of successfully updated existing items',
            example: 2
          },
          errors: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of errors during import',
            example: []
          },
          total: {
            type: 'integer',
            description: 'Total number of rows in CSV',
            example: 5
          }
        }
      },
      message: {
        type: 'string',
        example: 'Berhasil mengimport 5 data dari CSV'
      }
    }
  },
  Pagination: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        description: 'Current page number',
        example: 1
      },
      limit: {
        type: 'integer',
        description: 'Items per page',
        example: 10
      },
      total: {
        type: 'integer',
        description: 'Total number of items',
        example: 100
      },
      totalPages: {
        type: 'integer',
        description: 'Total number of pages',
        example: 10
      }
    }
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false
      },
      error: {
        type: 'string',
        description: 'Error message',
        example: 'Data tidak ditemukan'
      },
      details: {
        type: 'object',
        description: 'Additional error details',
        nullable: true
      }
    }
  }
};

module.exports = catalogItemsSchemas;
