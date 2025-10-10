/**
 * Swagger Schema Definitions for Item Catalog Engine Module
 */

const itemCatalogEngineSchemas = {
  ItemCatalogEngine: {
    type: 'object',
    properties: {
      item_catalog_engine_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier'
      },
      master_pdf_id: {
        type: 'string',
        format: 'uuid',
        description: 'Master PDF ID'
      },
      engine_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Engine ID'
      },
      type_engine_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Type Engine ID'
      },
      target_id: {
        type: 'string',
        nullable: true
      },
      diagram_serial_number: {
        type: 'string',
        nullable: true
      },
      part_number: {
        type: 'string',
        nullable: true
      },
      catalog_item_name_en: {
        type: 'string',
        nullable: true
      },
      catalog_item_name_ch: {
        type: 'string',
        nullable: true
      },
      description: {
        type: 'string',
        nullable: true
      },
      quantity: {
        type: 'integer',
        nullable: true
      },
      file_foto: {
        type: 'string',
        nullable: true,
        description: 'URL or path to the uploaded foto file'
      },
      created_at: {
        type: 'string',
        format: 'date-time'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true
      },
      updated_at: {
        type: 'string',
        format: 'date-time'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true
      }
    }
  },
  ItemCatalogEngineGetInput: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        example: 1
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        example: 10
      },
      search: {
        type: 'string',
        example: ''
      },
      sort_by: {
        type: 'string',
        example: 'created_at'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        example: 'desc'
      },
      master_pdf_id: {
        type: 'string',
        format: 'uuid',
        nullable: true
      }
    }
  },
  ItemCatalogEngineCreateInput: {
    type: 'object',
    required: ['name_pdf', 'data_items'],
    properties: {
      name_pdf: {
        type: 'string',
        description: 'Nama PDF (akan find or create di master_pdf)'
      },
      data_items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            engine_id: {
              type: 'string',
              format: 'uuid',
              nullable: true
            },
            type_engine_id: {
              type: 'string',
              format: 'uuid',
              nullable: true
            },
            target_id: {
              type: 'string',
              nullable: true
            },
            diagram_serial_number: {
              type: 'string',
              nullable: true
            },
            part_number: {
              type: 'string',
              nullable: true
            },
            catalog_item_name_en: {
              type: 'string',
              nullable: true
            },
            catalog_item_name_ch: {
              type: 'string',
              nullable: true
            },
            description: {
              type: 'string',
              nullable: true
            },
            quantity: {
              type: 'integer',
              nullable: true
            }
          }
        }
      }
    }
  },
  ItemCatalogEngineMultipartInput: {
    type: 'object',
    required: ['name_pdf'],
    properties: {
      name_pdf: {
        type: 'string',
        description: 'Nama PDF (akan find or create di master_pdf)',
        example: 'Engine Catalog 2024'
      },
      engine_id: {
        type: 'string',
        format: 'uuid',
        description: 'Engine ID (optional). Berlaku untuk SEMUA items',
        example: '1cd67a84-c5d1-46ff-b5c2-f85a70512227'
      },
      type_engine_id: {
        type: 'string',
        format: 'uuid',
        description: 'Type Engine ID (optional). Berlaku untuk SEMUA items',
        example: 'dec6d87f-ea6a-4a75-a11c-bda336c08275'
      },
      file_foto: {
        type: 'string',
        format: 'binary',
        description: 'File foto/gambar untuk catalog (optional). Format: jpg, jpeg, png, gif, webp, svg. Max 10MB'
      },
      file_csv: {
        type: 'string',
        format: 'binary',
        description: 'File CSV untuk import data (required jika use_csv = true). Max 10MB. CSV tidak perlu kolom engine_id dan type_engine_id. Lihat template: item_catalog_engine_template.csv'
      },
      use_csv: {
        type: 'boolean',
        description: 'Mode input: true = gunakan file_csv, false = gunakan data_items. Default: false',
        example: false
      },
      data_items: {
        type: 'string',
        description: 'JSON string array of items (required jika use_csv = false). Tidak perlu include engine_id dan type_engine_id di setiap item. Format: [{"target_id":"T001","diagram_serial_number":"DSN001",...}]',
        example: '[{"target_id":"T001","diagram_serial_number":"DSN001","part_number":"PN001","catalog_item_name_en":"Engine Part 1","catalog_item_name_ch":"引擎部件1","description":"Description","quantity":10}]'
      }
    }
  },
  ItemCatalogEngineDetail: {
    type: 'object',
    properties: {
      name_pdf: {
        type: 'string'
      },
      master_pdf_id: {
        type: 'string',
        format: 'uuid'
      },
      data_items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ItemCatalogEngine'
        }
      }
    }
  },
  ItemCatalogEnginePaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ItemCatalogEngine'
        }
      },
      pagination: {
        type: 'object',
        properties: {
          page: {
            type: 'integer'
          },
          limit: {
            type: 'integer'
          },
          total: {
            type: 'integer'
          },
          totalPages: {
            type: 'integer'
          }
        }
      }
    }
  }
};

module.exports = itemCatalogEngineSchemas;

