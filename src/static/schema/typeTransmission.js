/**
 * Swagger Schema Definitions for Type Transmission Module
 */

const typeTransmissionSchemas = {
  TypeTransmissionGetInput: {
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
        enum: ['created_at', 'updated_at', 'type_transmission_name_en', 'type_transmission_name_cn'],
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
  TypeTransmissionCreateInput: {
    type: 'object',
    properties: {
      type_transmission_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Type transmission name in English'
      },
      type_transmission_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Type transmission name in Chinese'
      },
      type_transmission_description: {
        type: 'string',
        description: 'Type transmission description'
      }
    }
  },
  TypeTransmissionUpdateInput: {
    type: 'object',
    properties: {
      type_transmission_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Type transmission name in English'
      },
      type_transmission_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Type transmission name in Chinese'
      },
      type_transmission_description: {
        type: 'string',
        description: 'Type transmission description'
      }
    }
  },
  TypeTransmissionResponse: {
    type: 'object',
    properties: {
      type_transmission_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for type transmission',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      type_transmission_name_en: {
        type: 'string',
        nullable: true,
        description: 'Type transmission name in English',
        example: 'Manual Transmission'
      },
      type_transmission_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Type transmission name in Chinese',
        example: '手动变速器'
      },
      type_transmission_description: {
        type: 'string',
        nullable: true,
        description: 'Type transmission description',
        example: 'Transmission yang dioperasikan secara manual'
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
  TypeTransmissionPaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/TypeTransmissionResponse'
        },
        description: 'Array of type transmission records'
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

module.exports = typeTransmissionSchemas;
