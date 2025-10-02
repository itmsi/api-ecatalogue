/**
 * Seeder: Productions data
 * Seed data untuk tabel productions dengan relasi ke tabel lain
 */

exports.seed = async function(knex) {
  // Delete all existing entries
  await knex('productions').del();
  
  // Get IDs from other seeded tables
  const locations = await knex('locations').select('location_id').limit(5);
  const brands = await knex('brands').select('brand_id').limit(5);
  const driverTypes = await knex('driver_types').select('driver_type_id').limit(5);
  const vehicleWeights = await knex('vehicle_weights').select('vehicle_weight_id').limit(5);
  const manufacturingPlants = await knex('world_manufacturing_plants').select('world_manufacturing_plant_id').limit(5);
  
  // Insert seed data
  await knex('productions').insert([
    {
      production_id: knex.raw('uuid_generate_v4()'),
      vin_number: 'JT123456789VIN001',
      production_name_en: 'Heavy Duty Commercial Truck',
      production_name_cn: '重型商用车',
      production_sequence_number: 1001,
      production_month: 'January',
      production_year: '2024',
      production_description: 'Commercial truck designed for heavy cargo transportation',
      location_id: locations[0]?.location_id || null,
      brand_id: brands[0]?.brand_id || null,
      driver_type_id: driverTypes[0]?.driver_type_id || null,
      vehicle_weight_id: vehicleWeights[2]?.vehicle_weight_id || null,
      world_manufacturing_plant_id: manufacturingPlants[0]?.world_manufacturing_plant_id || null,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      production_id: knex.raw('uuid_generate_v4()'),
      vin_number: 'JT123456789VIN002',
      production_name_en: 'Light Delivery Van',
      production_name_cn: '轻型货运车',
      production_sequence_number: 1002,
      production_month: 'February',
      production_year: '2024',
      production_description: 'Light commercial vehicle for urban delivery services',
      location_id: locations[1]?.location_id || null,
      brand_id: brands[1]?.brand_id || null,
      driver_type_id: driverTypes[1]?.driver_type_id || null,
      vehicle_weight_id: vehicleWeights[0]?.vehicle_weight_id || null,
      world_manufacturing_plant_id: manufacturingPlants[1]?.world_manufacturing_plant_id || null,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      production_id: knex.raw('uuid_generate_v4()'),
      vin_number: 'JT123456789VIN003',
      production_name_en: 'Construction Equipment Truck',
      production_name_cn: '工程设备卡车',
      production_sequence_number: 1003,
      production_month: 'March',
      production_year: '2024',
      production_description: 'Specialized truck for construction equipment transport',
      location_id: locations[2]?.location_id || null,
      brand_id: brands[2]?.brand_id || null,
      driver_type_id: driverTypes[0]?.driver_type_id || null,
      vehicle_weight_id: vehicleWeights[3]?.vehicle_weight_id || null,
      world_manufacturing_plant_id: manufacturingPlants[2]?.world_manufacturing_plant_id || null,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      production_id: knex.raw('uuid_generate_v4()'),
      vin_number: 'JT123456789VIN004',
      production_name_en: 'Electric City Bus',
      production_name_cn: '电动城巴',
      production_sequence_number: 1004,
      production_month: 'April',
      production_year: '2024',
      production_description: 'Electric powered city bus for eco-friendly public transport',
      location_id: locations[3]?.location_id || null,
      brand_id: brands[3]?.brand_id || null,
      driver_type_id: driverTypes[2]?.driver_type_id || null,
      vehicle_weight_id: vehicleWeights[2]?.vehicle_weight_id || null,
      world_manufacturing_plant_id: manufacturingPlants[3]?.world_manufacturing_plant_id || null,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    },
    {
      production_id: knex.raw('uuid_generate_v4()'),
      vin_number: 'JT123456789VIN005',
      production_name_en: 'Military Transport Vehicle',
      production_name_cn: '军用运输车',
      production_sequence_number: 1005,
      production_month: 'May',
      production_year: '2024',
      production_description: 'Armored military vehicle for defensive transportation',
      location_id: locations[4]?.location_id || null,
      brand_id: brands[4]?.brand_id || null,
      driver_type_id: driverTypes[3]?.driver_type_id || null,
      vehicle_weight_id: vehicleWeights[4]?.vehicle_weight_id || null,
      world_manufacturing_plant_id: manufacturingPlants[4]?.world_manufacturing_plant_id || null,
      created_at: knex.fn.now(),
      created_by: knex.raw('uuid_generate_v4()'),
      updated_at: knex.fn.now(),
      updated_by: knex.raw('uuid_generate_v4()'),
      is_delete: false
    }
  ]);
};
