/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('item_catalog_steerings', function(table) {
        table.text('file_foto').nullable().comment('URL or path to the uploaded foto file');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('item_catalog_steerings', function(table) {
        table.dropColumn('file_foto');
      });
};
