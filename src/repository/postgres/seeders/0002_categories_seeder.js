/**
 * Seeder: Categories data
 * Seed data untuk tabel categories
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('categories').del();
  
  // Insert seed data
  await knex('categories').insert([
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Transmission Parts',
      category_name_ch: '传动系统部件',
      category_description: 'Komponen transmisi untuk berbagai jenis kendaraan',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
       updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Engine Components',
      category_name_ch: '发动机组件',
      category_description: 'Komponen mesin seperti piston, ring, valve dan lainnya',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Electrical Systems',
      category_name_ch: '电气系统',
      category_description: 'Komponen sistem kelistrikan kendaraan',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
       updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Braking System',
      category_name_ch: '制动系统',
      category_description: 'Komponen sistem pengereman',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Suspension Parts',
      category_name_ch: '悬架部件',
      category_description: 'Komponen suspensi dan shock absorber',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
       updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Cooling System',
      category_name_ch: '冷却系统',
      category_description: 'Komponen sistem pendingin radiator dan AC',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Exhaust System',
      category_name_ch: '排气系统',
      category_description: 'Komponen sistem pembuangan dan knalpot',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Fuel System',
      category_name_ch: '燃油系统',
      category_description: 'Komponen sistem bahan bakar dan injeksi',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Steering System',
      category_name_ch: '转向系统',
      category_description: 'Komponen sistem kemudi dan power steering',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      category_id: knex.raw('uuid_generate_v4()'),
      category_name_en: 'Body & Chassis',
      category_name_ch: '车身和底盘',
      category_description: 'Komponen bodi kendaraan dan rangka chassis',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};
