/**
 * Migration: Create vehicle_weights table
 * Migration untuk membuat tabel vehicle_weights dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('vehicle_weights', (table) => {
    // Primary Key dengan UUID
    table.uuid('vehicle_weight_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('vehicle_weight_code', 255).nullable();
    table.string('vehicle_weight_name', 255).nullable();
    table.text('vehicle_weight_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_vehicle_weights_deleted_at');
    table.index(['is_delete'], 'idx_vehicle_weights_is_delete');
    table.index(['created_at'], 'idx_vehicle_weights_created_at');
    table.index(['vehicle_weight_code'], 'idx_vehicle_weights_code');
    table.index(['vehicle_weight_name'], 'idx_vehicle_weights_name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicle_weights');
};
