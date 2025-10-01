/**
 * Migration: Alter categories table - Add multilingual support
 * Mengubah category_name menjadi category_name_en dan menambahkan category_name_ch
 */

exports.up = function(knex) {
  return knex.schema.table('categories', (table) => {
    // Rename kolom category_name menjadi category_name_en
    table.renameColumn('category_name', 'category_name_en');
  })
  .then(() => {
    // Setelah rename, tambahkan kolom category_name_ch
    return knex.schema.table('categories', (table) => {
      table.string('category_name_ch', 255).nullable().after('category_name_en');
      
      // Tambahkan index untuk kolom baru
      table.index(['category_name_ch'], 'idx_categories_name_ch');
    });
  })
  .then(() => {
    // Update index yang lama (drop dan create ulang dengan nama kolom baru)
    return knex.schema.table('categories', (table) => {
      table.dropIndex(['category_name_en'], 'idx_categories_name');
      table.index(['category_name_en'], 'idx_categories_name_en');
    });
  });
};

exports.down = function(knex) {
  return knex.schema.table('categories', (table) => {
    // Drop index baru
    table.dropIndex(['category_name_ch'], 'idx_categories_name_ch');
    table.dropIndex(['category_name_en'], 'idx_categories_name_en');
    
    // Drop kolom category_name_ch
    table.dropColumn('category_name_ch');
  })
  .then(() => {
    // Rename kembali category_name_en menjadi category_name
    return knex.schema.table('categories', (table) => {
      table.renameColumn('category_name_en', 'category_name');
    });
  })
  .then(() => {
    // Restore index yang lama
    return knex.schema.table('categories', (table) => {
      table.index(['category_name'], 'idx_categories_name');
    });
  });
};

