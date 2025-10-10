/**
 * Seeder: Axels data
 * Seed data untuk tabel axels
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('axels').del();
  
  // Insert seed data
  await knex('axels').insert([
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-1000 Light Duty',
      axel_name_cn: 'AX-1000轻型',
      axel_description: 'Light-duty single axle for small commercial vehicles, capacity up to 3 tons',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-2000 Medium Duty',
      axel_name_cn: 'AX-2000中型',
      axel_description: 'Medium-duty single axle for mid-size trucks, capacity up to 6 tons',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-3000 Heavy Tandem',
      axel_name_cn: 'AX-3000重型双轴',
      axel_description: 'Heavy-duty tandem axle for large trucks, capacity up to 18 tons',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-4000 Tri-Axle Heavy',
      axel_name_cn: 'AX-4000三轴重型',
      axel_description: 'Tri-axle configuration for maximum load, capacity up to 24 tons',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-5000 Drive Pro',
      axel_name_cn: 'AX-5000专业驱动',
      axel_description: 'Professional drive axle with differential lock for off-road capability',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-6000 Steer Master',
      axel_name_cn: 'AX-6000转向大师',
      axel_description: 'Front steering axle with precision control and enhanced stability',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-7000 Lift Smart',
      axel_name_cn: 'AX-7000智能升降',
      axel_description: 'Intelligent lift axle with automatic load sensing and adjustment',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-8000 Tag Elite',
      axel_name_cn: 'AX-8000精英尾轴',
      axel_description: 'Premium tag axle for optimal weight distribution and fuel efficiency',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-9000 Portal Extreme',
      axel_name_cn: 'AX-9000极限门式',
      axel_description: 'Extreme portal axle design for maximum ground clearance in mining operations',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      axel_id: knex.raw('uuid_generate_v4()'),
      axel_name_en: 'AX-10000 Independent Comfort',
      axel_name_cn: 'AX-10000独立舒适',
      axel_description: 'Independent suspension axle for luxury ride quality and handling',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

