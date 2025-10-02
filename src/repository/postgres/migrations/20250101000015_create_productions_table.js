/**
 * Migration: Create productions table
 * Production data with all required fields and relationships
 */

exports.up = function(knex) {
  return knex.schema.createTable('productions', (table) => {
    // Primary Key with UUID
    table.uuid('production_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Production Fields
    table.string('vin_number', 255).nullable();
    table.string('production_name_en', 255).nullable();
    table.string('production_name_cn', 255).nullable();
    table.integer('production_sequence_number').nullable();
    table.string('production_month', 50).nullable();
    table.string('production_year', 50).nullable();
    table.text('production_description').nullable();
    
    // Foreign Keys (nullable)
    table.uuid('location_id').nullable();
    table.uuid('brand_id').nullable();
    table.uuid('driver_type_id').nullable();
    table.uuid('vehicle_weight_id').nullable();
    table.uuid('world_manufacturing_plant_id').nullable();
    
    // Audit Fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes for better query performance
    table.index(['deleted_at'], 'idx_productions_deleted_at');
    table.index(['created_at'], 'idx_productions_created_at');
    table.index(['location_id'], 'idx_productions_location_id');
    table.index(['brand_id'], 'idx_productions_brand_id');
    table.index(['driver_type_id'], 'idx_productions_driver_type_id');
    table.index(['vehicle_weight_id'], 'idx_productions_vehicle_weight_id');
    table.index(['world_manufacturing_plant_id'], 'idx_productions_world_manufacturing_plant_id');
    table.index(['vin_number'], 'idx_productions_vin_number');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('productions');
};
