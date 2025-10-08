/**
 * Swagger Schema Definitions for Type Axel Module
 */

const typeAxelSchemas = {
  TypeAxel: {
    type: 'object',
    properties: {
      type_axel_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for type axel',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      type_axel_name_en: {
        type: 'string',
        nullable: true,
        description: 'Type axel name in English',
        example: 'Standard Type'
      },
      type_axel_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Type axel name in Chinese',
        example: '标准类型'
      },
      type_axel_description: {
        type: 'string',
        nullable: true,
        description: 'Description of the type axel',
        example: 'Standard type for axel'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp',
        example: '2025-01-01T00:00:00.000Z'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User ID who created this record',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp',
        example: '2025-01-01T00:00:00.000Z'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User ID who last updated this record',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      deleted_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Deletion timestamp (null if not deleted)',
        example: null
      },
      deleted_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User ID who deleted this record',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Delete flag',
        example: false
      }
    }
  },
  TypeAxelInput: {
    type: 'object',
    properties: {
      type_axel_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Type axel name in English',
        example: 'Standard Type'
      },
      type_axel_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Type axel name in Chinese',
        example: '标准类型'
      },
      type_axel_description: {
        type: 'string',
        maxLength: 1000,
        description: 'Description of the type axel',
        example: 'Standard type for axel'
      }
    }
  },
  TypeAxelGetInput: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        description: 'Page number',
        example: 1
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        description: 'Items per page',
        example: 10
      },
      search: {
        type: 'string',
        maxLength: 255,
        description: 'Search keyword for name or description',
        example: 'standard'
      },
      sort_by: {
        type: 'string',
        enum: ['created_at', 'updated_at', 'type_axel_name_en', 'type_axel_name_cn'],
        description: 'Field to sort by',
        example: 'created_at'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        description: 'Sort order',
        example: 'desc'
      }
    }
  },
  TypeAxelListResponse: {
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
            items: { $ref: '#/components/schemas/TypeAxel' }
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
                example: 100
              },
              totalPages: {
                type: 'integer',
                description: 'Total number of pages',
                example: 10
              }
            }
          }
        }
      }
    }
  },
  TypeAxelResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: { $ref: '#/components/schemas/TypeAxel' },
      message: {
        type: 'string',
        example: 'Type axel berhasil dibuat'
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

module.exports = typeAxelSchemas;

