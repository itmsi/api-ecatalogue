/**
 * Migration: Create categories table
 * Migration untuk membuat tabel categories dengan struktur yang diminta
 */

exports.up = function(knex) {
  return knex.schema.createTable('categories', (table) => {
    // Primary Key dengan UUID
    table.uuid('category_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields sesuai permintaan
    table.string('category_name', 255).notNullable();
    table.text('category_description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_categories_deleted_at');
    table.index(['is_delete'], 'idx_categories_is_delete');
    table.index(['created_at'], 'idx_categories_created_at');
    table.index(['category_name'], 'idx_categories_name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
