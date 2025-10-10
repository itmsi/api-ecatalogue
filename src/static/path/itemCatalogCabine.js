/**
 * Swagger Path Definitions for Item Catalog Cabine Module
 */

const itemCatalogCabinePaths = {
  '/item_catalog_cabine/get': {
    post: {
      tags: ['Item Catalog Cabine'],
      summary: 'Get list item catalog cabine dengan filter',
      description: 'Retrieve a paginated list of item catalog cabines with optional search and filtering',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ItemCatalogCabineGetInput' },
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
                  data: { $ref: '#/components/schemas/ItemCatalogCabinePaginationResponse' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/item_catalog_cabine/create': {
    post: {
      tags: ['Item Catalog Cabine'],
      summary: 'Create new item catalog cabine',
      description: 'Create new item catalog cabine with multipart form-data. Support file upload (file_foto) and CSV import (file_csv) or manual data input (data_items)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: { $ref: '#/components/schemas/ItemCatalogCabineMultipartInput' }
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
                  data: {
                    type: 'object',
                    properties: {
                      master_pdf_id: { type: 'string', format: 'uuid' },
                      items: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/ItemCatalogCabine' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        500: {
          description: 'Internal server error (e.g., MinIO upload failed)',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    }
  },
  '/item_catalog_cabine/{id}': {
    get: {
      tags: ['Item Catalog Cabine'],
      summary: 'Get item catalog cabine by ID',
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
      tags: ['Item Catalog Cabine'],
      summary: 'Update item catalog cabine',
      description: 'Update item catalog cabine by ID with multipart form-data. Support file upload (file_foto) and CSV import (file_csv) or manual data input (data_items)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Item catalog cabine ID',
          schema: { type: 'string', format: 'uuid' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: { $ref: '#/components/schemas/ItemCatalogCabineMultipartInput' }
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
                  data: {
                    type: 'object',
                    properties: {
                      master_pdf_id: { type: 'string', format: 'uuid' },
                      items: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/ItemCatalogCabine' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        404: {
          description: 'Data tidak ditemukan',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        500: {
          description: 'Internal server error (e.g., MinIO upload failed)',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Item Catalog Cabine'],
      summary: 'Soft delete item catalog cabine',
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

module.exports = itemCatalogCabinePaths;

