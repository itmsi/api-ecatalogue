/**
 * Migration: Create cabines table
 * Migration untuk membuat tabel cabines dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('cabines', (table) => {
    // Primary Key dengan UUID
    table.uuid('cabines_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('cabines_name_en', 255).nullable();
    table.string('cabines_name_cn', 255).nullable();
    table.text('cabines_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_cabines_deleted_at');
    table.index(['is_delete'], 'idx_cabines_is_delete');
    table.index(['created_at'], 'idx_cabines_created_at');
    table.index(['cabines_name_en'], 'idx_cabines_name_en');
    table.index(['cabines_name_cn'], 'idx_cabines_name_cn');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cabines');
};
