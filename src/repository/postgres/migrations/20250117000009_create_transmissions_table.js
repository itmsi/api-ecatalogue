/**
 * Migration: Create transmissions table
 * Migration untuk membuat tabel transmissions dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('transmissions', (table) => {
    // Primary Key dengan UUID
    table.uuid('transmission_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('transmission_name_en', 255).nullable();
    table.string('transmission_name_cn', 255).nullable();
    table.text('transmission_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_transmissions_deleted_at');
    table.index(['is_delete'], 'idx_transmissions_is_delete');
    table.index(['created_at'], 'idx_transmissions_created_at');
    table.index(['transmission_name_en'], 'idx_transmissions_name_en');
    table.index(['transmission_name_cn'], 'idx_transmissions_name_cn');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transmissions');
};
