/**
 * Seeder: Type Cabines data
 * Seed data untuk tabel type_cabines
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('type_cabines').del();
  
  // Insert seed data
  await knex('type_cabines').insert([
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Standard Cab',
      type_cabine_name_cn: '标准驾驶室',
      type_cabine_description: 'Basic single-row cabin for 2-3 passengers',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Extended Cab',
      type_cabine_name_cn: '加长驾驶室',
      type_cabine_description: 'Extended cabin with additional seating space',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Crew Cab',
      type_cabine_name_cn: '双排驾驶室',
      type_cabine_description: 'Double-row cabin with full rear seating',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Sleeper Cab',
      type_cabine_name_cn: '卧铺驾驶室',
      type_cabine_description: 'Long-haul cabin with sleeping compartment',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Day Cab',
      type_cabine_name_cn: '日间驾驶室',
      type_cabine_description: 'Compact cabin for short-distance operations',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Low Roof Cab',
      type_cabine_name_cn: '低顶驾驶室',
      type_cabine_description: 'Low-profile cabin design for better aerodynamics',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'High Roof Cab',
      type_cabine_name_cn: '高顶驾驶室',
      type_cabine_description: 'High-roof cabin with enhanced interior space',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Super Cab',
      type_cabine_name_cn: '超级驾驶室',
      type_cabine_description: 'Premium cabin with luxury features',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Forward Control Cab',
      type_cabine_name_cn: '前置控制驾驶室',
      type_cabine_description: 'Cab-over-engine design for better visibility',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_cabine_id: knex.raw('uuid_generate_v4()'),
      type_cabine_name_en: 'Tilt Cab',
      type_cabine_name_cn: '可倾斜驾驶室',
      type_cabine_description: 'Tiltable cabin for easier engine maintenance',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

