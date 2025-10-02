/**
 * Swagger Schema Definitions for Locations Module
 */

const locationsSchemas = {
  Location: {
    type: 'object',
    properties: {
      location_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for location',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      location_name: {
        type: 'string',
        nullable: true,
        description: 'Name of the location',
        example: 'Jakarta Pusat'
      },
      location_description: {
        type: 'string',
        nullable: true,
        description: 'Description of the location',
        example: 'Kantor pusat di Jakarta Pusat'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp',
        example: '2025-01-01T00:00:00.000Z'
      },
      created_by: {
        type: 'string',
        nullable: true,
        description: 'User who created the record',
        example: 'admin'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp',
        example: '2025-01-01T00:00:00.000Z'
      },
      updated_by: {
        type: 'string',
        nullable: true,
        description: 'User who last updated the record',
        example: 'admin'
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
  LocationInput: {
    type: 'object',
    properties: {
      location_name: {
        type: 'string',
        maxLength: 255,
        description: 'Name of the location',
        example: 'Jakarta Pusat'
      },
      location_description: {
        type: 'string',
        maxLength: 1000,
        description: 'Description of the location',
        example: 'Kantor pusat di Jakarta Pusat'
      }
    }
  },
  LocationListRequest: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        description: 'Page number for pagination',
        example: 1
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        description: 'Number of items per page',
        example: 10
      },
      search: {
        type: 'string',
        description: 'Search term for filtering locations',
        example: 'Jakarta'
      },
      sort_by: {
        type: 'string',
        enum: ['location_id', 'location_name', 'created_at', 'updated_at'],
        description: 'Column to sort by',
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

module.exports = locationsSchemas;
