/**
 * Seeder: Brands data
 * Seed data untuk tabel brands
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('brands').del();
  
  // Insert seed data
  await knex('brands').insert([
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'THYM',
      brand_name: 'Toyota Heavy Industries',
      brand_description: 'Brand untuk kendaraan industri berat Toyota',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'HNDH',
      brand_name: 'Honda Diesel Heavy',
      brand_description: 'Brand mesin diesel Honda untuk industri',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'SUZU',
      brand_name: 'Suzuki Industrial',
      brand_description: 'Brand Suzuki untuk kendaraan industri dan komersial',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'MTSB',
      brand_name: 'Mitsubishi Heavy Equipment',
      brand_description: 'Brand Mitsubishi untuk peralatan berat dan industri',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'LSUN',
      brand_name: 'Lotus Performance',
      brand_description: 'Brand premium untuk kendaraan performa tinggi',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
     updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'NISN',
      brand_name: 'Nissan Commercial',
      brand_description: 'Brand Nissan untuk kendaraan komersial dan truk',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'IZUZ',
      brand_name: 'Isuzu Heavy Truck',
      brand_description: 'Brand Isuzu khusus untuk truk berat dan komersial',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'HINO',
      brand_name: 'Hino Motors',
      brand_description: 'Brand Hino untuk truk dan bus komersial',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'DHTK',
      brand_name: 'Daihatsu Truck',
      brand_description: 'Brand Daihatsu untuk kendaraan ringan dan truk kecil',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      brand_id: knex.raw('uuid_generate_v4()'),
      brand_code: 'MAZD',
      brand_name: 'Mazda Commercial',
      brand_description: 'Brand Mazda untuk kendaraan komersial dan van',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};
