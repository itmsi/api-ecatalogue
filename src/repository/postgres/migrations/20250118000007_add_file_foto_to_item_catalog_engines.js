/**
 * Migration: Add file_foto column to item_catalog_engines table
 * Menambahkan kolom file_foto untuk menyimpan URL foto dari MinIO
 */

exports.up = function(knex) {
  return knex.schema.table('item_catalog_engines', (table) => {
    table.text('file_foto').nullable().comment('URL foto dari MinIO storage');
  });
};

exports.down = function(knex) {
  return knex.schema.table('item_catalog_engines', (table) => {
    table.dropColumn('file_foto');
  });
};

