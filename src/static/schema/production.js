/**
 * Swagger Schema Definitions for Production Module
 */

const productionSchemas = {
  Production: {
    type: 'object',
    properties: {
      production_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique production identifier',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      vin_number: {
        type: 'string',
        nullable: true,
        description: 'Vehicle Identification Number',
        example: 'VIN1234567890ABCDEF'
      },
      production_name_en: {
        type: 'string',
        nullable: true,
        description: 'Production name in English',
        example: 'Toyota Camry 2024'
      },
      production_name_cn: {
        type: 'string',
        nullable: true,
        description: 'Production name in Chinese',
        example: '丰田凯美瑞 2024'
      },
      production_sequence_number: {
        type: 'integer',
        nullable: true,
        description: 'Production sequence number',
        example: 1001
      },
      production_month: {
        type: 'string',
        nullable: true,
        description: 'Production month',
        example: 'March'
      },
      production_year: {
        type: 'string',
        nullable: true,
        description: 'Production year',
        example: '2024'
      },
      production_description: {
        type: 'string',
        nullable: true,
        description: 'Production description',
        example: 'High-quality production with premium materials'
      },
      location_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Location reference',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      brand_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Brand reference',
        example: '123e4567-e89b-12d3-a456-426614174002'
      },
      driver_type_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Driver type reference',
        example: '123e4567-e89b-12d3-a456-426614174003'
      },
      vehicle_weight_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Vehicle weight reference',
        example: '123e4567-e89b-12d3-a456-426614174004'
      },
      world_manufacturing_plant_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'World manufacturing plant reference',
        example: '123e4567-e89b-12d3-a456-426614174005'
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
        description: 'Creator user/employee ID',
        example: '123e4567-e89b-12d3-a456-426614174006'
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
        description: 'Last updater user/employee ID',
        example: '123e4567-e89b-12d3-a456-426614174007'
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
        description: 'Deleter user/employee ID',
        example: null
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft deletion flag',
        example: false
      }
    }
  },
  ProductionDetailInput: {
    type: 'object',
    properties: {
      production_detail_description: {
        type: 'string',
        description: 'Production detail description',
        example: 'Engine and transmission configuration'
      },
      engine_id: {
        type: 'string',
        format: 'uuid',
        description: 'Engine reference',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      steering_id: {
        type: 'string',
        format: 'uuid',
        description: 'Steering reference',
        example: '123e4567-e89b-12d3-a456-426614174002'
      },
      cabine_id: {
        type: 'string',
        format: 'uuid',
        description: 'Cabine reference',
        example: '123e4567-e89b-12d3-a456-426614174003'
      },
      axle_id: {
        type: 'string',
        format: 'uuid',
        description: 'Axle reference',
        example: '123e4567-e89b-12d3-a456-426614174004'
      },
      transmission_id: {
        type: 'string',
        format: 'uuid',
        description: 'Transmission reference',
        example: '123e4567-e89b-12d3-a456-426614174005'
      }
    }
  },
  ProductionInput: {
    type: 'object',
    properties: {
      vin_number: {
        type: 'string',
        maxLength: 255,
        description: 'Vehicle Identification Number',
        example: 'VIN1234567890ABCDEF'
      },
      production_name_en: {
        type: 'string',
        maxLength: 255,
        description: 'Production name in English',
        example: 'Toyota Camry 2024'
      },
      production_name_cn: {
        type: 'string',
        maxLength: 255,
        description: 'Production name in Chinese',
        example: '丰田凯美瑞 2024'
      },
      production_sequence_number: {
        type: 'string',
        maxLength: 50,
        description: 'Production sequence number',
        example: '1001'
      },
      production_month: {
        type: 'string',
        maxLength: 50,
        description: 'Production month',
        example: 'March'
      },
      production_year: {
        type: 'string',
        maxLength: 50,
        description: 'Production year',
        example: '2024'
      },
      production_description: {
        type: 'string',
        maxLength: 1000,
        description: 'Production description',
        example: 'High-quality production with premium materials'
      },
      production_location_id: {
        type: 'string',
        format: 'uuid',
        description: 'Location reference',
        example: '123e4567-e89b-12d3-a456-426614174001'
      },
      production_brand_id: {
        type: 'string',
        format: 'uuid',
        description: 'Brand reference',
        example: '123e4567-e89b-12d3-a456-426614174002'
      },
      production_driver_type_id: {
        type: 'string',
        format: 'uuid',
        description: 'Driver type reference',
        example: '123e4567-e89b-12d3-a456-426614174003'
      },
      production_vehicle_weight_id: {
        type: 'string',
        format: 'uuid',
        description: 'Vehicle weight reference',
        example: '123e4567-e89b-12d3-a456-426614174004'
      },
      production_world_manufacturing_plant_id: {
        type: 'string',
        format: 'uuid',
        description: 'World manufacturing plant reference',
        example: '123e4567-e89b-12d3-a456-426614174005'
      },
      data_details: {
        type: 'array',
        description: 'Array of production details (engine, steering, cabine, axle, transmission)',
        items: {
          $ref: '#/components/schemas/ProductionDetailInput'
        },
        example: [
          {
            "production_detail_description": "Configuration 1",
            "engine_id": "123e4567-e89b-12d3-a456-426614174001",
            "steering_id": "123e4567-e89b-12d3-a456-426614174002",
            "cabine_id": "123e4567-e89b-12d3-a456-426614174003",
            "axle_id": "123e4567-e89b-12d3-a456-426614174004",
            "transmission_id": "123e4567-e89b-12d3-a456-426614174005"
          }
        ]
      }
    }
  },
  ProductionGetRequest: {
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
        description: 'Items per page',
        example: 10
      },
      search: {
        type: 'string',
        maxLength: 255,
        description: 'Search term',
        example: 'Toyota'
      },
      sort_by: {
        type: 'string',
        enum: ['created_at', 'updated_at', 'production_name_en', 'production_name_cn', 'vin_number'],
        default: 'created_at',
        description: 'Sort field',
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
        example: 'Production tidak ditemukan'
      },
      details: {
        type: 'object',
        description: 'Additional error details',
        nullable: true
      }
    }
  }
};

module.exports = productionSchemas;
