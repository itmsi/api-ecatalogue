/**
 * API Path Definitions for All Item Catalogs Module
 */

const allItemCatalogsPaths = {
  '/all-item-catalogs/get': {
    post: {
      tags: ['All Item Catalogs'],
      summary: 'Get all item catalogs with pagination and filtering',
      description: 'Retrieve a paginated list of all item catalogs with optional filtering by catalog type, search, and sorting',
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
            },
            example: {
              page: 1,
              limit: 10,
              search: '',
              sort_by: 'created_at',
              sort_order: 'desc',
              master_pdf_id: '550e8400-e29b-41d4-a716-446655440000',
              master_catalog: 'engine'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successfully retrieved item catalogs',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AllItemCatalogListResponse'
              }
            }
          }
        },
        400: {
          description: 'Bad request - Invalid input parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },

  '/all-item-catalogs/create': {
    post: {
      tags: ['All Item Catalogs'],
      summary: 'Create new item catalog',
      description: 'Create a new item catalog with data items and optional file uploads',
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
              $ref: '#/components/schemas/AllItemCatalogCreateInput'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Successfully created item catalog',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AllItemCatalogResponse'
              }
            }
          }
        },
        400: {
          description: 'Bad request - Invalid input data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },

  '/all-item-catalogs/{id}': {
    get: {
      tags: ['All Item Catalogs'],
      summary: 'Get item catalog by master_pdf_id',
      description: 'Retrieve item catalogs grouped by master category based on master_pdf_id',
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
          description: 'Master PDF ID'
        }
      ],
        responses: {
        200: {
          description: 'Successfully retrieved item catalog grouped by master category',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AllItemCatalogMasterPdfResponse'
              }
            }
          }
        },
        404: {
          description: 'Item catalog not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    },

    put: {
      tags: ['All Item Catalogs'],
      summary: 'Update item catalog by ID',
      description: 'Update an existing item catalog with new data',
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
          description: 'Item catalog ID'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/AllItemCatalogUpdateInput'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successfully updated item catalog',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AllItemCatalogResponse'
              }
            }
          }
        },
        400: {
          description: 'Bad request - Invalid input data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Item catalog not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    },

    delete: {
      tags: ['All Item Catalogs'],
      summary: 'Delete item catalog by ID (soft delete)',
      description: 'Soft delete an item catalog by its ID',
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
          description: 'Item catalog ID'
        }
      ],
      responses: {
        200: {
          description: 'Successfully deleted item catalog',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Data berhasil dihapus'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Item catalog not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  }
};

module.exports = allItemCatalogsPaths;
