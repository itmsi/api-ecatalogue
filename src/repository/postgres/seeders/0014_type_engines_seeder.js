/**
 * Seeder: Type Engines data
 * Seed data untuk tabel type_engines
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('type_engines').del();
  
  // Insert seed data
  await knex('type_engines').insert([
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'Inline 4-Cylinder',
      type_engine_name_cn: '直列四缸',
      type_engine_description: 'Inline 4-cylinder engine configuration for efficient performance',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'Inline 6-Cylinder',
      type_engine_name_cn: '直列六缸',
      type_engine_description: 'Inline 6-cylinder engine for heavy-duty applications',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'V6 Engine',
      type_engine_name_cn: 'V6发动机',
      type_engine_description: 'V6 engine configuration for balanced power and efficiency',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'V8 Engine',
      type_engine_name_cn: 'V8发动机',
      type_engine_description: 'V8 engine for high-performance and heavy-duty vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'V12 Engine',
      type_engine_name_cn: 'V12发动机',
      type_engine_description: 'V12 engine for premium and luxury commercial vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'Turbocharged Diesel',
      type_engine_name_cn: '涡轮增压柴油机',
      type_engine_description: 'Turbocharged diesel engine for maximum torque and fuel efficiency',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'Hybrid Electric',
      type_engine_name_cn: '混合动力',
      type_engine_description: 'Hybrid electric engine combining gasoline/diesel with electric motor',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'Full Electric',
      type_engine_name_cn: '纯电动',
      type_engine_description: 'Full electric motor system with zero emissions',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'Hydrogen Fuel Cell',
      type_engine_name_cn: '氢燃料电池',
      type_engine_description: 'Hydrogen fuel cell engine for clean energy transportation',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_engine_id: knex.raw('uuid_generate_v4()'),
      type_engine_name_en: 'Natural Gas CNG',
      type_engine_name_cn: '天然气发动机',
      type_engine_description: 'Compressed natural gas engine for eco-friendly operation',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

