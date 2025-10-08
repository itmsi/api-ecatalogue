/**
 * Swagger Schema Definitions for Type Engine Module
 */

const typeEngineSchemas = {
  TypeEngine: {
    type: 'object',
    properties: {
      type_engine_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk type engine',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      type_engine_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama type engine dalam bahasa Inggris',
        example: 'Diesel Engine'
      },
      type_engine_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Nama type engine dalam bahasa China',
        example: '柴油发动机'
      },
      type_engine_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi type engine',
        example: 'Standard diesel engine type for trucks'
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
        description: 'User yang membuat',
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
        description: 'User yang mengupdate',
        example: '123e4567-e89b-12d3-a456-426614174001'
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
        description: 'User yang menghapus',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Flag soft delete',
        example: false
      }
    }
  },
  TypeEngineGetInput: {
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
        description: 'Jumlah data per halaman',
        example: 10
      },
      search: {
        type: 'string',
        description: 'Kata kunci pencarian',
        example: 'diesel'
      },
      sort_by: {
        type: 'string',
        enum: ['type_engine_id', 'type_engine_name_en', 'type_engine_name_cn', 'created_at', 'updated_at'],
        description: 'Kolom untuk sorting',
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
  TypeEngineCreateInput: {
    type: 'object',
    properties: {
      type_engine_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Nama type engine dalam bahasa Inggris',
        example: 'Diesel Engine'
      },
      type_engine_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Nama type engine dalam bahasa China',
        example: '柴油发动机'
      },
      type_engine_description: {
        type: 'string',
        description: 'Deskripsi type engine',
        example: 'Standard diesel engine type for trucks'
      }
    }
  },
  TypeEngineUpdateInput: {
    type: 'object',
    properties: {
      type_engine_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Nama type engine dalam bahasa Inggris',
        example: 'Updated Diesel Engine'
      },
      type_engine_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Nama type engine dalam bahasa China',
        example: '更新的柴油发动机'
      },
      type_engine_description: {
        type: 'string',
        description: 'Deskripsi type engine',
        example: 'Updated description for diesel engine'
      }
    }
  },
  TypeEnginePaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/TypeEngine'
        },
        description: 'Array of type engines'
      },
      pagination: {
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
            example: 25
          },
          totalPages: {
            type: 'integer',
            description: 'Total number of pages',
            example: 3
          }
        }
      }
    }
  }
};

module.exports = typeEngineSchemas;
