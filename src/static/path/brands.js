/**
 * Swagger Path Definitions for Brands Module
 */

const brandsPaths = {
  '/brands/get': {
    post: {
      tags: ['Brands'],
      summary: 'Get all brands with pagination and filters',
      description: 'Mengambil semua data brands dengan pagination, sorting, dan filtering',
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BrandListRequest'
            },
            examples: {
              default: {
                summary: 'Default request',
                value: {
                  page: 1,
                  limit: 10,
                  search: '',
                  sort_by: 'created_at',
                  sort_order: 'desc'
                }
              },
              withSearch: {
                summary: 'With search',
                value: {
                  page: 1,
                  limit: 20,
                  search: 'example',
                  sort_by: 'brand_name',
                  sort_order: 'asc'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BrandListResponse'
              }
            }
          }
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        '401': {
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
  '/brands/create': {
    post: {
      tags: ['Brands'],
      summary: 'Create new brand',
      description: 'Membuat data brand baru',
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
              $ref: '#/components/schemas/BrandInput'
            },
            examples: {
              default: {
                summary: 'Basic brand',
                value: {
                  brand_code: 'BRD001',
                  brand_name: 'Brand Example',
                  brand_description: 'This is a brand description'
                }
              },
              minimal: {
                summary: 'Minimal data',
                value: {
                  brand_name: 'Simple Brand'
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Brand created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BrandResponse'
              }
            }
          }
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        '401': {
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
  '/brands/{id}': {
    get: {
      tags: ['Brands'],
      summary: 'Get brand by ID',
      description: 'Mengambil data brand berdasarkan ID',
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
          description: 'Brand ID',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BrandResponse'
              }
            }
          }
        },
        '404': {
          description: 'Brand not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        '401': {
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
    },
    put: {
      tags: ['Brands'],
      summary: 'Update brand',
      description: 'Mengupdate data brand',
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
          description: 'Brand ID',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BrandInput'
            },
            examples: {
              update: {
                summary: 'Update brand',
                value: {
                  brand_code: 'BRD001-UPDATED',
                  brand_name: 'Updated Brand Name',
                  brand_description: 'Updated description'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Brand updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BrandResponse'
              }
            }
          }
        },
        '404': {
          description: 'Brand not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        '401': {
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
    },
    delete: {
      tags: ['Brands'],
      summary: 'Delete brand (soft delete)',
      description: 'Menghapus data brand (soft delete)',
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
          description: 'Brand ID',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      responses: {
        '200': {
          description: 'Brand deleted successfully',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  {
                    $ref: '#/components/schemas/BrandResponse'
                  },
                  {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'null'
                      },
                      message: {
                        example: 'Brand berhasil dihapus'
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        '404': {
          description: 'Brand not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        '401': {
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
  }
};

module.exports = brandsPaths;
