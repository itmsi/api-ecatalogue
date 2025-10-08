/**
 * Migration: Create cabines_type_cabines table
 * Migration untuk membuat tabel relasi many-to-many antara cabines dan type_cabines
 */

exports.up = function(knex) {
  return knex.schema.createTable('cabines_type_cabines', (table) => {
    // Primary Key
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    // Foreign keys
    table.uuid('cabines_id').notNullable();
    table.foreign('cabines_id')
      .references('cabines_id')
      .inTable('cabines')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    
    table.uuid('type_cabine_id').notNullable();
    table.foreign('type_cabine_id')
      .references('type_cabine_id')
      .inTable('type_cabines')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    
    // Audit fields
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Unique constraint untuk mencegah duplikasi relasi
    table.unique(['cabines_id', 'type_cabine_id'], 'unique_cabines_type_cabines');
    
    // Indexes untuk performa query yang lebih baik
    table.index(['cabines_id'], 'idx_cabines_type_cabines_cabines_id');
    table.index(['type_cabine_id'], 'idx_cabines_type_cabines_type_cabine_id');
    table.index(['deleted_at'], 'idx_cabines_type_cabines_deleted_at');
    table.index(['is_delete'], 'idx_cabines_type_cabines_is_delete');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cabines_type_cabines');
};
