/**
 * Migration: Create engines_type_engines table
 * Migration untuk membuat tabel relasi antara engines dan type_engines
 */

exports.up = function(knex) {
  return knex.schema.createTable('engines_type_engines', (table) => {
    // Primary Key dengan UUID
    table.uuid('engines_type_engines_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign Keys
    table.uuid('engines_id').notNullable();
    table.uuid('type_engine_id').notNullable();
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Foreign key constraints
    table.foreign('engines_id').references('engines_id').inTable('engines').onDelete('CASCADE');
    table.foreign('type_engine_id').references('type_engine_id').inTable('type_engines').onDelete('CASCADE');
    
    // Indexes untuk performa query yang lebih baik
    table.index(['engines_id'], 'idx_engines_type_engines_engines_id');
    table.index(['type_engine_id'], 'idx_engines_type_engines_type_engine_id');
    table.index(['deleted_at'], 'idx_engines_type_engines_deleted_at');
    table.index(['is_delete'], 'idx_engines_type_engines_is_delete');
    
    // Unique constraint untuk mencegah duplikasi relasi
    table.unique(['engines_id', 'type_engine_id'], 'unique_engines_type_engines');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('engines_type_engines');
};
