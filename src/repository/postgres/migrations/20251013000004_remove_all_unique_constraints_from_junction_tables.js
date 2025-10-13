/**
 * Migration: Remove all unique constraints from junction tables
 * Migration untuk menghapus semua unique constraints dari junction tables
 * Ini memungkinkan soft delete yang lebih fleksibel tanpa konflik constraint
 */

exports.up = function(knex) {
  return knex.schema
    // Remove unique constraint from engines_type_engines
    .alterTable('engines_type_engines', (table) => {
      table.dropUnique(['engines_id', 'type_engine_id'], 'unique_engines_type_engines');
    })
    // Remove unique constraint from steerings_type_steerings
    .alterTable('steerings_type_steerings', (table) => {
      table.dropUnique(['steering_id', 'type_steering_id'], 'unique_steerings_type_steerings');
    })
    // Remove unique constraint from axels_type_axels
    .alterTable('axels_type_axels', (table) => {
      table.dropUnique(['axel_id', 'type_axel_id'], 'unique_axels_type_axels');
    })
    // Remove unique constraint from transmissions_type_transmissions
    .alterTable('transmissions_type_transmissions', (table) => {
      table.dropUnique(['transmission_id', 'type_transmission_id'], 'unique_transmission_type_transmission');
    })
    // Remove unique constraint from cabines_type_cabines
    .alterTable('cabines_type_cabines', (table) => {
      table.dropUnique(['cabines_id', 'type_cabine_id'], 'unique_cabines_type_cabines');
    })
    // Remove unique constraint from catalog_items
    .alterTable('catalog_items', (table) => {
      table.dropUnique(['catalog_id', 'target_id'], 'unique_catalog_target');
    });
};

exports.down = function(knex) {
  return knex.schema
    // Restore unique constraint to engines_type_engines
    .alterTable('engines_type_engines', (table) => {
      table.unique(['engines_id', 'type_engine_id'], 'unique_engines_type_engines');
    })
    // Restore unique constraint to steerings_type_steerings
    .alterTable('steerings_type_steerings', (table) => {
      table.unique(['steering_id', 'type_steering_id'], 'unique_steerings_type_steerings');
    })
    // Restore unique constraint to axels_type_axels
    .alterTable('axels_type_axels', (table) => {
      table.unique(['axel_id', 'type_axel_id'], 'unique_axels_type_axels');
    })
    // Restore unique constraint to transmissions_type_transmissions
    .alterTable('transmissions_type_transmissions', (table) => {
      table.unique(['transmission_id', 'type_transmission_id'], 'unique_transmission_type_transmission');
    })
    // Restore unique constraint to cabines_type_cabines
    .alterTable('cabines_type_cabines', (table) => {
      table.unique(['cabines_id', 'type_cabine_id'], 'unique_cabines_type_cabines');
    })
    // Restore unique constraint to catalog_items
    .alterTable('catalog_items', (table) => {
      table.unique(['catalog_id', 'target_id'], 'unique_catalog_target');
    });
};

