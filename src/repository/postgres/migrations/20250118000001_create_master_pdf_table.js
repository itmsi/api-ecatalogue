/**
 * Migration: Create master_pdf table
 * Tabel untuk menyimpan informasi master PDF
 */

exports.up = function(knex) {
  return knex.schema.createTable('master_pdf', (table) => {
    // Primary Key dengan UUID
    table.uuid('master_pdf_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Data fields
    table.string('name_pdf', 255).notNullable();
    table.text('description').nullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Indexes untuk performa query yang lebih baik
    table.index(['deleted_at'], 'idx_master_pdf_deleted_at');
    table.index(['is_delete'], 'idx_master_pdf_is_delete');
    table.index(['created_at'], 'idx_master_pdf_created_at');
    table.index(['name_pdf'], 'idx_master_pdf_name_pdf');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('master_pdf');
};

