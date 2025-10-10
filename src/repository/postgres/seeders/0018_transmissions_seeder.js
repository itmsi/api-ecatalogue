/**
 * Seeder: Transmissions data
 * Seed data untuk tabel transmissions
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('transmissions').del();
  
  // Insert seed data
  await knex('transmissions').insert([
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-5MT Standard',
      transmission_name_cn: 'TRX-5MT标准版',
      transmission_description: '5-speed manual transmission for light commercial vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-6MT Heavy',
      transmission_name_cn: 'TRX-6MT重型',
      transmission_description: '6-speed manual transmission for heavy-duty applications',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-8AT Premium',
      transmission_name_cn: 'TRX-8AT豪华版',
      transmission_description: '8-speed automatic transmission with smooth shifting',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-10AT Elite',
      transmission_name_cn: 'TRX-10AT精英版',
      transmission_description: '10-speed automatic transmission for maximum efficiency',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-CVT Eco',
      transmission_name_cn: 'TRX-CVT环保版',
      transmission_description: 'CVT transmission optimized for fuel economy',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-7DCT Sport',
      transmission_name_cn: 'TRX-7DCT运动版',
      transmission_description: '7-speed dual-clutch transmission for performance vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-6AMT Commercial',
      transmission_name_cn: 'TRX-6AMT商用版',
      transmission_description: '6-speed AMT for commercial fleet operations',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-Allison-3000',
      transmission_name_cn: 'TRX-艾里逊-3000',
      transmission_description: 'Allison 3000 series automatic for heavy commercial trucks',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-ZF-8HP Luxury',
      transmission_name_cn: 'TRX-ZF-8HP豪华版',
      transmission_description: 'ZF 8-speed automatic transmission for luxury vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      transmission_id: knex.raw('uuid_generate_v4()'),
      transmission_name_en: 'TRX-EV-SS Electric',
      transmission_name_cn: 'TRX-EV-SS电动版',
      transmission_description: 'Single-speed electric transmission with regenerative braking',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

