/**
 * Swagger Schema Definitions for Steering Module
 */

const steeringSchemas = {
  Steering: {
    type: 'object',
    properties: {
      steering_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk steering',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      steering_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama steering dalam bahasa Inggris',
        example: 'Power Steering'
      },
      steering_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Nama steering dalam bahasa China',
        example: '动力转向'
      },
      steering_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi steering',
        example: 'Power steering system'
      },
      type_steerings: {
        type: 'array',
        description: 'Array of related type steerings',
        items: {
          type: 'object',
          properties: {
            type_steering_id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier untuk type steering',
              example: '123e4567-e89b-12d3-a456-426614174001'
            },
            type_steering_name_en: {
              type: 'string',
              nullable: true,
              description: 'Nama type steering dalam bahasa Inggris',
              example: 'Electric Power Steering'
            },
            type_steering_name_cn: {
              type: 'string',
              nullable: true,
              description: 'Nama type steering dalam bahasa China',
              example: '电动助力转向'
            },
            type_steering_description: {
              type: 'string',
              nullable: true,
              description: 'Deskripsi type steering',
              example: 'Electric power steering description'
            }
          }
        }
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
        example: null
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
        description: 'User yang menghapus',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Flag soft delete',
        example: false,
        default: false
      }
    }
  },
  SteeringInput: {
    type: 'object',
    properties: {
      steering_name_en: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama steering dalam bahasa Inggris',
        example: 'Power Steering'
      },
      steering_name_cn: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama steering dalam bahasa China',
        example: '动力转向'
      },
      steering_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi steering',
        example: 'Power steering system'
      },
      type_steerings: {
        type: 'array',
        description: 'Array of type steerings to create and associate',
        items: {
          type: 'object',
          properties: {
            type_steering_name_en: {
              type: 'string',
              maxLength: 255,
              description: 'Nama type steering dalam bahasa Inggris',
              example: 'Electric Power Steering'
            },
            type_steering_name_cn: {
              type: 'string',
              maxLength: 255,
              description: 'Nama type steering dalam bahasa China',
              example: '电动助力转向'
            },
            type_steering_description: {
              type: 'string',
              nullable: true,
              description: 'Deskripsi type steering',
              example: 'Electric power steering description'
            }
          }
        }
      }
    }
  },
  SteeringUpdateInput: {
    type: 'object',
    properties: {
      steering_name_en: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama steering dalam bahasa Inggris',
        example: 'Hydraulic Power Steering'
      },
      steering_name_cn: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama steering dalam bahasa China',
        example: '液压助力转向'
      },
      steering_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi steering',
        example: 'Hydraulic power steering system'
      },
      type_steerings: {
        type: 'array',
        description: 'Array of type steerings to associate (will replace existing associations)',
        items: {
          type: 'object',
          properties: {
            type_steering_name_en: {
              type: 'string',
              maxLength: 255,
              description: 'Nama type steering dalam bahasa Inggris',
              example: 'Hydraulic Assist'
            },
            type_steering_name_cn: {
              type: 'string',
              maxLength: 255,
              description: 'Nama type steering dalam bahasa China',
              example: '液压辅助'
            },
            type_steering_description: {
              type: 'string',
              nullable: true,
              description: 'Deskripsi type steering',
              example: 'Hydraulic assist description'
            }
          }
        }
      }
    }
  },
  SteeringGetInput: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Page number',
        example: 1
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Items per page (max 100)',
        example: 10
      },
      search: {
        type: 'string',
        default: '',
        description: 'Search keyword (steering names and description)',
        example: 'power'
      },
      sort_by: {
        type: 'string',
        enum: ['created_at', 'steering_name_en', 'steering_name_cn', 'updated_at'],
        default: 'created_at',
        description: 'Field to sort by',
        example: 'created_at'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order',
        example: 'desc'
      }
    }
  },
  SteeringPaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Steering'
        }
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
  },
  TypeSteering: {
    type: 'object',
    properties: {
      type_steering_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk type steering',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      type_steering_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama type steering dalam bahasa Inggris',
        example: 'Electric Power Steering'
      },
      type_steering_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Nama type steering dalam bahasa China',
        example: '电动助力转向'
      },
      type_steering_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi type steering',
        example: 'Electric power steering description'
      }
    }
  }
};

module.exports = steeringSchemas;

