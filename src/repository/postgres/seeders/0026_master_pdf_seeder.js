/**
 * Seeder: Master PDF data
 * Seed data untuk tabel master_pdf
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('master_pdf').del();
  
  // Insert seed data
  await knex('master_pdf').insert([
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Engine Catalog 2024',
      description: 'Complete engine catalog for 2024 models',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Transmission Catalog 2024',
      description: 'Complete transmission catalog for 2024 models',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Axle Catalog 2024',
      description: 'Complete axle catalog for 2024 models',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Steering Catalog 2024',
      description: 'Complete steering system catalog for 2024 models',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Cabine Catalog 2024',
      description: 'Complete cabine catalog for 2024 models',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Heavy Duty Engine Parts 2024',
      description: 'Heavy duty engine parts catalog',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Light Duty Transmission Parts 2024',
      description: 'Light duty transmission parts catalog',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Front Axle Assembly 2024',
      description: 'Front axle assembly parts catalog',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Rear Axle Assembly 2024',
      description: 'Rear axle assembly parts catalog',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Power Steering System 2024',
      description: 'Power steering system parts catalog',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Cabine Interior Parts 2024',
      description: 'Cabine interior parts and accessories catalog',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      master_pdf_id: knex.raw('uuid_generate_v4()'),
      name_pdf: 'Diesel Engine Components 2024',
      description: 'Diesel engine components catalog',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};

