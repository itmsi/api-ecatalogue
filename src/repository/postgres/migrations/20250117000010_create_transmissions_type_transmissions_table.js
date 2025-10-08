/**
 * Migration: Create transmissions_type_transmissions table
 * Migration untuk membuat tabel relasi antara transmissions dan type_transmissions
 */

exports.up = function(knex) {
  return knex.schema.createTable('transmissions_type_transmissions', (table) => {
    // Primary Key dengan UUID
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign Keys
    table.uuid('transmission_id').notNullable();
    table.uuid('type_transmission_id').notNullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Foreign key constraints
    table.foreign('transmission_id').references('transmission_id').inTable('transmissions').onDelete('CASCADE');
    table.foreign('type_transmission_id').references('type_transmission_id').inTable('type_transmissions').onDelete('CASCADE');
    
    // Unique constraint untuk mencegah duplikasi relasi
    table.unique(['transmission_id', 'type_transmission_id'], 'unique_transmission_type_transmission');
    
    // Indexes untuk performa query yang lebih baik
    table.index(['transmission_id'], 'idx_transmissions_type_transmissions_transmission_id');
    table.index(['type_transmission_id'], 'idx_transmissions_type_transmissions_type_transmission_id');
    table.index(['deleted_at'], 'idx_transmissions_type_transmissions_deleted_at');
    table.index(['is_delete'], 'idx_transmissions_type_transmissions_is_delete');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transmissions_type_transmissions');
};
