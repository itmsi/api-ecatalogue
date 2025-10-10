/**
 * Seeder: Steerings data
 * Seed data untuk tabel steerings
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('steerings').del();
  
  // Insert seed data
  await knex('steerings').insert([
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-1000 Basic Manual',
      steering_name_cn: 'ST-1000基础手动',
      steering_description: 'Basic manual steering system for light commercial vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-2000 Hydraulic Plus',
      steering_name_cn: 'ST-2000液压增强版',
      steering_description: 'Enhanced hydraulic power steering with improved response',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-3000 EPS Eco',
      steering_name_cn: 'ST-3000电动环保版',
      steering_description: 'Electric power steering optimized for fuel economy',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-4000 EHPS Hybrid',
      steering_name_cn: 'ST-4000电子液压混合版',
      steering_description: 'Electro-hydraulic power steering for optimal performance',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-5000 Rack Pro',
      steering_name_cn: 'ST-5000专业齿条',
      steering_description: 'Professional rack and pinion steering with precision control',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-6000 Ball Heavy',
      steering_name_cn: 'ST-6000重型循环球',
      steering_description: 'Heavy-duty recirculating ball steering for commercial trucks',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-7000 SBW Advanced',
      steering_name_cn: 'ST-7000高级线控',
      steering_description: 'Advanced steer-by-wire technology with electronic feedback',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-8000 4WS Agile',
      steering_name_cn: 'ST-8000敏捷四轮',
      steering_description: 'Four-wheel steering for maximum maneuverability in tight spaces',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-9000 Active Smart',
      steering_name_cn: 'ST-9000智能主动',
      steering_description: 'Intelligent active steering with adaptive variable ratio control',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      steering_id: knex.raw('uuid_generate_v4()'),
      steering_name_en: 'ST-10000 Comfort Adjust',
      steering_name_cn: 'ST-10000舒适可调',
      steering_description: 'Premium tilt and telescopic steering with memory function',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

