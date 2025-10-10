/**
 * Seeder: Type Steerings data
 * Seed data untuk tabel type_steerings
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('type_steerings').del();
  
  // Insert seed data
  await knex('type_steerings').insert([
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Manual Steering',
      type_steering_name_cn: '手动转向',
      type_steering_description: 'Traditional manual steering system without power assist',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Hydraulic Power Steering',
      type_steering_name_cn: '液压助力转向',
      type_steering_description: 'Hydraulic power-assisted steering for easier control',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Electric Power Steering',
      type_steering_name_cn: '电动助力转向',
      type_steering_description: 'Electric power steering for improved fuel efficiency',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Electro-Hydraulic Steering',
      type_steering_name_cn: '电子液压转向',
      type_steering_description: 'Combined electric and hydraulic power steering system',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Rack and Pinion Steering',
      type_steering_name_cn: '齿轮齿条转向',
      type_steering_description: 'Precise rack and pinion steering mechanism',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Recirculating Ball Steering',
      type_steering_name_cn: '循环球转向',
      type_steering_description: 'Recirculating ball steering for heavy-duty vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Steer-by-Wire',
      type_steering_name_cn: '线控转向',
      type_steering_description: 'Advanced electronic steer-by-wire system with no mechanical linkage',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Four-Wheel Steering',
      type_steering_name_cn: '四轮转向',
      type_steering_description: 'Four-wheel steering for enhanced maneuverability',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Active Steering',
      type_steering_name_cn: '主动转向',
      type_steering_description: 'Intelligent active steering with variable ratio',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_steering_id: knex.raw('uuid_generate_v4()'),
      type_steering_name_en: 'Tilt and Telescopic Steering',
      type_steering_name_cn: '可调式转向',
      type_steering_description: 'Adjustable tilt and telescopic steering column for driver comfort',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

