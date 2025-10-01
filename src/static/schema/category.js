/**
 * Swagger Schema Definitions for Category Module
 */

const categorySchemas = {
  Category: {
    type: 'object',
    properties: {
      category_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique category identifier',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      category_name_en: {
        type: 'string',
        description: 'Name of the category (English)',
        example: 'Electronics'
      },
      category_name_ch: {
        type: 'string',
        nullable: true,
        description: 'Name of the category (Chinese)',
        example: '电子产品'
      },
      category_description: {
        type: 'string',
        nullable: true,
        description: 'Description of the category',
        example: 'Electronic devices and gadgets'
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
        description: 'User ID who created the category',
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
        description: 'User ID who last updated the category',
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
        description: 'User ID who deleted the category',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag',
        example: false
      }
    }
  },
  CategoryInput: {
    type: 'object',
    required: ['category_name_en'],
    properties: {
      category_name_en: {
        type: 'string',
        minLength: 3,
        maxLength: 255,
        description: 'Name of the category (English)',
        example: 'Electronics'
      },
      category_name_ch: {
        type: 'string',
        maxLength: 255,
        description: 'Name of the category (Chinese)',
        example: '电子产品'
      },
      category_description: {
        type: 'string',
        maxLength: 1000,
        description: 'Description of the category',
        example: 'Electronic devices and gadgets'
      }
    },
    description: 'created_by akan diisi otomatis dari token'
  },
  CategoryUpdateInput: {
    type: 'object',
    properties: {
      category_name_en: {
        type: 'string',
        minLength: 3,
        maxLength: 255,
        description: 'Name of the category (English)',
        example: 'Electronics Updated'
      },
      category_name_ch: {
        type: 'string',
        maxLength: 255,
        description: 'Name of the category (Chinese)',
        example: '电子产品更新'
      },
      category_description: {
        type: 'string',
        maxLength: 1000,
        description: 'Description of the category',
        example: 'Electronic devices and gadgets - updated description'
      }
    },
    description: 'updated_by akan diisi otomatis dari token'
  },
  CategoryRestoreInput: {
    type: 'object',
    properties: {},
    description: 'updated_by akan diisi otomatis dari token saat restore'
  },
  CategoryGetInput: {
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
      sort_by: {
        type: 'string',
        default: 'created_at',
        description: 'Field to sort by',
        example: 'created_at'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'asc',
        description: 'Sort order',
        example: 'asc'
      },
      search: {
        type: 'string',
        default: '',
        description: 'Search keyword',
        example: ''
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
        example: 'Kategori tidak ditemukan'
      },
      details: {
        type: 'object',
        description: 'Additional error details',
        nullable: true
      }
    }
  }
};

module.exports = categorySchemas;
