/**
 * Seeder: Catalog Items data
 * Seed data untuk tabel catalog_items dengan relasi ke catalogs
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('catalog_items').del();
  
  // Get IDs from catalogs table
  const catalogs = await knex('catalogs').select('catalog_id').limit(10);
  
  // Insert seed data
  await knex('catalog_items').insert([
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[0]?.catalog_id || null,
      target_id: 'ITM001',
      diagram_serial_number: 'DRG001',
      part_number: 'PN-001',
      catalog_item_name_en: 'Engine Piston Ring Set',
      catalog_item_name_ch: '发动机活塞环套',
      catalog_item_quantity: 8,
      catalog_item_description: 'Complete set of piston rings for 4-cylinder engine',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[1]?.catalog_id || null,
      target_id: 'ITM002',
      diagram_serial_number: 'DRG002',
      part_number: 'PN-002',
      catalog_item_name_en: 'Transmission Gear Set',
      catalog_item_name_ch: '变速箱齿轮组',
      catalog_item_quantity: 12,
      catalog_item_description: 'Complete gear set for 6-speed manual transmission',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[2]?.catalog_id || null,
      target_id: 'ITM003',
      diagram_serial_number: 'DRG003',
      part_number: 'PN-003',
      catalog_item_name_en: 'Brake Pad Set',
      catalog_item_name_ch: '刹车片',
      catalog_item_quantity: 4,
      catalog_item_description: 'Front and rear brake pad set with brake fluid',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[3]?.catalog_id || null,
      target_id: 'ITM004',
      diagram_serial_number: 'DRG004',
      part_number: 'PN-004',
      catalog_item_name_en: 'Suspension Strut Assembly',
      catalog_item_name_ch: '悬挂支柱总成',
      catalog_item_quantity: 2,
      catalog_item_description: 'Complete front suspension strut with coil spring',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[4]?.catalog_id || null,
      target_id: 'ITM005',
      diagram_serial_number: 'DRG005',
      part_number: 'PN-005',
      catalog_item_name_en: 'Electrical Wire Harness',
      catalog_item_name_ch: '电线束',
      catalog_item_quantity: 1,
      catalog_item_description: 'Complete wiring harness for engine bay and interior',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    // Additional catalog items for sub-catalogs
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[5]?.catalog_id || null,
      target_id: 'ITM006',
      diagram_serial_number: 'DRG006',
      part_number: 'PN-006',
      catalog_item_name_en: 'Turbocharger Unit',
      catalog_item_name_ch: '涡轮增压单元',
      catalog_item_quantity: 1,
      catalog_item_description: 'High performance turbocharger with intercooler',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[6]?.catalog_id || null,
      target_id: 'ITM007',
      diagram_serial_number: 'DRG007',
      part_number: 'PN-007',
      catalog_item_name_en: 'Hydraulic Pump Assembly',
      catalog_item_name_ch: '液压泵总成',
      catalog_item_quantity: 1,
      catalog_item_description: 'Heavy duty hydraulic pump for construction equipment',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[7]?.catalog_id || null,
      target_id: 'ITM008',
      diagram_serial_number: 'DRG008',
      part_number: 'PN-008',
      catalog_item_name_en: 'Climate Control Module',
      catalog_item_name_ch: '气候控制模块',
      catalog_item_quantity: 1,
      catalog_item_description: 'Advanced climate control system with digital controls',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[8]?.catalog_id || null,
      target_id: 'ITM009',
      diagram_serial_number: 'DRG003',
      part_number: 'PN-009',
      catalog_item_name_en: 'LED Headlight Set',
      catalog_item_name_ch: 'LED前大灯套',
      catalog_item_quantity: 2,
      catalog_item_description: 'High efficiency LED headlight with automatic beam control',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      catalog_item_id: knex.raw('uuid_generate_v4()'),
      catalog_id: catalogs[9]?.catalog_id || null,
      target_id: 'ITM010',
      diagram_serial_number: 'DRG010',
      part_number: 'PN-010',
      catalog_item_name_en: 'Digital Dashboard Display',
      catalog_item_name_ch: '数字仪表盘',
      catalog_item_quantity: 1,
      catalog_item_description: '12-inch digital dashboard with touchscreen interface',
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};
