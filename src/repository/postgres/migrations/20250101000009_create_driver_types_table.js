/**
 * Migration: Create driver_types table
 */

exports.up = function(knex) {
  return knex.schema.createTable('driver_types', (table) => {
    // Primary Key with UUID
    table.uuid('driver_type_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields
    table.string('driver_type_name', 255).nullable();
    table.text('driver_type_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('created_by', 255).nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('updated_by', 255).nullable();
    table.timestamp('deleted_at').nullable();
    table.string('deleted_by', 255).nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes for better query performance
    table.index(['deleted_at'], 'idx_driver_types_deleted_at');
    table.index(['is_delete'], 'idx_driver_types_is_delete');
    table.index(['created_at'], 'idx_driver_types_created_at');
    table.index(['driver_type_name'], 'idx_driver_types_name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('driver_types');
};
