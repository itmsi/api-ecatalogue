/**
 * Swagger Schema Definitions for Brands Module
 */

const brandsSchemas = {
  Brand: {
    type: 'object',
    properties: {
      brand_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk brand',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      brand_code: {
        type: 'string',
        nullable: true,
        description: 'Kode brand',
        example: 'BRD001'
      },
      brand_name: {
        type: 'string',
        nullable: true,
        description: 'Nama brand',
        example: 'Brand Example'
      },
      brand_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi brand',
        example: 'This is a brand description'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp pembuatan',
        example: '2025-01-01T00:00:00.000Z'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'ID user yang membuat',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp update terakhir',
        example: '2025-01-01T00:00:00.000Z'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'ID user yang melakukan update terakhir',
        example: null
      },
      deleted_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Timestamp soft delete (null jika tidak dihapus)',
        example: null
      },
      deleted_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'ID user yang menghapus',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Flag soft delete',
        example: false
      }
    }
  },
  BrandInput: {
    type: 'object',
    properties: {
      brand_code: {
        type: 'string',
        maxLength: 255,
        description: 'Kode brand',
        example: 'BRD001'
      },
      brand_name: {
        type: 'string',
        maxLength: 255,
        description: 'Nama brand',
        example: 'Brand Example'
      },
      brand_description: {
        type: 'string',
        maxLength: 1000,
        description: 'Deskripsi brand',
        example: 'This is a brand description'
      }
    }
  },
  BrandListRequest: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        description: 'Nomor halaman',
        example: 1
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        description: 'Jumlah item per halaman',
        example: 10
      },
      search: {
        type: 'string',
        maxLength: 255,
        description: 'Kata kunci pencarian (brand_name, brand_code, brand_description)',
        example: ''
      },
      sort_by: {
        type: 'string',
        enum: ['created_at', 'updated_at', 'brand_name', 'brand_code'],
        description: 'Field untuk sorting',
        example: 'created_at'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        description: 'Urutan sorting',
        example: 'desc'
      }
    }
  },
  BrandListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Brand'
            }
          },
          pagination: {
            $ref: '#/components/schemas/Pagination'
          }
        }
      }
    }
  },
  BrandResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: {
        $ref: '#/components/schemas/Brand'
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Brand berhasil dibuat'
      }
    }
  },
  Pagination: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        description: 'Current page number',
        example: 1
      },
      limit: {
        type: 'integer',
        description: 'Items per page',
        example: 10
      },
      total: {
        type: 'integer',
        description: 'Total number of items',
        example: 100
      },
      totalPages: {
        type: 'integer',
        description: 'Total number of pages',
        example: 10
      }
    }
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false
      },
      error: {
        type: 'string',
        description: 'Error message',
        example: 'Data tidak ditemukan'
      },
      details: {
        type: 'object',
        description: 'Additional error details',
        nullable: true
      }
    }
  }
};

module.exports = brandsSchemas;
