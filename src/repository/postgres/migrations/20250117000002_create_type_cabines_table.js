/**
 * Migration: Create type_cabines table
 * Migration untuk membuat tabel type_cabines dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('type_cabines', (table) => {
    // Primary Key dengan UUID
    table.uuid('type_cabine_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('type_cabine_name_en', 255).nullable();
    table.string('type_cabine_name_cn', 255).nullable();
    table.text('type_cabine_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_type_cabines_deleted_at');
    table.index(['is_delete'], 'idx_type_cabines_is_delete');
    table.index(['created_at'], 'idx_type_cabines_created_at');
    table.index(['type_cabine_name_en'], 'idx_type_cabines_name_en');
    table.index(['type_cabine_name_cn'], 'idx_type_cabines_name_cn');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('type_cabines');
};
