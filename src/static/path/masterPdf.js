/**
 * API Path Definitions for Master PDF Module
 */

const masterPdfPaths = {
  '/master-pdf/get': {
    post: {
      tags: ['Master PDF'],
      summary: 'Get master PDF data with pagination and filtering',
      description: 'Retrieve a paginated list of master PDF files with optional filtering by search, status, category, and sorting',
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
              $ref: '#/components/schemas/MasterPdfGetInput'
            },
            example: {
              page: 1,
              limit: 10,
              search: '',
              sort_by: 'created_at',
              sort_order: 'desc',
              status: '',
              category: ''
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successfully retrieved master PDF data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MasterPdfListResponse'
              },
              example: {
                success: true,
                message: 'Data master PDF berhasil diambil',
                data: [
                  {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    name: 'Product Manual 2024',
                    description: 'Manual produk terbaru tahun 2024',
                    file_path: '/uploads/manuals/product_manual_2024.pdf',
                    file_size: 2048576,
                    category: 'manual',
                    status: 'active',
                    created_at: '2024-01-15T10:30:00Z',
                    updated_at: '2024-01-15T10:30:00Z'
                  }
                ],
                pagination: {
                  current_page: 1,
                  per_page: 10,
                  total: 25,
                  total_pages: 3,
                  has_next_page: true,
                  has_prev_page: false
                }
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
              },
              example: {
                success: false,
                message: 'Parameter pagination tidak valid. Page harus >= 1, limit harus 1-100'
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

  '/master-pdf/{id}': {
    get: {
      tags: ['Master PDF'],
      summary: 'Get master PDF by ID',
      description: 'Retrieve a specific master PDF file by its unique identifier',
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
          description: 'Unique identifier of the master PDF file',
          example: '550e8400-e29b-41d4-a716-446655440000'
        }
      ],
      responses: {
        200: {
          description: 'Successfully retrieved master PDF data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MasterPdfDetailResponse'
              },
              example: {
                success: true,
                message: 'Data master PDF berhasil diambil',
                data: {
                  id: '550e8400-e29b-41d4-a716-446655440000',
                  name: 'Product Manual 2024',
                  description: 'Manual produk terbaru tahun 2024',
                  file_path: '/uploads/manuals/product_manual_2024.pdf',
                  file_size: 2048576,
                  category: 'manual',
                  status: 'active',
                  created_at: '2024-01-15T10:30:00Z',
                  updated_at: '2024-01-15T10:30:00Z'
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - Invalid ID format',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'ID master PDF harus berupa UUID yang valid'
              }
            }
          }
        },
        404: {
          description: 'Not found - Master PDF not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Master PDF tidak ditemukan'
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

  '/master-pdf/stats': {
    get: {
      tags: ['Master PDF'],
      summary: 'Get master PDF statistics',
      description: 'Retrieve comprehensive statistics about master PDF files including counts by status, category, and file size metrics',
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Successfully retrieved master PDF statistics',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MasterPdfStatsResponse'
              },
              example: {
                success: true,
                message: 'Statistik master PDF berhasil diambil',
                data: {
                  total_count: 100,
                  status_stats: [
                    {
                      status: 'active',
                      count: 80
                    },
                    {
                      status: 'inactive',
                      count: 20
                    }
                  ],
                  category_stats: [
                    {
                      category: 'manual',
                      count: 50
                    },
                    {
                      category: 'catalog',
                      count: 30
                    },
                    {
                      category: 'brochure',
                      count: 20
                    }
                  ],
                  recent_uploads: 5,
                  file_size_stats: {
                    total_files: 100,
                    total_size: 1048576000,
                    avg_size: 10485760,
                    min_size: 1024,
                    max_size: 104857600
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

  '/master-pdf/search': {
    post: {
      tags: ['Master PDF'],
      summary: 'Search master PDF files',
      description: 'Search master PDF files based on various criteria including search terms, category, and status',
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
              $ref: '#/components/schemas/MasterPdfSearchInput'
            },
            example: {
              search_term: 'manual',
              category: 'manual',
              status: 'active',
              limit: 50
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successfully performed search',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MasterPdfSearchResponse'
              },
              example: {
                success: true,
                message: 'Pencarian master PDF berhasil',
                data: [
                  {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    name: 'Product Manual 2024',
                    description: 'Manual produk terbaru tahun 2024',
                    file_path: '/uploads/manuals/product_manual_2024.pdf',
                    file_size: 2048576,
                    category: 'manual',
                    status: 'active',
                    created_at: '2024-01-15T10:30:00Z',
                    updated_at: '2024-01-15T10:30:00Z'
                  }
                ],
                total: 1
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
              },
              example: {
                success: false,
                message: 'Limit harus berupa angka antara 1-100'
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

  '/master-pdf/categories': {
    get: {
      tags: ['Master PDF'],
      summary: 'Get available categories',
      description: 'Retrieve a list of all available categories for master PDF files',
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Successfully retrieved categories',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MasterPdfCategoriesResponse'
              },
              example: {
                success: true,
                message: 'Daftar kategori berhasil diambil',
                data: ['manual', 'catalog', 'brochure', 'specification', 'guide']
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

  '/master-pdf/statuses': {
    get: {
      tags: ['Master PDF'],
      summary: 'Get available statuses',
      description: 'Retrieve a list of all available statuses for master PDF files',
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Successfully retrieved statuses',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MasterPdfStatusesResponse'
              },
              example: {
                success: true,
                message: 'Daftar status berhasil diambil',
                data: ['active', 'inactive', 'draft', 'archived']
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

module.exports = masterPdfPaths;
