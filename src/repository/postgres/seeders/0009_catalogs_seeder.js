/**
 * Seeder: Catalogs data
 * Seed data untuk tabel catalogs dengan relasi ke categories dan productions
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('catalogs').del();
  
  // Get IDs from other seeded tables
  const categories = await knex('categories').select('category_id').limit(5);
  const productions = await knex('productions').select('production_id').limit(5);
  
  // Insert seed data
  const catalogData = [];
  
  for (let i = 0; i < 10; i++) {
    // Main catalog entries
    catalogData.push({
      catalog_id: knex.raw('uuid_generate_v4()'),
      category_id: categories[i % categories.length]?.category_id || null,
      catalog_parent_id: null, // Root catalogs
      catalog_name_en: `Main Catalog ${i + 1} - Engine Block Assembly`,
      catalog_name_ch: `主目录 ${i + 1} - 发动机总成`,
      catalog_quantity: Math.floor(Math.random() * 100) + 10,
      catalog_image: `https://example.com/images/catalog_${i + 1}.jpg`,
      catalog_description: `Comprehensive catalog for vehicle component ${i + 1} with detailed specifications and installation guides`,
      production_id: productions[i % productions.length]?.production_id || null,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  await knex('catalogs').insert(catalogData);
  
  // Get the inserted catalog IDs for sub-catalogs
  const insertedCatalogs = await knex('catalogs').select('catalog_id', 'category_id').whereNull('catalog_parent_id');
  
  // Insert sub-catalogs (child catalogs)
  const subCatalogData = [];
  for (let i = 0; i < insertedCatalogs.length; i++) {
    const parentCatalog = insertedCatalogs[i];
    subCatalogData.push({
      catalog_id: knex.raw('uuid_generate_v4()'),
      category_id: parentCatalog.category_id,
      catalog_parent_id: parentCatalog.catalog_id,
      catalog_name_en: `Sub Catalog ${i + 1} - Component Sub-assembly`,
      catalog_name_ch: `子目录 ${i + 1} - 组件子组件`,
      catalog_quantity: Math.floor(Math.random() * 50) + 5,
      catalog_image: `https://example.com/images/sub_catalog_${i + 1}.jpg`,
      catalog_description: `Detailed sub-component catalog for specialized parts and accessories`,
      production_id: productions[i % productions.length]?.production_id || null,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    });
  }
  
  await knex('catalogs').insert(subCatalogData);
};
