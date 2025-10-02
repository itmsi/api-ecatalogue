/**
 * Migration: Create world_manufacturing_plants table
 */

exports.up = function(knex) {
  return knex.schema.createTable('world_manufacturing_plants', (table) => {
    // Primary Key with UUID
    table.uuid('world_manufacturing_plant_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields
    table.string('world_manufacturing_plant_code', 255).nullable();
    table.string('world_manufacturing_plant_name', 255).nullable();
    table.text('world_manufacturing_plant_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes for better query performance
    table.index(['is_delete'], 'idx_world_manufacturing_plants_is_delete');
    table.index(['created_at'], 'idx_world_manufacturing_plants_created_at');
    table.index(['world_manufacturing_plant_code'], 'idx_world_manufacturing_plants_code');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('world_manufacturing_plants');
};
