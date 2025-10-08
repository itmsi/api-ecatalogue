/**
 * Migration: Create engines table
 * Migration untuk membuat tabel engines dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('engines', (table) => {
    // Primary Key dengan UUID
    table.uuid('engines_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('engines_name_en', 255).nullable();
    table.string('engines_name_cn', 255).nullable();
    table.text('engines_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_engines_deleted_at');
    table.index(['is_delete'], 'idx_engines_is_delete');
    table.index(['created_at'], 'idx_engines_created_at');
    table.index(['engines_name_en'], 'idx_engines_name_en');
    table.index(['engines_name_cn'], 'idx_engines_name_cn');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('engines');
};
