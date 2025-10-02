/**
 * Swagger Schema Definitions for World Manufacturing Plant Module
 */

const worldManufacturingPlantSchemas = {
  WorldManufacturingPlant: {
    type: 'object',
    properties: {
      world_manufacturing_plant_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the world manufacturing plant'
      },
      world_manufacturing_plant_code: {
        type: 'string',
        nullable: true,
        maxLength: 255,
        description: 'Code of the manufacturing plant'
      },
      world_manufacturing_plant_name: {
        type: 'string',
        nullable: true,
        maxLength: 255,
        description: 'Name of the manufacturing plant'
      },
      world_manufacturing_plant_description: {
        type: 'string',
        nullable: true,
        description: 'Description of the manufacturing plant'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp when the record was created'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who created the record'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp when the record was last updated'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who last updated the record'
      },
      deleted_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Timestamp when the record was soft deleted'
      },
      deleted_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who deleted the record'
      },
      is_delete: {
        type: 'boolean',
        description: 'Indicates if the record is soft deleted'
      }
    },
    required: ['world_manufacturing_plant_id', 'created_at', 'updated_at', 'is_delete']
  },
  WorldManufacturingPlantInput: {
    type: 'object',
    properties: {
      world_manufacturing_plant_code: {
        type: 'string',
        nullable: true,
        maxLength: 255,
        description: 'Code of the manufacturing plant',
        example: 'MP001'
      },
      world_manufacturing_plant_name: {
        type: 'string',
        nullable: true,
        maxLength: 255,
        description: 'Name of the manufacturing plant',
        example: 'Production Line A'
      },
      world_manufacturing_plant_description: {
        type: 'string',
        nullable: true,
        maxLength: 2000,
        description: 'Description of the manufacturing plant',
        example: 'Main production facility for automotive parts'
      }
    }
  }
};

module.exports = worldManufacturingPlantSchemas;
