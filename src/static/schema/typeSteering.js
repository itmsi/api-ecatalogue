/**
 * Swagger Schema Definitions for Type Steering Module
 */

const typeSteeringSchemas = {
  TypeSteeringGetInput: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Page number for pagination'
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Number of items per page'
      },
      search: {
        type: 'string',
        maxLength: 255,
        default: '',
        description: 'Search term to filter results'
      },
      sort_by: {
        type: 'string',
        enum: ['created_at', 'updated_at', 'type_steering_name_en', 'type_steering_name_cn'],
        default: 'created_at',
        description: 'Field to sort by'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      }
    }
  },
  TypeSteeringCreateInput: {
    type: 'object',
    properties: {
      type_steering_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Type steering name in English'
      },
      type_steering_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Type steering name in Chinese'
      },
      type_steering_description: {
        type: 'string',
        description: 'Type steering description'
      }
    }
  },
  TypeSteeringUpdateInput: {
    type: 'object',
    properties: {
      type_steering_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Type steering name in English'
      },
      type_steering_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Type steering name in Chinese'
      },
      type_steering_description: {
        type: 'string',
        description: 'Type steering description'
      }
    }
  },
  TypeSteeringResponse: {
    type: 'object',
    properties: {
      type_steering_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for type steering',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      type_steering_name_en: {
        type: 'string',
        nullable: true,
        description: 'Type steering name in English',
        example: 'Power Steering'
      },
      type_steering_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Type steering name in Chinese',
        example: '动力转向'
      },
      type_steering_description: {
        type: 'string',
        nullable: true,
        description: 'Type steering description',
        example: 'Kemudi dengan bantuan tenaga'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp',
        example: '2025-01-17T10:30:00.000Z'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who created the record',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp',
        example: '2025-01-17T10:30:00.000Z'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who last updated the record',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      deleted_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Soft delete timestamp',
        example: null
      },
      deleted_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who deleted the record',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag',
        example: false
      }
    }
  },
  TypeSteeringPaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/TypeSteeringResponse'
        },
        description: 'Array of type steering records'
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
            description: 'Number of items per page',
            example: 10
          },
          total: {
            type: 'integer',
            description: 'Total number of records',
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

module.exports = typeSteeringSchemas;

