/**
 * Migration: Add location_code column to locations table
 */

exports.up = function(knex) {
  return knex.schema.alterTable('locations', (table) => {
    table.string('location_code', 255).nullable().after('location_id');
    
    // Add index for better query performance
    table.index(['location_code'], 'idx_locations_code');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('locations', (table) => {
    table.dropIndex(['location_code'], 'idx_locations_code');
    table.dropColumn('location_code');
  });
};
