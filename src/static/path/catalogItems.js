/**
 * Swagger API Path Definitions for Catalog Items Module
 */

const catalogItemsPaths = {
  '/catalogItems/get': {
    post: {
      tags: ['Catalog Items'],
      summary: 'Get all catalog items',
      description: 'Retrieve all catalog items with pagination, filtering, and sorting capabilities',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  default: 1,
                  minimum: 1,
                  description: 'Page number'
                },
                limit: {
                  type: 'integer',
                  default: 10,
                  minimum: 1,
                  maximum: 100,
                  description: 'Items per page'
                },
                search: {
                  type: 'string',
                  default: '',
                  maxLength: 255,
                  description: 'Search term for filtering catalog items by name, part number, target ID, or diagram serial number'
                },
                sort_by: {
                  type: 'string',
                  default: 'created_at',
                  enum: ['created_at', 'updated_at', 'catalog_item_name_en', 'catalog_item_name_ch', 'part_number', 'target_id'],
                  description: 'Field to sort by'
                },
                sort_order: {
                  type: 'string',
                  default: 'desc',
                  enum: ['asc', 'desc'],
                  description: 'Sort order (ascending or descending)'
                },
                catalog_id: {
                  type: 'string',
                  format: 'uuid',
                  nullable: true,
                  description: 'Filter by catalog ID (optional, can be empty or null)'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CatalogItemListResponse' }
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
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    }
  },
  '/catalogItems/create': {
    post: {
      tags: ['Catalog Items'],
      summary: 'Create new catalog item',
      description: 'Create a new catalog item',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CatalogItemInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Created successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CatalogItemResponse' }
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
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    }
  },
  '/catalogItems/{id}': {
    get: {
      tags: ['Catalog Items'],
      summary: 'Get catalog item by ID',
      description: 'Retrieve a single catalog item by ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Catalog item UUID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/CatalogItem' }
                }
              }
            }
          }
        },
        404: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    },
    put: {
      tags: ['Catalog Items'],
      summary: 'Update catalog item',
      description: 'Update an existing catalog item',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Catalog item UUID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CatalogItemInput' }
          }
        }
      },
      responses: {
        200: {
          description: 'Updated successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CatalogItemResponse' }
            }
          }
        },
        404: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Catalog Items'],
      summary: 'Delete catalog item',
      description: 'Soft delete a catalog item (sets deleted_at timestamp)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Catalog item UUID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Data berhasil dihapus' }
                }
              }
            }
          }
        },
        404: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    }
  },
  '/catalogItems/import': {
    post: {
      tags: ['Catalog Items'],
      summary: 'Import catalog items from CSV',
      description: 'Import multiple catalog items from CSV file with upsert logic. If catalog_id and target_id combination already exists, it will update the record. Otherwise, it will insert a new record.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                catalog_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Catalog ID to associate the imported items with'
                },
                file: {
                  type: 'string',
                  format: 'binary',
                  description: 'CSV file containing catalog items data. Required columns: target_id, diagram_serial_number, part_number, catalog_item_name_en, catalog_item_name_ch, catalog_item_quantity, catalog_item_description (optional)'
                }
              },
              required: ['catalog_id', 'file']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Import successful',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ImportCsvResponse' }
            }
          }
        },
        400: {
          description: 'Validation error or file error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    }
  }
};

module.exports = catalogItemsPaths;
