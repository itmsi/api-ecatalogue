/**
 * Migration: Add file_foto column to master_pdf table
 * Menambahkan kolom file_foto untuk menyimpan URL foto dari MinIO
 */

exports.up = function(knex) {
  return knex.schema.table('master_pdf', (table) => {
    table.text('file_foto').nullable().comment('URL foto dari MinIO storage');
  });
};

exports.down = function(knex) {
  return knex.schema.table('master_pdf', (table) => {
    table.dropColumn('file_foto');
  });
};

