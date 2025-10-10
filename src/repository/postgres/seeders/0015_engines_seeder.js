/**
 * Seeder: Engines data
 * Seed data untuk tabel engines
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('engines').del();
  
  // Insert seed data
  await knex('engines').insert([
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-4D20 Turbo Diesel',
      engines_name_cn: 'ENG-4D20涡轮柴油',
      engines_description: '2.0L turbocharged diesel engine with 150HP and 350Nm torque',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-6L30 Heavy Duty',
      engines_name_cn: 'ENG-6L30重型',
      engines_description: '3.0L inline-6 diesel engine with 220HP for heavy commercial vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-V6-35 Performance',
      engines_name_cn: 'ENG-V6-35性能版',
      engines_description: '3.5L V6 gasoline engine with 280HP for high-performance vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-V8-50 Power',
      engines_name_cn: 'ENG-V8-50动力版',
      engines_description: '5.0L V8 diesel engine with 400HP for extreme heavy-duty applications',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-V12-60 Luxury',
      engines_name_cn: 'ENG-V12-60豪华版',
      engines_description: '6.0L V12 engine with 520HP for premium commercial vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-TD-40 Turbo',
      engines_name_cn: 'ENG-TD-40涡轮',
      engines_description: '4.0L turbocharged diesel with advanced intercooler system',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-HYB-25 Hybrid',
      engines_name_cn: 'ENG-HYB-25混合动力',
      engines_description: '2.5L hybrid engine with 180HP combined power output',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-ELEC-200 Electric',
      engines_name_cn: 'ENG-ELEC-200纯电动',
      engines_description: '200kW electric motor with 500km range on single charge',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-H2-150 Fuel Cell',
      engines_name_cn: 'ENG-H2-150燃料电池',
      engines_description: '150kW hydrogen fuel cell system with zero emissions',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      engines_id: knex.raw('uuid_generate_v4()'),
      engines_name_en: 'ENG-CNG-30 Natural Gas',
      engines_name_cn: 'ENG-CNG-30天然气',
      engines_description: '3.0L CNG engine with 170HP for eco-friendly transportation',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

