/**
 * Swagger Schema Definitions for Master PDF Module
 */

const masterPdfSchemas = {
  // Swagger Tags
  MasterPdfTag: {
    name: 'Master PDF',
    description: 'API untuk mengelola data master PDF dengan berbagai operasi pencarian dan filtering'
  },

  // Swagger Endpoint Documentation
  MasterPdfEndpoints: {
    '/api/v1/master-pdf/get': {
      post: {
        summary: 'Mendapatkan daftar master PDF dengan pagination dan filtering',
        tags: ['Master PDF'],
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
                  $ref: '#/components/schemas/MasterPdfListResponse'
                }
              }
            }
          }
        }
      }
    },

    '/api/v1/master-pdf/{id}': {
      get: {
        summary: 'Mendapatkan master PDF berdasarkan ID',
        tags: ['Master PDF'],
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
            description: 'ID master PDF'
          }
        ],
        responses: {
          200: {
            description: 'Berhasil mendapatkan data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MasterPdfDetailResponse'
                }
              }
            }
          }
        }
      }
    },

    '/api/v1/master-pdf/stats': {
      get: {
        summary: 'Mendapatkan statistik master PDF',
        tags: ['Master PDF'],
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: 'Berhasil mendapatkan statistik',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MasterPdfStatsResponse'
                }
              }
            }
          }
        }
      }
    },

    '/api/v1/master-pdf/search': {
      post: {
        summary: 'Mencari master PDF berdasarkan kriteria',
        tags: ['Master PDF'],
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
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Berhasil melakukan pencarian',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MasterPdfSearchResponse'
                }
              }
            }
          }
        }
      }
    },

    '/api/v1/master-pdf/categories': {
      get: {
        summary: 'Mendapatkan daftar kategori yang tersedia',
        tags: ['Master PDF'],
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: 'Berhasil mendapatkan daftar kategori',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MasterPdfCategoriesResponse'
                }
              }
            }
          }
        }
      }
    },

    '/api/v1/master-pdf/statuses': {
      get: {
        summary: 'Mendapatkan daftar status yang tersedia',
        tags: ['Master PDF'],
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: 'Berhasil mendapatkan daftar status',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MasterPdfStatusesResponse'
                }
              }
            }
          }
        }
      }
    }
  },

  // Component Schemas
  MasterPdfGetInput: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Nomor halaman'
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Jumlah data per halaman'
      },
      search: {
        type: 'string',
        maxLength: 255,
        description: 'Kata kunci pencarian'
      },
      sort_by: {
        type: 'string',
        enum: ['id', 'name', 'description', 'file_path', 'file_size', 'category', 'status', 'created_at', 'updated_at'],
        default: 'created_at',
        description: 'Field untuk sorting'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Urutan sorting'
      },
      status: {
        type: 'string',
        maxLength: 50,
        description: 'Filter berdasarkan status'
      },
      category: {
        type: 'string',
        maxLength: 100,
        description: 'Filter berdasarkan kategori'
      }
    }
  },

  MasterPdfSearchInput: {
    type: 'object',
    properties: {
      search_term: {
        type: 'string',
        maxLength: 255,
        description: 'Kata kunci pencarian'
      },
      category: {
        type: 'string',
        maxLength: 100,
        description: 'Filter berdasarkan kategori'
      },
      status: {
        type: 'string',
        maxLength: 50,
        description: 'Filter berdasarkan status'
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 50,
        description: 'Jumlah data maksimal yang dikembalikan'
      }
    }
  },

  MasterPdfData: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'ID master PDF'
      },
      name: {
        type: 'string',
        description: 'Nama file PDF'
      },
      description: {
        type: 'string',
        description: 'Deskripsi file PDF'
      },
      file_path: {
        type: 'string',
        description: 'Path file PDF'
      },
      file_size: {
        type: 'integer',
        description: 'Ukuran file dalam bytes'
      },
      category: {
        type: 'string',
        description: 'Kategori file PDF'
      },
      status: {
        type: 'string',
        description: 'Status file PDF'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Tanggal dibuat'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Tanggal diupdate'
      }
    }
  },

  MasterPdfListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      message: {
        type: 'string',
        example: 'Data master PDF berhasil diambil'
      },
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/MasterPdfData'
        }
      },
      pagination: {
        type: 'object',
        properties: {
          current_page: {
            type: 'integer',
            example: 1
          },
          per_page: {
            type: 'integer',
            example: 10
          },
          total: {
            type: 'integer',
            example: 100
          },
          total_pages: {
            type: 'integer',
            example: 10
          },
          has_next_page: {
            type: 'boolean',
            example: true
          },
          has_prev_page: {
            type: 'boolean',
            example: false
          }
        }
      }
    }
  },

  MasterPdfDetailResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      message: {
        type: 'string',
        example: 'Data master PDF berhasil diambil'
      },
      data: {
        $ref: '#/components/schemas/MasterPdfData'
      }
    }
  },

  MasterPdfStatsResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      message: {
        type: 'string',
        example: 'Statistik master PDF berhasil diambil'
      },
      data: {
        type: 'object',
        properties: {
          total_count: {
            type: 'integer',
            example: 100
          },
          status_stats: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  example: 'active'
                },
                count: {
                  type: 'integer',
                  example: 80
                }
              }
            }
          },
          category_stats: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  example: 'manual'
                },
                count: {
                  type: 'integer',
                  example: 50
                }
              }
            }
          },
          recent_uploads: {
            type: 'integer',
            example: 5
          },
          file_size_stats: {
            type: 'object',
            properties: {
              total_files: {
                type: 'integer',
                example: 100
              },
              total_size: {
                type: 'integer',
                example: 1048576000
              },
              avg_size: {
                type: 'number',
                example: 10485760
              },
              min_size: {
                type: 'integer',
                example: 1024
              },
              max_size: {
                type: 'integer',
                example: 104857600
              }
            }
          }
        }
      }
    }
  },

  MasterPdfSearchResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      message: {
        type: 'string',
        example: 'Pencarian master PDF berhasil'
      },
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/MasterPdfData'
        }
      },
      total: {
        type: 'integer',
        example: 5
      }
    }
  },

  MasterPdfCategoriesResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      message: {
        type: 'string',
        example: 'Daftar kategori berhasil diambil'
      },
      data: {
        type: 'array',
        items: {
          type: 'string'
        },
        example: ['manual', 'catalog', 'brochure', 'specification']
      }
    }
  },

  MasterPdfStatusesResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      message: {
        type: 'string',
        example: 'Daftar status berhasil diambil'
      },
      data: {
        type: 'array',
        items: {
          type: 'string'
        },
        example: ['active', 'inactive', 'draft', 'archived']
      }
    }
  }
};

module.exports = masterPdfSchemas;
