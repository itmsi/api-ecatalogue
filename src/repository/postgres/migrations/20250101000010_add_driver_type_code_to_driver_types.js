/**
 * Migration: Add driver_type_code column to driver_types table
 */

exports.up = function(knex) {
  return knex.schema.alterTable('driver_types', (table) => {
    table.string('driver_type_code', 255).nullable().after('driver_type_id');
    
    // Add index for better query performance
    table.index(['driver_type_code'], 'idx_driver_types_code');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('driver_types', (table) => {
    table.dropIndex(['driver_type_code'], 'idx_driver_types_code');
    table.dropColumn('driver_type_code');
  });
};
