/**
 * Migration: Add file_foto column to item_catalog_axles table
 * 
 * This migration adds a new column to store the URL/path of the uploaded foto file
 * for each item catalog axle entry.
 */

exports.up = function(knex) {
  return knex.schema.table('item_catalog_axles', function(table) {
    // Add file_foto column to store the image URL/path
    table.text('file_foto').nullable().comment('URL or path to the uploaded foto file');
  });
};

exports.down = function(knex) {
  return knex.schema.table('item_catalog_axles', function(table) {
    // Remove file_foto column on rollback
    table.dropColumn('file_foto');
  });
};

