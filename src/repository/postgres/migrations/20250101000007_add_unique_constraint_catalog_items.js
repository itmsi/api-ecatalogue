/**
 * Migration: Add unique constraint to catalog_items table
 * Migration untuk menambahkan unique constraint pada kombinasi catalog_id + target_id
 */

exports.up = function(knex) {
  return knex.schema.alterTable('catalog_items', (table) => {
    // Add unique constraint untuk mencegah duplikasi catalog_id + target_id
    table.unique(['catalog_id', 'target_id'], 'unique_catalog_target');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('catalog_items', (table) => {
    // Remove unique constraint
    table.dropUnique(['catalog_id', 'target_id'], 'unique_catalog_target');
  });
};
