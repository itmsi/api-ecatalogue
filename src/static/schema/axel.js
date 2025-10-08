/**
 * Swagger Schema Definitions for Axel Module
 */

const axelSchemas = {
  Axel: {
    type: 'object',
    properties: {
      axel_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk axel',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      axel_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama axel dalam bahasa Inggris',
        example: 'Standard Axel'
      },
      axel_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Nama axel dalam bahasa China',
        example: '标准轴'
      },
      axel_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi axel',
        example: 'Standard axel type for trucks'
      },
      type_axels: {
        type: 'array',
        description: 'Array of related type axels',
        items: {
          type: 'object',
          properties: {
            type_axel_id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier untuk type axel',
              example: '123e4567-e89b-12d3-a456-426614174001'
            },
            type_axel_name_en: {
              type: 'string',
              nullable: true,
              description: 'Nama type axel dalam bahasa Inggris',
              example: 'Front Axel'
            },
            type_axel_name_cn: {
              type: 'string',
              nullable: true,
              description: 'Nama type axel dalam bahasa China',
              example: '前轴'
            },
            type_axel_description: {
              type: 'string',
              nullable: true,
              description: 'Deskripsi type axel',
              example: 'Front axel type description'
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
  AxelInput: {
    type: 'object',
    properties: {
      axel_name_en: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama axel dalam bahasa Inggris',
        example: 'Standard Axel'
      },
      axel_name_cn: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama axel dalam bahasa China',
        example: '标准轴'
      },
      axel_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi axel',
        example: 'Standard axel type for trucks'
      },
      type_axels: {
        type: 'array',
        description: 'Array of type axels to create and associate',
        items: {
          type: 'object',
          properties: {
            type_axel_name_en: {
              type: 'string',
              maxLength: 255,
              description: 'Nama type axel dalam bahasa Inggris',
              example: 'Front Axel'
            },
            type_axel_name_cn: {
              type: 'string',
              maxLength: 255,
              description: 'Nama type axel dalam bahasa China',
              example: '前轴'
            },
            type_axel_description: {
              type: 'string',
              nullable: true,
              description: 'Deskripsi type axel',
              example: 'Front axel type description'
            }
          }
        }
      }
    }
  },
  AxelUpdateInput: {
    type: 'object',
    properties: {
      axel_name_en: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama axel dalam bahasa Inggris',
        example: 'Standard Axel'
      },
      axel_name_cn: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama axel dalam bahasa China',
        example: '标准轴'
      },
      axel_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi axel',
        example: 'Standard axel type for trucks'
      },
      type_axels: {
        type: 'array',
        description: 'Array of type axels to associate (will replace existing associations)',
        items: {
          type: 'object',
          properties: {
            type_axel_id: {
              type: 'string',
              format: 'uuid',
              description: 'UUID of existing type axel',
              example: '123e4567-e89b-12d3-a456-426614174001'
            }
          },
          required: ['type_axel_id']
        }
      }
    }
  },
  AxelGetInput: {
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
        description: 'Search keyword (axel names and description)',
        example: 'standard'
      },
      sort_by: {
        type: 'string',
        enum: ['created_at', 'axel_name_en', 'axel_name_cn', 'updated_at'],
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
  AxelPaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Axel'
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
  TypeAxel: {
    type: 'object',
    properties: {
      type_axel_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk type axel',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      type_axel_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama type axel dalam bahasa Inggris',
        example: 'Front Axel'
      },
      type_axel_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Nama type axel dalam bahasa China',
        example: '前轴'
      },
      type_axel_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi type axel',
        example: 'Front axel type description'
      }
    }
  }
};

module.exports = axelSchemas;

