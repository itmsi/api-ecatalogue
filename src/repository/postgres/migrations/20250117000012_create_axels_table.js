/**
 * Migration: Create axels table
 * Migration untuk membuat tabel axels dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('axels', (table) => {
    // Primary Key dengan UUID
    table.uuid('axel_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('axel_name_en', 255).nullable();
    table.string('axel_name_cn', 255).nullable();
    table.text('axel_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_axels_deleted_at');
    table.index(['is_delete'], 'idx_axels_is_delete');
    table.index(['created_at'], 'idx_axels_created_at');
    table.index(['axel_name_en'], 'idx_axels_name_en');
    table.index(['axel_name_cn'], 'idx_axels_name_cn');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('axels');
};

