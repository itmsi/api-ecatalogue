/**
 * Seeder: Cabines data
 * Seed data untuk tabel cabines
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('cabines').del();
  
  // Insert seed data
  await knex('cabines').insert([
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-2000 Standard',
      cabines_name_cn: 'CB-2000标准版',
      cabines_description: 'Standard cabin model with basic features for light commercial vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-3000 Comfort',
      cabines_name_cn: 'CB-3000舒适版',
      cabines_description: 'Comfort cabin with enhanced suspension and noise reduction',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-4000 Premium',
      cabines_name_cn: 'CB-4000豪华版',
      cabines_description: 'Premium cabin with leather seats and advanced climate control',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-5000 Sleeper',
      cabines_name_cn: 'CB-5000卧铺版',
      cabines_description: 'Sleeper cabin with full-size bed and storage compartments',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-6000 Extended',
      cabines_name_cn: 'CB-6000加长版',
      cabines_description: 'Extended cabin with additional rear seating capacity',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-7000 Crew',
      cabines_name_cn: 'CB-7000双排版',
      cabines_description: 'Crew cabin with double-row seating for 5-6 passengers',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-8000 Heavy Duty',
      cabines_name_cn: 'CB-8000重型版',
      cabines_description: 'Heavy-duty cabin for construction and mining vehicles',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-9000 Tilt',
      cabines_name_cn: 'CB-9000可倾斜版',
      cabines_description: 'Tiltable cabin design for easy engine access and maintenance',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-10000 Aero',
      cabines_name_cn: 'CB-10000空气动力版',
      cabines_description: 'Aerodynamic cabin design for fuel efficiency and reduced wind resistance',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      cabines_id: knex.raw('uuid_generate_v4()'),
      cabines_name_en: 'CB-11000 Electric',
      cabines_name_cn: 'CB-11000电动版',
      cabines_description: 'Electric vehicle cabin with digital dashboard and eco-friendly materials',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

