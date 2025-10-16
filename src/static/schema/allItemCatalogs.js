/**
 * Swagger Schema Definitions for All Item Catalogs Module
 */

const allItemCatalogsSchemas = {
  // Swagger Tags
  AllItemCatalogsTag: {
    name: 'All Item Catalogs',
    description: 'API untuk mengelola semua jenis item katalog (engine, axle, cabin, steering, transmission) dalam satu endpoint'
  },

  // Swagger Endpoint Documentation
  AllItemCatalogsEndpoints: {
    '/api/v1/all-item-catalogs/get': {
      post: {
        summary: 'Mendapatkan daftar semua item katalog dengan filter dan pagination',
        tags: ['All Item Catalogs'],
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AllItemCatalogGetInput'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Berhasil mendapatkan data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AllItemCatalogListResponse'
                }
              }
            }
          }
        }
      }
    },

    '/api/v1/all-item-catalogs/{id}': {
      get: {
        summary: 'Mendapatkan detail item katalog berdasarkan ID',
        tags: ['All Item Catalogs'],
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid'
            },
            description: 'ID item katalog'
          }
        ],
        responses: {
          200: {
            description: 'Berhasil mendapatkan data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AllItemCatalogDetailResponse'
                }
              }
            }
          },
          404: {
            description: 'Data tidak ditemukan'
          }
        }
      },

      put: {
        summary: 'Mengupdate item katalog berdasarkan ID',
        tags: ['All Item Catalogs'],
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid'
            },
            description: 'ID item katalog'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['name_pdf', 'master_catalog'],
                properties: {
                  name_pdf: {
                    type: 'string',
                    description: 'Nama file PDF'
                  },
                  master_catalog: {
                    type: 'string',
                    enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
                    description: 'Jenis katalog (engine, axle, cabin, steering, atau transmission)'
                  },
                  master_category_id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Master category ID (engine_id, axle_id, cabin_id, steering_id, atau transmission_id sesuai dengan master_catalog)'
                  },
                  type_category_id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Type category ID (type_engine_id, type_axle_id, type_cabin_id, type_steering_id, atau type_transmission_id sesuai dengan master_catalog)'
                  },
                  use_csv: {
                    type: 'boolean',
                    default: false,
                    description: 'Apakah menggunakan file CSV untuk data items'
                  },
                  data_items: {
                    type: 'string',
                    description: 'JSON string dari array data items (wajib jika use_csv = false)',
                    example: '[{"target_id":"T001","diagram_serial_number":"DSN-001","part_number":"PN-12345","catalog_item_name_en":"Engine Oil Filter","catalog_item_name_ch":"机油滤清器","description":"High quality engine oil filter","quantity":2}]'
                  },
                  file_foto: {
                    type: 'string',
                    format: 'binary',
                    description: 'File foto (optional)'
                  },
                  file_csv: {
                    type: 'string',
                    format: 'binary',
                    description: 'File CSV (wajib jika use_csv = true)'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Data berhasil diupdate',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AllItemCatalogResponse'
                }
              }
            }
          },
          404: {
            description: 'Data tidak ditemukan'
          }
        }
      },

      delete: {
        summary: 'Menghapus item katalog berdasarkan ID (soft delete)',
        tags: ['All Item Catalogs'],
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid'
            },
            description: 'ID item katalog'
          }
        ],
        responses: {
          200: {
            description: 'Data berhasil dihapus',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean'
                    },
                    message: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Data tidak ditemukan'
          }
        }
      }
    },

    '/api/v1/all-item-catalogs/create': {
      post: {
        summary: 'Membuat item katalog baru',
        tags: ['All Item Catalogs'],
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['name_pdf', 'master_catalog'],
                properties: {
                  name_pdf: {
                    type: 'string',
                    description: 'Nama file PDF',
                    example: 'Engine_Catalog_v1.0'
                  },
                  master_catalog: {
                    type: 'string',
                    enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
                    description: 'Jenis katalog (engine, axle, cabin, steering, atau transmission)',
                    example: 'engine'
                  },
                  master_category_id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Master category ID (engine_id, axle_id, cabin_id, steering_id, atau transmission_id sesuai dengan master_catalog)',
                    example: 'fba70960-15d8-43eb-9315-814d80b77666'
                  },
                  type_category_id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Type category ID (type_engine_id, type_axle_id, type_cabin_id, type_steering_id, atau type_transmission_id sesuai dengan master_catalog)',
                    example: 'a24d68e3-69c9-4e04-a7ee-f8bb8ddf5b3b'
                  },
                  use_csv: {
                    type: 'boolean',
                    default: false,
                    description: 'Apakah menggunakan file CSV untuk data items',
                    example: true
                  },
                  data_items: {
                    type: 'string',
                    description: 'JSON string dari array data items (wajib jika use_csv = false)',
                    example: '[{"target_id":"T001","diagram_serial_number":"DSN-001","part_number":"PN-12345","catalog_item_name_en":"Engine Oil Filter","catalog_item_name_ch":"机油滤清器","description":"High quality engine oil filter","quantity":2}]'
                  },
                  file_foto: {
                    type: 'string',
                    format: 'binary',
                    description: 'File foto (optional) - Format yang didukung: JPG, JPEG, PNG, GIF, WEBP, SVG'
                  },
                  file_csv: {
                    type: 'string',
                    format: 'binary',
                    description: 'File CSV (wajib jika use_csv = true) - Format yang didukung: CSV'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Data berhasil dibuat',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AllItemCatalogResponse'
                }
              }
            }
          },
          400: {
            description: 'Bad request'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    }
  },
  AllItemCatalog: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier'
      },
      master_pdf_id: {
        type: 'string',
        format: 'uuid',
        description: 'Master PDF ID'
      },
      name_pdf: {
        type: 'string',
        description: 'PDF name'
      },
      master_catalog: {
        type: 'string',
        enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
        description: 'Jenis katalog (engine, axle, cabin, steering, atau transmission)'
      },
      target_id: {
        type: 'string',
        nullable: true,
        description: 'Target ID'
      },
      diagram_serial_number: {
        type: 'string',
        nullable: true,
        description: 'Diagram serial number'
      },
      part_number: {
        type: 'string',
        nullable: true,
        description: 'Part number'
      },
      catalog_item_name_en: {
        type: 'string',
        nullable: true,
        description: 'Catalog item name in English'
      },
      catalog_item_name_ch: {
        type: 'string',
        nullable: true,
        description: 'Catalog item name in Chinese'
      },
      description: {
        type: 'string',
        nullable: true,
        description: 'Item description'
      },
      quantity: {
        type: 'integer',
        nullable: true,
        description: 'Item quantity'
      },
      file_foto: {
        type: 'string',
        nullable: true,
        description: 'URL or path to the uploaded foto file'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who created the record'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who last updated the record'
      }
    }
  },

  AllItemCatalogGetInput: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Page number for pagination'
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Number of items per page'
      },
      search: {
        type: 'string',
        description: 'Search term for filtering items'
      },
      sort_by: {
        type: 'string',
        default: 'created_at',
        description: 'Field to sort by'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      master_pdf_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by master PDF ID'
      },
      master_catalog: {
        type: 'string',
        enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
        description: 'Filter by catalog type. If not provided, returns all types'
      }
    }
  },

  AllItemCatalogCreateInput: {
    type: 'object',
    required: ['name_pdf', 'master_catalog'],
    properties: {
      name_pdf: {
        type: 'string',
        description: 'Name of the PDF file'
      },
      master_catalog: {
        type: 'string',
        enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
        description: 'Type of catalog (engine, axle, cabin, steering, or transmission)'
      },
      master_category_id: {
        type: 'string',
        format: 'uuid',
        description: 'Master category ID (engine_id, axle_id, cabin_id, steering_id, or transmission_id based on master_catalog)'
      },
      type_category_id: {
        type: 'string',
        format: 'uuid',
        description: 'Type category ID (type_engine_id, type_axle_id, type_cabin_id, type_steering_id, or type_transmission_id based on master_catalog)'
      },
      use_csv: {
        type: 'boolean',
        default: false,
        description: 'Whether to use CSV file for data items'
      },
      data_items: {
        type: 'string',
        description: 'JSON string of data items array (required if use_csv = false)',
        example: '[{"target_id":"T001","diagram_serial_number":"DSN-001","part_number":"PN-12345","catalog_item_name_en":"Engine Oil Filter","catalog_item_name_ch":"机油滤清器","description":"High quality engine oil filter","quantity":2}]'
      },
      file_foto: {
        type: 'string',
        format: 'binary',
        description: 'Photo file (optional)'
      },
      file_csv: {
        type: 'string',
        format: 'binary',
        description: 'CSV file (required if use_csv = true)'
      }
    }
  },

  AllItemCatalogUpdateInput: {
    type: 'object',
    required: ['name_pdf', 'master_catalog'],
    properties: {
      name_pdf: {
        type: 'string',
        description: 'Name of the PDF file'
      },
      master_catalog: {
        type: 'string',
        enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
        description: 'Type of catalog (engine, axle, cabin, steering, or transmission)'
      },
      master_category_id: {
        type: 'string',
        format: 'uuid',
        description: 'Master category ID (engine_id, axle_id, cabin_id, steering_id, or transmission_id based on master_catalog)'
      },
      type_category_id: {
        type: 'string',
        format: 'uuid',
        description: 'Type category ID (type_engine_id, type_axle_id, type_cabin_id, type_steering_id, or type_transmission_id based on master_catalog)'
      },
      use_csv: {
        type: 'boolean',
        default: false,
        description: 'Whether to use CSV file for data items'
      },
      data_items: {
        type: 'string',
        description: 'JSON string of data items array (required if use_csv = false)',
        example: '[{"target_id":"T001","diagram_serial_number":"DSN-001","part_number":"PN-12345","catalog_item_name_en":"Engine Oil Filter","catalog_item_name_ch":"机油滤清器","description":"High quality engine oil filter","quantity":2}]'
      },
      file_foto: {
        type: 'string',
        format: 'binary',
        description: 'Photo file (optional)'
      },
      file_csv: {
        type: 'string',
        format: 'binary',
        description: 'CSV file (required if use_csv = true)'
      }
    }
  },

  DataItem: {
    type: 'object',
    properties: {
      target_id: {
        type: 'string',
        nullable: true,
        description: 'Target ID',
        example: 'T001'
      },
      diagram_serial_number: {
        type: 'string',
        nullable: true,
        description: 'Diagram serial number',
        example: 'DSN-001'
      },
      part_number: {
        type: 'string',
        nullable: true,
        description: 'Part number',
        example: 'PN-12345'
      },
      catalog_item_name_en: {
        type: 'string',
        nullable: true,
        description: 'Catalog item name in English',
        example: 'Engine Oil Filter'
      },
      catalog_item_name_ch: {
        type: 'string',
        nullable: true,
        description: 'Catalog item name in Chinese',
        example: '机油滤清器'
      },
      description: {
        type: 'string',
        nullable: true,
        description: 'Item description',
        example: 'High quality engine oil filter for heavy machinery'
      },
      quantity: {
        type: 'integer',
        nullable: true,
        description: 'Item quantity',
        example: 2
      }
    }
  },

  AllItemCatalogResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status'
      },
      data: {
        type: 'object',
        properties: {
          master_pdf_id: {
            type: 'string',
            format: 'uuid',
            description: 'Master PDF ID'
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AllItemCatalog'
            }
          }
        }
      },
      message: {
        type: 'string',
        description: 'Response message'
      }
    }
  },

  AllItemCatalogListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status'
      },
      data: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AllItemCatalog'
            }
          },
          pagination: {
            type: 'object',
            properties: {
              page: {
                type: 'integer',
                description: 'Current page number'
              },
              limit: {
                type: 'integer',
                description: 'Items per page'
              },
              total: {
                type: 'integer',
                description: 'Total number of items'
              },
              totalPages: {
                type: 'integer',
                description: 'Total number of pages'
              }
            }
          }
        }
      }
    }
  },

  AllItemCatalogDetailResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status'
      },
      data: {
        type: 'object',
        properties: {
          name_pdf: {
            type: 'string',
            description: 'PDF name'
          },
          master_catalog: {
            type: 'string',
            enum: ['engine', 'axle', 'cabin', 'steering', 'transmission'],
            description: 'Jenis katalog (engine, axle, cabin, steering, atau transmission)'
          },
          master_pdf_id: {
            type: 'string',
            format: 'uuid',
            description: 'Master PDF ID'
          },
          data_items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AllItemCatalog'
            }
          }
        }
      }
    }
  },

  ErrorResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false,
        description: 'Success status'
      },
      message: {
        type: 'string',
        description: 'Error message'
      },
      detail: {
        type: 'string',
        description: 'Error detail'
      }
    }
  }
};

module.exports = allItemCatalogsSchemas;
