/**
 * Swagger API Path Definitions for Catalog Module
 */

const catalogPaths = {
  '/catalogs/get': {
    post: {
      tags: ['Catalogs'],
      summary: 'Get all catalogs',
      description: 'Retrieve all catalogs with pagination and optional filters',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CatalogGetInput' }
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
                  data: {
                    type: 'object',
                    properties: {
                      items: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Catalog' }
                      },
                      pagination: { $ref: '#/components/schemas/Pagination' }
                    }
                  }
                }
              }
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
  '/catalogs/create': {
    post: {
      tags: ['Catalogs'],
      summary: 'Create new catalog',
      description: 'Create a new catalog item',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CatalogInput' }
          }
        }
      },
      responses: {
        201: {
          description: 'Created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Catalog' },
                  message: { type: 'string', example: 'Data katalog berhasil dibuat' }
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
  '/catalogs/{id}': {
    get: {
      tags: ['Catalogs'],
      summary: 'Get catalog by ID',
      description: 'Retrieve a single catalog by ID with related category and parent catalog info',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Catalog UUID',
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
                  data: { $ref: '#/components/schemas/Catalog' }
                }
              }
            }
          }
        },
        404: {
          description: 'Catalog not found',
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
      tags: ['Catalogs'],
      summary: 'Update catalog',
      description: 'Update an existing catalog',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Catalog UUID',
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
            schema: { $ref: '#/components/schemas/CatalogInput' }
          }
        }
      },
      responses: {
        200: {
          description: 'Updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Catalog' },
                  message: { type: 'string', example: 'Data katalog berhasil diupdate' }
                }
              }
            }
          }
        },
        404: {
          description: 'Catalog not found'
        },
        400: {
          description: 'Validation error'
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
      tags: ['Catalogs'],
      summary: 'Delete catalog',
      description: 'Soft delete a catalog (sets deleted_at timestamp and is_delete flag)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Catalog UUID',
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
                  message: { type: 'string', example: 'Data katalog berhasil dihapus' }
                }
              }
            }
          }
        },
        404: {
          description: 'Catalog not found'
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

module.exports = catalogPaths;

