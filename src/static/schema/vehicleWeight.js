/**
 * Swagger Schema Definitions for Vehicle Weight Module
 */

const vehicleWeightSchemas = {
  VehicleWeight: {
    type: 'object',
    properties: {
      vehicle_weight_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier untuk vehicle weight',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      vehicle_weight_code: {
        type: 'string',
        nullable: true,
        description: 'Kode berat kendaraan',
        example: 'VW001'
      },
      vehicle_weight_name: {
        type: 'string',
        nullable: true,
        description: 'Nama berat kendaraan',
        example: 'Berat Ringan'
      },
      vehicle_weight_description: {
        type: 'string',
        nullable: true,
        description: 'Deskripsi berat kendaraan',
        example: 'Kendaraan dengan berat maksimal 1000 kg'
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
        description: 'User yang membuat (dari token)',
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
        description: 'User yang mengupdate (dari token)',
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
        description: 'User yang menghapus (dari token)',
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
  VehicleWeightInput: {
    type: 'object',
    properties: {
      vehicle_weight_code: {
        type: 'string',
        maxLength: 255,
        description: 'Kode berat kendaraan (optional)',
        example: 'VW001'
      },
      vehicle_weight_name: {
        type: 'string',
        maxLength: 255,
        description: 'Nama berat kendaraan (optional)',
        example: 'Berat Ringan'
      },
      vehicle_weight_description: {
        type: 'string',
        maxLength: 1000,
        description: 'Deskripsi berat kendaraan (optional)',
        example: 'Kendaraan dengan berat maksimal 1000 kg'
      }
    }
  },
  VehicleWeightUpdateInput: {
    type: 'object',
    properties: {
      vehicle_weight_code: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Kode berat kendaraan (optional)',
        example: 'VW001'
      },
      vehicle_weight_name: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Nama berat kendaraan (optional)',
        example: 'Berat Ringan'
      },
      vehicle_weight_description: {
        type: 'string',
        maxLength: 1000,
        nullable: true,
        description: 'Deskripsi berat kendaraan (optional)',
        example: 'Kendaraan dengan berat maksimal 1000 kg'
      }
    }
  },
  VehicleWeightGetInput: {
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
        description: 'Search keyword (code, name, description)',
        example: 'ringan'
      },
      sort_by: {
        type: 'string',
        enum: ['vehicle_weight_id', 'vehicle_weight_code', 'vehicle_weight_name', 'created_at', 'updated_at'],
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
  VehicleWeightListResponse: {
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
            items: {
              $ref: '#/components/schemas/VehicleWeight'
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
  VehicleWeightResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: {
        $ref: '#/components/schemas/VehicleWeight'
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Data berat kendaraan berhasil dibuat'
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
        example: 'Data berat kendaraan tidak ditemukan'
      },
      details: {
        type: 'object',
        description: 'Additional error details',
        nullable: true
      }
    }
  }
};

module.exports = vehicleWeightSchemas;
