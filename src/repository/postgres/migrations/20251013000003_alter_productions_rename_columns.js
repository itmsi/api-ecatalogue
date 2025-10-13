/**
 * Migration: Alter productions table - rename foreign key columns to match specification
 */

exports.up = function(knex) {
  return knex.schema.alterTable('productions', (table) => {
    // Rename foreign key columns
    table.renameColumn('location_id', 'production_location_id');
    table.renameColumn('brand_id', 'production_brand_id');
    table.renameColumn('driver_type_id', 'production_driver_type_id');
    table.renameColumn('vehicle_weight_id', 'production_vehicle_weight_id');
    table.renameColumn('world_manufacturing_plant_id', 'production_world_manufacturing_plant_id');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('productions', (table) => {
    // Revert column names
    table.renameColumn('production_location_id', 'location_id');
    table.renameColumn('production_brand_id', 'brand_id');
    table.renameColumn('production_driver_type_id', 'driver_type_id');
    table.renameColumn('production_vehicle_weight_id', 'vehicle_weight_id');
    table.renameColumn('production_world_manufacturing_plant_id', 'world_manufacturing_plant_id');
  });
};

