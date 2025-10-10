/**
 * Seeder: Type Transmissions data
 * Seed data untuk tabel type_transmissions
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('type_transmissions').del();
  
  // Insert seed data
  await knex('type_transmissions').insert([
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'Manual Transmission',
      type_transmission_name_cn: '手动变速箱',
      type_transmission_description: 'Traditional manual transmission with clutch pedal operation',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'Automatic Transmission',
      type_transmission_name_cn: '自动变速箱',
      type_transmission_description: 'Fully automatic transmission with torque converter',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'Semi-Automatic Transmission',
      type_transmission_name_cn: '半自动变速箱',
      type_transmission_description: 'Semi-automatic transmission with automated manual control',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'CVT Transmission',
      type_transmission_name_cn: '无级变速箱',
      type_transmission_description: 'Continuously Variable Transmission for smooth acceleration',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'DCT Transmission',
      type_transmission_name_cn: '双离合变速箱',
      type_transmission_description: 'Dual-Clutch Transmission for fast gear changes',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'AMT Transmission',
      type_transmission_name_cn: '电控机械变速箱',
      type_transmission_description: 'Automated Manual Transmission with electronic control',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'Sequential Transmission',
      type_transmission_name_cn: '顺序变速箱',
      type_transmission_description: 'Sequential manual transmission for performance vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'Allison Automatic',
      type_transmission_name_cn: '艾里逊自动变速箱',
      type_transmission_description: 'Heavy-duty Allison automatic transmission for commercial vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'ZF Transmission',
      type_transmission_name_cn: 'ZF变速箱',
      type_transmission_description: 'ZF premium transmission system for luxury commercial vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      type_transmission_id: knex.raw('uuid_generate_v4()'),
      type_transmission_name_en: 'Electric Single Speed',
      type_transmission_name_cn: '电动单速变速箱',
      type_transmission_description: 'Single-speed transmission for electric vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

