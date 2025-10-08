/**
 * Swagger Schema Definitions for Cabines Module
 */

const cabinesSchemas = {
  Cabines: {
    type: 'object',
    properties: {
      cabines_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk cabines',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      cabines_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama cabines dalam bahasa Inggris',
        example: 'Standard Cab'
      },
      cabines_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Nama cabines dalam bahasa China',
        example: '标准驾驶室'
      },
      cabines_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi cabines',
        example: 'Standard cab type for trucks'
      },
      type_cabines: {
        type: 'array',
        description: 'Array of related type cabines',
        items: {
          type: 'object',
          properties: {
            type_cabine_id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier untuk type cabine',
              example: '123e4567-e89b-12d3-a456-426614174001'
            },
            type_cabine_name_en: {
              type: 'string',
              nullable: true,
              description: 'Nama type cabine dalam bahasa Inggris',
              example: 'Standard Cab'
            },
            type_cabine_name_cn: {
              type: 'string',
              nullable: true,
              description: 'Nama type cabine dalam bahasa China',
              example: '标准驾驶室'
            },
            type_cabine_description: {
              type: 'string',
              nullable: true,
              description: 'Deskripsi type cabine',
              example: 'Standard cab type description'
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
  CabinesInput: {
    type: 'object',
    properties: {
      cabines_name_en: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama cabines dalam bahasa Inggris',
        example: 'Standard Cab'
      },
      cabines_name_cn: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama cabines dalam bahasa China',
        example: '标准驾驶室'
      },
      cabines_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi cabines',
        example: 'Standard cab type for trucks'
      },
      type_cabines: {
        type: 'array',
        description: 'Array of type cabines to create and associate',
        items: {
          type: 'object',
          properties: {
            type_cabine_name_en: {
              type: 'string',
              maxLength: 255,
              description: 'Nama type cabine dalam bahasa Inggris',
              example: 'Standard Cab'
            },
            type_cabine_name_cn: {
              type: 'string',
              maxLength: 255,
              description: 'Nama type cabine dalam bahasa China',
              example: '标准驾驶室'
            },
            type_cabine_description: {
              type: 'string',
              nullable: true,
              description: 'Deskripsi type cabine',
              example: 'Standard cab type description'
            }
          }
        }
      }
    }
  },
  CabinesUpdateInput: {
    type: 'object',
    properties: {
      cabines_name_en: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama cabines dalam bahasa Inggris',
        example: 'Standard Cab'
      },
      cabines_name_cn: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama cabines dalam bahasa China',
        example: '标准驾驶室'
      },
      cabines_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi cabines',
        example: 'Standard cab type for trucks'
      },
      type_cabines: {
        type: 'array',
        description: 'Array of type cabines to associate (will replace existing associations)',
        items: {
          type: 'object',
          properties: {
            type_cabine_id: {
              type: 'string',
              format: 'uuid',
              description: 'UUID of existing type cabine',
              example: '123e4567-e89b-12d3-a456-426614174001'
            }
          },
          required: ['type_cabine_id']
        }
      }
    }
  },
  CabinesGetInput: {
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
        description: 'Search keyword (cabines names and description)',
        example: 'standard'
      },
      sort_by: {
        type: 'string',
        enum: ['created_at', 'cabines_name_en', 'cabines_name_cn', 'updated_at'],
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
  CabinesPaginationResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Cabines'
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
  TypeCabine: {
    type: 'object',
    properties: {
      type_cabine_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk type cabine',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      type_cabine_name_en: {
        type: 'string',
        nullable: true,
        description: 'Nama type cabine dalam bahasa Inggris',
        example: 'Standard Cab'
      },
      type_cabine_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Nama type cabine dalam bahasa China',
        example: '标准驾驶室'
      },
      type_cabine_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi type cabine',
        example: 'Standard cab type description'
      }
    }
  }
};

module.exports = cabinesSchemas;
