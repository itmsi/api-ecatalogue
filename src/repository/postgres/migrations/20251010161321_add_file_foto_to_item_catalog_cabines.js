/**
 * Migration: Add file_foto column to item_catalog_cabines table
 */

exports.up = function(knex) {
  return knex.schema.table('item_catalog_cabines', function(table) {
    table.text('file_foto').nullable().comment('URL or path to the uploaded foto file');
  });
};

exports.down = function(knex) {
  return knex.schema.table('item_catalog_cabines', function(table) {
    table.dropColumn('file_foto');
  });
};

