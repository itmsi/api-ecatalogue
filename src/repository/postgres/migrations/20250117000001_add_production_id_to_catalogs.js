/**
 * Migration: Add production_id column to catalogs table
 * Menambahkan kolom production_id (UUID, nullable) ke tabel catalogs
 */

exports.up = function(knex) {
  return knex.schema.alterTable('catalogs', (table) => {
    // Tambahkan kolom production_id sebagai foreign key ke tabel productions
    table.uuid('production_id').nullable();
    table.foreign('production_id')
      .references('production_id')
      .inTable('productions')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
    
    // Tambahkan index untuk performa query yang lebih baik
    table.index(['production_id'], 'idx_catalogs_production_id');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('catalogs', (table) => {
    // Hapus foreign key constraint terlebih dahulu
    table.dropForeign(['production_id']);
    // Hapus index
    table.dropIndex(['production_id'], 'idx_catalogs_production_id');
    // Hapus kolom
    table.dropColumn('production_id');
  });
};