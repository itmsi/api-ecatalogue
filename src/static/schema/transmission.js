/**
 * Swagger Schema Definitions for Transmission Module
 */

const transmissionSchemas = {
  TransmissionGetInput: {
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
        enum: ['created_at', 'updated_at', 'transmission_name_en', 'transmission_name_cn'],
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
  TypeTransmissionInput: {
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
  TransmissionCreateInput: {
    type: 'object',
    properties: {
      transmission_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Transmission name in English'
      },
      transmission_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Transmission name in Chinese'
      },
      transmission_description: {
        type: 'string',
        description: 'Transmission description'
      },
      type_transmissions: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/TypeTransmissionInput'
        },
        description: 'Array of type transmissions'
      }
    }
  },
  TransmissionUpdateInput: {
    type: 'object',
    properties: {
      transmission_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Transmission name in English'
      },
      transmission_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Transmission name in Chinese'
      },
      transmission_description: {
        type: 'string',
        description: 'Transmission description'
      },
      type_transmissions: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/TypeTransmissionInput'
        },
        description: 'Array of type transmissions'
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
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      type_transmission_name_en: {
        type: 'string',
        nullable: true,
        description: 'Type transmission name in English',
        example: 'Manual Type'
      },
      type_transmission_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Type transmission name in Chinese',
        example: '手动类型'
      },
      type_transmission_description: {
        type: 'string',
        nullable: true,
        description: 'Type transmission description',
        example: 'Manual transmission type'
      }
    }
  },
  TransmissionResponse: {
    type: 'object',
    properties: {
      transmission_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for transmission',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      transmission_name_en: {
        type: 'string',
        nullable: true,
        description: 'Transmission name in English',
        example: 'Standard Transmission'
      },
      transmission_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Transmission name in Chinese',
        example: '标准传输'
      },
      transmission_description: {
        type: 'string',
        nullable: true,
        description: 'Transmission description',
        example: 'Standard transmission type for vehicles'
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
  TransmissionWithTypesResponse: {
    allOf: [
      {
        $ref: '#/components/schemas/TransmissionResponse'
      },
      {
        type: 'object',
        properties: {
          type_transmissions: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/TypeTransmissionResponse'
            },
            description: 'Array of related type transmissions'
          }
        }
      }
    ]
  },
  TransmissionPaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/TransmissionResponse'
        },
        description: 'Array of transmission records'
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

module.exports = transmissionSchemas;
