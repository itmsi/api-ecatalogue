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
          description: 'Master PDF ID (master_pdf_id) - ID dari tabel master_pdf'
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
      summary: 'Update item catalog by master_pdf_id',
      description: 'Update an existing item catalog with new data using master_pdf_id',
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
          description: 'Master PDF ID (master_pdf_id) - ID dari tabel master_pdf'
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
      summary: 'Delete item catalog by master_pdf_id (soft delete)',
      description: 'Soft delete an item catalog and all its items using master_pdf_id',
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
          description: 'Master PDF ID (master_pdf_id) - ID dari tabel master_pdf'
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
  },

  '/all-item-catalogs/download-template': {
    get: {
      tags: ['All Item Catalogs'],
      summary: 'Get CSV template download information',
      description: 'Get information about CSV template for importing item catalog data. Returns download link and template details.',
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Template information successfully retrieved',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  data: {
                    type: 'object',
                    properties: {
                      filename: {
                        type: 'string',
                        example: 'item_catalog_template_2025-10-21T04-35-06-750Z.csv'
                      },
                      download_link: {
                        type: 'string',
                        example: 'http://localhost:9550/api/catalogs/all-item-catalogs/download-template-file/item_catalog_template_2025-10-21T04-35-06-750Z.csv'
                      },
                      file_size: {
                        type: 'integer',
                        example: 456
                      },
                      content_type: {
                        type: 'string',
                        example: 'text/csv'
                      },
                      description: {
                        type: 'string',
                        example: 'CSV template untuk import data item catalog. Template ini dapat digunakan untuk semua jenis katalog (engine, axle, cabin, steering, transmission).'
                      },
                      sample_data: {
                        type: 'object',
                        properties: {
                          headers: {
                            type: 'array',
                            items: {
                              type: 'string'
                            },
                            example: ['target_id', 'part_number', 'catalog_item_name_en', 'catalog_item_name_ch', 'description', 'quantity']
                          },
                          example_rows: {
                            type: 'integer',
                            example: 3
                          }
                        }
                      }
                    }
                  },
                  message: {
                    type: 'string',
                    example: 'Template CSV berhasil dibuat'
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

  '/all-item-catalogs/download-template-file/{filename}': {
    get: {
      tags: ['All Item Catalogs'],
      summary: 'Download CSV template file',
      description: 'Download the actual CSV template file for importing item catalog data.',
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'filename',
          in: 'path',
          required: true,
          description: 'Filename of the template to download',
          schema: {
            type: 'string'
          },
          example: 'item_catalog_template_2025-10-21T04-35-06-750Z.csv'
        }
      ],
      responses: {
        200: {
          description: 'CSV template file successfully downloaded',
          content: {
            'text/csv': {
              schema: {
                type: 'string',
                format: 'binary'
              }
            }
          },
          headers: {
            'Content-Disposition': {
              description: 'Attachment filename',
              schema: {
                type: 'string',
                example: 'attachment; filename="item_catalog_template.csv"'
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
        404: {
          description: 'Template file not found',
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
