/**
 * Seeder: Type Axels data
 * Seed data untuk tabel type_axels
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('type_axels').del();
  
  // Insert seed data
  await knex('type_axels').insert([
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Single Axle',
      type_axel_name_cn: '单轴',
      type_axel_description: 'Single axle configuration for light vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Tandem Axle',
      type_axel_name_cn: '串联双轴',
      type_axel_description: 'Tandem dual-axle configuration for heavy loads',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Tri-Axle',
      type_axel_name_cn: '三轴',
      type_axel_description: 'Three-axle configuration for maximum load capacity',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Drive Axle',
      type_axel_name_cn: '驱动轴',
      type_axel_description: 'Drive axle for power transmission to wheels',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Steer Axle',
      type_axel_name_cn: '转向轴',
      type_axel_description: 'Front steering axle for vehicle direction control',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Lift Axle',
      type_axel_name_cn: '升降轴',
      type_axel_description: 'Retractable lift axle for variable load conditions',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Tag Axle',
      type_axel_name_cn: '尾轴',
      type_axel_description: 'Tag axle positioned behind drive axle for load distribution',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Pusher Axle',
      type_axel_name_cn: '推进轴',
      type_axel_description: 'Pusher axle positioned in front of drive axle',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Independent Suspension Axle',
      type_axel_name_cn: '独立悬挂轴',
      type_axel_description: 'Axle with independent suspension for improved ride comfort',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_axel_id: knex.raw('uuid_generate_v4()'),
      type_axel_name_en: 'Portal Axle',
      type_axel_name_cn: '门式桥轴',
      type_axel_description: 'Portal axle design for increased ground clearance',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

