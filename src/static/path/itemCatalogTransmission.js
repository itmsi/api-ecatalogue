/**
 * Swagger Path Definitions for Item Catalog Transmission Module
 */

const itemCatalogTransmissionPaths = {
  '/item_catalog_transmission/get': {
    post: {
      tags: ['Item Catalog Transmission'],
      summary: 'Get list item catalog transmission dengan filter',
      description: 'Retrieve a paginated list of item catalog transmissions with optional search and filtering',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogTransmissionGetInput' },
            example: {
              page: 1,
              limit: 10,
              search: '',
              sort_by: 'created_at',
              sort_order: 'desc',
              master_pdf_id: '550e8400-e29b-41d4-a716-446655440000'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Success' },
                  data: { $ref: '#/components/schemas/ItemCatalogTransmissionPaginationResponse' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/item_catalog_transmission/create': {
    post: {
      tags: ['Item Catalog Transmission'],
      summary: 'Create new item catalog transmission',
      description: 'Upload transmission catalog dengan file foto dan CSV, atau dengan data_items manual',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['name_pdf', 'use_csv'],
              properties: {
                name_pdf: {
                  type: 'string',
                  description: 'Nama PDF catalog'
                },
                transmission_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'ID transmission (optional)',
                  nullable: true
                },
                type_transmission_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'ID type transmission (optional)',
                  nullable: true
                },
                use_csv: {
                  type: 'boolean',
                  description: 'Gunakan CSV untuk data items (true) atau manual data_items (false)',
                  example: true
                },
                file_foto: {
                  type: 'string',
                  format: 'binary',
                  description: 'File foto transmission diagram (optional, format: jpg, jpeg, png)'
                },
                file_csv: {
                  type: 'string',
                  format: 'binary',
                  description: 'File CSV berisi data items (required jika use_csv = true)'
                },
                data_items: {
                  type: 'string',
                  description: 'JSON string array of items (required jika use_csv = false)',
                  example: '[{"target_id":"1","diagram_serial_number":"DS001","part_number":"PN001","catalog_item_name_en":"Item 1","catalog_item_name_ch":"项目1","description":"Description","quantity":10}]'
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
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Data berhasil dibuat' },
                  data: { type: 'object' }
                }
              }
            }
          }
        },
        400: { description: 'Bad request - validasi gagal' },
        500: { description: 'Internal server error' }
      }
    }
  },
  '/item_catalog_transmission/{id}': {
    get: {
      tags: ['Item Catalog Transmission'],
      summary: 'Get item catalog transmission by ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' }
        }
      ],
      responses: {
        200: { description: 'Success' },
        404: { description: 'Data tidak ditemukan' }
      }
    },
    put: {
      tags: ['Item Catalog Transmission'],
      summary: 'Update item catalog transmission',
      description: 'Update transmission catalog dengan file foto dan CSV, atau dengan data_items manual',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Item catalog transmission ID atau master_pdf_id'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['name_pdf', 'use_csv'],
              properties: {
                name_pdf: {
                  type: 'string',
                  description: 'Nama PDF catalog'
                },
                transmission_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'ID transmission (optional)',
                  nullable: true
                },
                type_transmission_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'ID type transmission (optional)',
                  nullable: true
                },
                use_csv: {
                  type: 'boolean',
                  description: 'Gunakan CSV untuk data items (true) atau manual data_items (false)',
                  example: true
                },
                file_foto: {
                  type: 'string',
                  format: 'binary',
                  description: 'File foto transmission diagram (optional, format: jpg, jpeg, png)'
                },
                file_csv: {
                  type: 'string',
                  format: 'binary',
                  description: 'File CSV berisi data items (required jika use_csv = true)'
                },
                data_items: {
                  type: 'string',
                  description: 'JSON string array of items (required jika use_csv = false)',
                  example: '[{"target_id":"1","diagram_serial_number":"DS001","part_number":"PN001","catalog_item_name_en":"Item 1","catalog_item_name_ch":"项目1","description":"Description","quantity":10}]'
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
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Data berhasil diupdate' },
                  data: { type: 'object' }
                }
              }
            }
          }
        },
        400: { description: 'Bad request - validasi gagal' },
        404: { description: 'Data tidak ditemukan' },
        500: { description: 'Internal server error' }
      }
    },
    delete: {
      tags: ['Item Catalog Transmission'],
      summary: 'Soft delete item catalog transmission',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' }
        }
      ],
      responses: {
        200: { description: 'Data berhasil dihapus' },
        404: { description: 'Data tidak ditemukan' }
      }
    }
  }
};

module.exports = itemCatalogTransmissionPaths;

