/**
 * Migration: Create locations table
 */

exports.up = function(knex) {
  return knex.schema.createTable('locations', (table) => {
    // Primary Key with UUID
    table.uuid('location_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields
    table.string('location_name', 255).nullable();
    table.text('location_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('created_by', 255).nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('updated_by', 255).nullable();
    table.timestamp('deleted_at').nullable();
    table.string('deleted_by', 255).nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes for better query performance
    table.index(['deleted_at'], 'idx_locations_deleted_at');
    table.index(['is_delete'], 'idx_locations_is_delete');
    table.index(['created_at'], 'idx_locations_created_at');
    table.index(['location_name'], 'idx_locations_name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations');
};
