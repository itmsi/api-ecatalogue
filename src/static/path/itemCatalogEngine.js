/**
 * Swagger Path Definitions for Item Catalog Engine Module
 */

const itemCatalogEnginePaths = {
  '/item_catalog_engine/get': {
    post: {
      tags: ['Item Catalog Engine'],
      summary: 'Get list item catalog engine dengan filter',
      description: 'Retrieve a paginated list of item catalog engines with optional search and filtering',
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
              $ref: '#/components/schemas/ItemCatalogEngineGetInput'
            },
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
          description: 'Successfully retrieved item catalog engines list',
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
                    example: 'Success'
                  },
                  data: {
                    $ref: '#/components/schemas/ItemCatalogEnginePaginationResponse'
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
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
  '/item_catalog_engine/create': {
    post: {
      tags: ['Item Catalog Engine'],
      summary: 'Create new item catalog engine',
      description: 'Create new item catalog engine with bulk insert data_items',
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
              $ref: '#/components/schemas/ItemCatalogEngineCreateInput'
            },
            example: {
              name_pdf: 'Engine Catalog 2024',
              data_items: [
                {
                  engine_id: '550e8400-e29b-41d4-a716-446655440001',
                  type_engine_id: '550e8400-e29b-41d4-a716-446655440002',
                  target_id: 'T001',
                  diagram_serial_number: 'DSN001',
                  part_number: 'PN001',
                  catalog_item_name_en: 'Engine Part 1',
                  catalog_item_name_ch: '引擎部件1',
                  description: 'Description',
                  quantity: 10
                }
              ]
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
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Data berhasil dibuat'
                  },
                  data: {
                    type: 'object',
                    properties: {
                      master_pdf_id: {
                        type: 'string',
                        format: 'uuid'
                      },
                      items: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/ItemCatalogEngine'
                        }
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
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
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
  '/item_catalog_engine/{id}': {
    get: {
      tags: ['Item Catalog Engine'],
      summary: 'Get item catalog engine by ID',
      description: 'Retrieve a single item catalog engine by its ID with all related data_items',
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
          description: 'Item catalog engine ID',
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
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  data: {
                    $ref: '#/components/schemas/ItemCatalogEngineDetail'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Data tidak ditemukan',
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
      tags: ['Item Catalog Engine'],
      summary: 'Update item catalog engine',
      description: 'Update item catalog engine by ID',
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
          description: 'Item catalog engine ID',
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
            schema: {
              $ref: '#/components/schemas/ItemCatalogEngineCreateInput'
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
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Data berhasil diupdate'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Data tidak ditemukan',
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
      tags: ['Item Catalog Engine'],
      summary: 'Soft delete item catalog engine',
      description: 'Soft delete an item catalog engine by its ID',
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
          description: 'Item catalog engine ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
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
          description: 'Data tidak ditemukan',
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

module.exports = itemCatalogEnginePaths;

