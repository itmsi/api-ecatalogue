const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'productions';
const TABLE_DETAIL_NAME = 'productions_detail';

/**
 * Helper function to convert empty strings to null for UUID fields
 */
const sanitizeData = (data) => {
  const uuidFields = [
    'production_location_id',
    'production_brand_id', 
    'production_driver_type_id',
    'production_vehicle_weight_id',
    'production_world_manufacturing_plant_id'
  ];
  
  const sanitized = { ...data };
  
  uuidFields.forEach(field => {
    if (sanitized[field] === '' || sanitized[field] === undefined) {
      sanitized[field] = null;
    }
  });
  
  return sanitized;
};

/**
 * Find all items with pagination and search
 */
const findAll = async (page = 1, limit = 10, search = '', sortBy = 'created_at', sortOrder = 'desc') => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select('*')
    .where({ is_delete: false })
    .whereNull('deleted_at');
    
  // Add search functionality
  if (search) {
    query = query.where(function() {
      this.where('production_name_en', 'ilike', `%${search}%`)
        .orWhere('production_name_cn', 'ilike', `%${search}%`)
        .orWhere('vin_number', 'ilike', `%${search}%`)
        .orWhere('production_description', 'ilike', `%${search}%`);
    });
  }
    
  const data = await query
    .orderBy(sortBy, sortOrder)
    .limit(limit)
    .offset(offset);
    
  const total = await db(TABLE_NAME)
    .where({ is_delete: false })
    .whereNull('deleted_at')
    .count('production_id as count')
    .first();
    
  return {
    items: data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: parseInt(total.count),
      totalPages: Math.ceil(total.count / limit)
    }
  };
};

/**
 * Find single item by ID with details and related data
 */
const findById = async (id) => {
  // Get production with related data using joins
  const production = await db(TABLE_NAME)
    .leftJoin('locations', 'productions.production_location_id', 'locations.location_id')
    .leftJoin('brands', 'productions.production_brand_id', 'brands.brand_id')
    .leftJoin('driver_types', 'productions.production_driver_type_id', 'driver_types.driver_type_id')
    .leftJoin('vehicle_weights', 'productions.production_vehicle_weight_id', 'vehicle_weights.vehicle_weight_id')
    .leftJoin('world_manufacturing_plants', 'productions.production_world_manufacturing_plant_id', 'world_manufacturing_plants.world_manufacturing_plant_id')
    .where({ 'productions.production_id': id, 'productions.is_delete': false })
    .whereNull('productions.deleted_at')
    .select(
      'productions.*',
      'locations.location_name',
      'locations.location_code',
      'locations.location_description as location_description',
      'brands.brand_name',
      'brands.brand_code',
      'brands.brand_description as brand_description',
      'driver_types.driver_type_name',
      'driver_types.driver_type_code',
      'driver_types.driver_type_description',
      'vehicle_weights.vehicle_weight_name',
      'vehicle_weights.vehicle_weight_code',
      'vehicle_weights.vehicle_weight_description',
      'world_manufacturing_plants.world_manufacturing_plant_name',
      'world_manufacturing_plants.world_manufacturing_plant_code',
      'world_manufacturing_plants.world_manufacturing_plant_description'
    )
    .first();
    
  if (!production) {
    return null;
  }
  
  // Get production details with comprehensive related data
  const details = await db(TABLE_DETAIL_NAME)
    .leftJoin('master_pdf', 'productions_detail.master_pdf_id', 'master_pdf.master_pdf_id')
    .leftJoin('all_item_parents_catalogs', 'master_pdf.master_pdf_id', 'all_item_parents_catalogs.master_pdf_id')
    .leftJoin('item_catalog_axles', function() {
      this.on('master_pdf.master_pdf_id', '=', 'item_catalog_axles.master_pdf_id')
          .andOn('master_pdf.master_catalog', '=', db.raw("'axle'"));
    })
    .leftJoin('item_catalog_cabines', function() {
      this.on('master_pdf.master_pdf_id', '=', 'item_catalog_cabines.master_pdf_id')
          .andOn('master_pdf.master_catalog', '=', db.raw("'cabin'"));
    })
    .leftJoin('item_catalog_steerings', function() {
      this.on('master_pdf.master_pdf_id', '=', 'item_catalog_steerings.master_pdf_id')
          .andOn('master_pdf.master_catalog', '=', db.raw("'steering'"));
    })
    .leftJoin('item_catalog_engines', function() {
      this.on('master_pdf.master_pdf_id', '=', 'item_catalog_engines.master_pdf_id')
          .andOn('master_pdf.master_catalog', '=', db.raw("'engine'"));
    })
    .leftJoin('item_catalog_transmissions', function() {
      this.on('master_pdf.master_pdf_id', '=', 'item_catalog_transmissions.master_pdf_id')
          .andOn('master_pdf.master_catalog', '=', db.raw("'transmission'"));
    })
    // Join dengan tabel master (axels, cabines, steerings, engines, transmissions)
    .leftJoin('axels', 'item_catalog_axles.axel_id', 'axels.axel_id')
    .leftJoin('cabines', 'item_catalog_cabines.cabine_id', 'cabines.cabines_id')
    .leftJoin('steerings', 'item_catalog_steerings.steering_id', 'steerings.steering_id')
    .leftJoin('engines', 'item_catalog_engines.engine_id', 'engines.engines_id')
    .leftJoin('transmissions', 'item_catalog_transmissions.transmission_id', 'transmissions.transmission_id')
    // Join dengan tabel type (type_axels, type_cabines, type_steerings, type_engines, type_transmissions)
    .leftJoin('type_axels', 'item_catalog_axles.type_axel_id', 'type_axels.type_axel_id')
    .leftJoin('type_cabines', 'item_catalog_cabines.type_cabine_id', 'type_cabines.type_cabine_id')
    .leftJoin('type_steerings', 'item_catalog_steerings.type_steering_id', 'type_steerings.type_steering_id')
    .leftJoin('type_engines', 'item_catalog_engines.type_engine_id', 'type_engines.type_engine_id')
    .leftJoin('type_transmissions', 'item_catalog_transmissions.type_transmission_id', 'type_transmissions.type_transmission_id')
    .where({ 'productions_detail.production_id': id, 'productions_detail.is_delete': false })
    .whereNull('productions_detail.deleted_at')
    .select(
      'productions_detail.*',
      'master_pdf.name_pdf',
      'master_pdf.master_catalog',
      'master_pdf.description as pdf_description',
      // All item parents catalogs
      'all_item_parents_catalogs.all_item_parents_catalog_id',
      'all_item_parents_catalogs.master_pdf_id as all_item_parents_catalog_master_pdf_id',
      'all_item_parents_catalogs.master_catalog as all_item_parents_catalog_master_catalog',
      'all_item_parents_catalogs.master_category_id',
      'all_item_parents_catalogs.type_category_id',
      'all_item_parents_catalogs.file_foto as all_item_parents_catalog_file_foto',
      // Item catalog axles
      'item_catalog_axles.item_catalog_axle_id',
      'item_catalog_axles.axel_id',
      'item_catalog_axles.type_axel_id',
      'item_catalog_axles.target_id as axle_target_id',
      'item_catalog_axles.diagram_serial_number as axle_diagram_serial_number',
      'item_catalog_axles.part_number as axle_part_number',
      'item_catalog_axles.catalog_item_name_en as axle_catalog_item_name_en',
      'item_catalog_axles.catalog_item_name_ch as axle_catalog_item_name_ch',
      'item_catalog_axles.description as axle_description',
      'item_catalog_axles.quantity as axle_quantity',
      'item_catalog_axles.file_foto as axle_file_foto',
      // Item catalog cabines
      'item_catalog_cabines.item_catalog_cabine_id',
      'item_catalog_cabines.cabine_id',
      'item_catalog_cabines.type_cabine_id',
      'item_catalog_cabines.target_id as cabine_target_id',
      'item_catalog_cabines.diagram_serial_number as cabine_diagram_serial_number',
      'item_catalog_cabines.part_number as cabine_part_number',
      'item_catalog_cabines.catalog_item_name_en as cabine_catalog_item_name_en',
      'item_catalog_cabines.catalog_item_name_ch as cabine_catalog_item_name_ch',
      'item_catalog_cabines.description as cabine_description',
      'item_catalog_cabines.quantity as cabine_quantity',
      'item_catalog_cabines.file_foto as cabine_file_foto',
      // Item catalog steerings
      'item_catalog_steerings.item_catalog_steering_id',
      'item_catalog_steerings.steering_id',
      'item_catalog_steerings.type_steering_id',
      'item_catalog_steerings.target_id as steering_target_id',
      'item_catalog_steerings.diagram_serial_number as steering_diagram_serial_number',
      'item_catalog_steerings.part_number as steering_part_number',
      'item_catalog_steerings.catalog_item_name_en as steering_catalog_item_name_en',
      'item_catalog_steerings.catalog_item_name_ch as steering_catalog_item_name_ch',
      'item_catalog_steerings.description as steering_description',
      'item_catalog_steerings.quantity as steering_quantity',
      'item_catalog_steerings.file_foto as steering_file_foto',
      // Item catalog engines
      'item_catalog_engines.item_catalog_engine_id',
      'item_catalog_engines.engine_id',
      'item_catalog_engines.type_engine_id',
      'item_catalog_engines.target_id as engine_target_id',
      'item_catalog_engines.diagram_serial_number as engine_diagram_serial_number',
      'item_catalog_engines.part_number as engine_part_number',
      'item_catalog_engines.catalog_item_name_en as engine_catalog_item_name_en',
      'item_catalog_engines.catalog_item_name_ch as engine_catalog_item_name_ch',
      'item_catalog_engines.description as engine_description',
      'item_catalog_engines.quantity as engine_quantity',
      'item_catalog_engines.file_foto as engine_file_foto',
      // Item catalog transmissions
      'item_catalog_transmissions.item_catalog_transmission_id',
      'item_catalog_transmissions.transmission_id',
      'item_catalog_transmissions.type_transmission_id',
      'item_catalog_transmissions.target_id as transmission_target_id',
      'item_catalog_transmissions.diagram_serial_number as transmission_diagram_serial_number',
      'item_catalog_transmissions.part_number as transmission_part_number',
      'item_catalog_transmissions.catalog_item_name_en as transmission_catalog_item_name_en',
      'item_catalog_transmissions.catalog_item_name_ch as transmission_catalog_item_name_ch',
      'item_catalog_transmissions.description as transmission_description',
      'item_catalog_transmissions.quantity as transmission_quantity',
      'item_catalog_transmissions.file_foto as transmission_file_foto',
      // Master tables (axels, cabines, steerings, engines, transmissions)
      'axels.axel_name_en',
      'axels.axel_name_cn',
      'axels.axel_description',
      'cabines.cabines_name_en',
      'cabines.cabines_name_cn',
      'cabines.cabines_description',
      'steerings.steering_name_en',
      'steerings.steering_name_cn',
      'steerings.steering_description',
      'engines.engines_name_en',
      'engines.engines_name_cn',
      'engines.engines_description',
      'transmissions.transmission_name_en',
      'transmissions.transmission_name_cn',
      'transmissions.transmission_description',
      // Type tables (type_axels, type_cabines, type_steerings, type_engines, type_transmissions)
      'type_axels.type_axel_name_en',
      'type_axels.type_axel_name_cn',
      'type_axels.type_axel_description',
      'type_cabines.type_cabine_name_en',
      'type_cabines.type_cabine_name_cn',
      'type_cabines.type_cabine_description',
      'type_steerings.type_steering_name_en',
      'type_steerings.type_steering_name_cn',
      'type_steerings.type_steering_description',
      'type_engines.type_engine_name_en',
      'type_engines.type_engine_name_cn',
      'type_engines.type_engine_description',
      'type_transmissions.type_transmission_name_en',
      'type_transmissions.type_transmission_name_cn',
      'type_transmissions.type_transmission_description'
    );
    
  // Format the response with related data
  const formattedProduction = {
    ...production,
    location: production.location_name ? {
      location_id: production.production_location_id,
      location_name: production.location_name,
      location_code: production.location_code,
      location_description: production.location_description
    } : null,
    brand: production.brand_name ? {
      brand_id: production.production_brand_id,
      brand_name: production.brand_name,
      brand_code: production.brand_code,
      brand_description: production.brand_description
    } : null,
    driver_type: production.driver_type_name ? {
      driver_type_id: production.production_driver_type_id,
      driver_type_name: production.driver_type_name,
      driver_type_code: production.driver_type_code,
      driver_type_description: production.driver_type_description
    } : null,
    vehicle_weight: production.vehicle_weight_name ? {
      vehicle_weight_id: production.production_vehicle_weight_id,
      vehicle_weight_name: production.vehicle_weight_name,
      vehicle_weight_code: production.vehicle_weight_code,
      vehicle_weight_description: production.vehicle_weight_description
    } : null,
    world_manufacturing_plant: production.world_manufacturing_plant_name ? {
      world_manufacturing_plant_id: production.production_world_manufacturing_plant_id,
      world_manufacturing_plant_name: production.world_manufacturing_plant_name,
      world_manufacturing_plant_code: production.world_manufacturing_plant_code,
      world_manufacturing_plant_description: production.world_manufacturing_plant_description
    } : null,
    details: details.map(detail => {
      const formattedDetail = {
        production_detail_id: detail.production_detail_id,
        production_id: detail.production_id,
        master_pdf_id: detail.master_pdf_id,
        master_pdf: detail.name_pdf ? {
          master_pdf_id: detail.master_pdf_id,
          name_pdf: detail.name_pdf,
          master_catalog: detail.master_catalog,
          description: detail.pdf_description
        } : null,
        all_item_parents_catalogs: detail.all_item_parents_catalog_id ? {
          all_item_parents_catalog_id: detail.all_item_parents_catalog_id,
          master_pdf_id: detail.all_item_parents_catalog_master_pdf_id,
          master_catalog: detail.all_item_parents_catalog_master_catalog,
          master_category_id: detail.master_category_id,
          type_category_id: detail.type_category_id,
          file_foto: detail.all_item_parents_catalog_file_foto
        } : null,
        created_at: detail.created_at,
        created_by: detail.created_by,
        updated_at: detail.updated_at,
        updated_by: detail.updated_by,
        deleted_at: detail.deleted_at,
        deleted_by: detail.deleted_by,
        is_delete: detail.is_delete
      };

      // Add catalog items based on master_catalog type
      if (detail.master_catalog === 'axle' && detail.item_catalog_axle_id) {
        formattedDetail.item_catalog_axle = {
          item_catalog_axle_id: detail.item_catalog_axle_id,
          axel_id: detail.axel_id,
          type_axel_id: detail.type_axel_id,
          target_id: detail.axle_target_id,
          diagram_serial_number: detail.axle_diagram_serial_number,
          part_number: detail.axle_part_number,
          catalog_item_name_en: detail.axle_catalog_item_name_en,
          catalog_item_name_ch: detail.axle_catalog_item_name_ch,
          description: detail.axle_description,
          quantity: detail.axle_quantity,
          file_foto: detail.axle_file_foto,
          axel: detail.axel_name_en ? {
            axel_id: detail.axel_id,
            axel_name_en: detail.axel_name_en,
            axel_name_cn: detail.axel_name_cn,
            axel_description: detail.axel_description
          } : null,
          type_axel: detail.type_axel_name_en ? {
            type_axel_id: detail.type_axel_id,
            type_axel_name_en: detail.type_axel_name_en,
            type_axel_name_cn: detail.type_axel_name_cn,
            type_axel_description: detail.type_axel_description
          } : null
        };
      }

      if (detail.master_catalog === 'cabin' && detail.item_catalog_cabine_id) {
        formattedDetail.item_catalog_cabine = {
          item_catalog_cabine_id: detail.item_catalog_cabine_id,
          cabine_id: detail.cabine_id,
          type_cabine_id: detail.type_cabine_id,
          target_id: detail.cabine_target_id,
          diagram_serial_number: detail.cabine_diagram_serial_number,
          part_number: detail.cabine_part_number,
          catalog_item_name_en: detail.cabine_catalog_item_name_en,
          catalog_item_name_ch: detail.cabine_catalog_item_name_ch,
          description: detail.cabine_description,
          quantity: detail.cabine_quantity,
          file_foto: detail.cabine_file_foto,
          cabine: detail.cabines_name_en ? {
            cabines_id: detail.cabine_id,
            cabines_name_en: detail.cabines_name_en,
            cabines_name_cn: detail.cabines_name_cn,
            cabines_description: detail.cabines_description
          } : null,
          type_cabine: detail.type_cabine_name_en ? {
            type_cabine_id: detail.type_cabine_id,
            type_cabine_name_en: detail.type_cabine_name_en,
            type_cabine_name_cn: detail.type_cabine_name_cn,
            type_cabine_description: detail.type_cabine_description
          } : null
        };
      }

      if (detail.master_catalog === 'steering' && detail.item_catalog_steering_id) {
        formattedDetail.item_catalog_steering = {
          item_catalog_steering_id: detail.item_catalog_steering_id,
          steering_id: detail.steering_id,
          type_steering_id: detail.type_steering_id,
          target_id: detail.steering_target_id,
          diagram_serial_number: detail.steering_diagram_serial_number,
          part_number: detail.steering_part_number,
          catalog_item_name_en: detail.steering_catalog_item_name_en,
          catalog_item_name_ch: detail.steering_catalog_item_name_ch,
          description: detail.steering_description,
          quantity: detail.steering_quantity,
          file_foto: detail.steering_file_foto,
          steering: detail.steering_name_en ? {
            steering_id: detail.steering_id,
            steering_name_en: detail.steering_name_en,
            steering_name_cn: detail.steering_name_cn,
            steering_description: detail.steering_description
          } : null,
          type_steering: detail.type_steering_name_en ? {
            type_steering_id: detail.type_steering_id,
            type_steering_name_en: detail.type_steering_name_en,
            type_steering_name_cn: detail.type_steering_name_cn,
            type_steering_description: detail.type_steering_description
          } : null
        };
      }

      if (detail.master_catalog === 'engine' && detail.item_catalog_engine_id) {
        formattedDetail.item_catalog_engine = {
          item_catalog_engine_id: detail.item_catalog_engine_id,
          engine_id: detail.engine_id,
          type_engine_id: detail.type_engine_id,
          target_id: detail.engine_target_id,
          diagram_serial_number: detail.engine_diagram_serial_number,
          part_number: detail.engine_part_number,
          catalog_item_name_en: detail.engine_catalog_item_name_en,
          catalog_item_name_ch: detail.engine_catalog_item_name_ch,
          description: detail.engine_description,
          quantity: detail.engine_quantity,
          file_foto: detail.engine_file_foto,
          engine: detail.engines_name_en ? {
            engines_id: detail.engine_id,
            engines_name_en: detail.engines_name_en,
            engines_name_cn: detail.engines_name_cn,
            engines_description: detail.engines_description
          } : null,
          type_engine: detail.type_engine_name_en ? {
            type_engine_id: detail.type_engine_id,
            type_engine_name_en: detail.type_engine_name_en,
            type_engine_name_cn: detail.type_engine_name_cn,
            type_engine_description: detail.type_engine_description
          } : null
        };
      }

      if (detail.master_catalog === 'transmission' && detail.item_catalog_transmission_id) {
        formattedDetail.item_catalog_transmission = {
          item_catalog_transmission_id: detail.item_catalog_transmission_id,
          transmission_id: detail.transmission_id,
          type_transmission_id: detail.type_transmission_id,
          target_id: detail.transmission_target_id,
          diagram_serial_number: detail.transmission_diagram_serial_number,
          part_number: detail.transmission_part_number,
          catalog_item_name_en: detail.transmission_catalog_item_name_en,
          catalog_item_name_ch: detail.transmission_catalog_item_name_ch,
          description: detail.transmission_description,
          quantity: detail.transmission_quantity,
          file_foto: detail.transmission_file_foto,
          transmission: detail.transmission_name_en ? {
            transmission_id: detail.transmission_id,
            transmission_name_en: detail.transmission_name_en,
            transmission_name_cn: detail.transmission_name_cn,
            transmission_description: detail.transmission_description
          } : null,
          type_transmission: detail.type_transmission_name_en ? {
            type_transmission_id: detail.type_transmission_id,
            type_transmission_name_en: detail.type_transmission_name_en,
            type_transmission_name_cn: detail.type_transmission_name_cn,
            type_transmission_description: detail.type_transmission_description
          } : null
        };
      }

      return formattedDetail;
    })
  };
  
  // Remove the joined fields from the main object to avoid duplication
  delete formattedProduction.location_name;
  delete formattedProduction.location_code;
  delete formattedProduction.location_description;
  delete formattedProduction.brand_name;
  delete formattedProduction.brand_code;
  delete formattedProduction.brand_description;
  delete formattedProduction.driver_type_name;
  delete formattedProduction.driver_type_code;
  delete formattedProduction.driver_type_description;
  delete formattedProduction.vehicle_weight_name;
  delete formattedProduction.vehicle_weight_code;
  delete formattedProduction.vehicle_weight_description;
  delete formattedProduction.world_manufacturing_plant_name;
  delete formattedProduction.world_manufacturing_plant_code;
  delete formattedProduction.world_manufacturing_plant_description;
  
  return formattedProduction;
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  return await db(TABLE_NAME)
    .where({ ...conditions, is_delete: false })
    .whereNull('deleted_at')
    .first();
};

/**
 * Create new item with details (using transaction)
 */
const create = async (data, userData = null) => {
  return await db.transaction(async (trx) => {
    // Prepare production data (exclude data_details)
    const { data_details, ...productionData } = data;
    
    // Sanitize data to convert empty strings to null for UUID fields
    const sanitizedData = sanitizeData(productionData);
    
    const insertData = {
      ...sanitizedData,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
      is_delete: false
    };
    
    // Auto-set created_by from token
    if (userData) {
      insertData.created_by = userData.employee_id || userData.user_id;
      insertData.updated_by = userData.employee_id || userData.user_id;
    }
    
    // Insert production
    const [production] = await trx(TABLE_NAME)
      .insert(insertData)
      .returning('*');
    
    // Insert production details if provided
    if (data_details && Array.isArray(data_details) && data_details.length > 0) {
      const detailsToInsert = data_details.map(detail => ({
        production_id: production.production_id,
        master_pdf_id: detail.master_pdf_id || null,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
        created_by: userData ? (userData.employee_id || userData.user_id) : null,
        updated_by: userData ? (userData.employee_id || userData.user_id) : null,
        is_delete: false
      }));
      
      await trx(TABLE_DETAIL_NAME).insert(detailsToInsert);
      
      // Get inserted details
      const details = await trx(TABLE_DETAIL_NAME)
        .where({ production_id: production.production_id, is_delete: false })
        .whereNull('deleted_at')
        .select('*');
        
      production.details = details;
    } else {
      production.details = [];
    }
    
    return production;
  });
};

/**
 * Update existing item with details (using transaction)
 */
const update = async (id, data, userData = null) => {
  return await db.transaction(async (trx) => {
    // Prepare production data (exclude data_details)
    const { data_details, ...productionData } = data;
    
    // Sanitize data to convert empty strings to null for UUID fields
    const sanitizedData = sanitizeData(productionData);
    
    const updateData = {
      ...sanitizedData,
      updated_at: db.fn.now()
    };
    
    // Auto-set updated_by from token
    if (userData) {
      updateData.updated_by = userData.employee_id || userData.user_id;
    }
    
    // Update production
    const [production] = await trx(TABLE_NAME)
      .where({ production_id: id, is_delete: false })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
    
    if (!production) {
      return null;
    }
    
    // Update production details if provided
    if (data_details !== undefined) {
      // Soft delete existing details
      await trx(TABLE_DETAIL_NAME)
        .where({ production_id: id, is_delete: false })
        .whereNull('deleted_at')
        .update({
          deleted_at: db.fn.now(),
          updated_at: db.fn.now(),
          deleted_by: userData ? (userData.employee_id || userData.user_id) : null,
          updated_by: userData ? (userData.employee_id || userData.user_id) : null,
          is_delete: true
        });
      
      // Insert new details if provided
      if (Array.isArray(data_details) && data_details.length > 0) {
        const detailsToInsert = data_details.map(detail => ({
          production_id: production.production_id,
          master_pdf_id: detail.master_pdf_id || null,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
          created_by: userData ? (userData.employee_id || userData.user_id) : null,
          updated_by: userData ? (userData.employee_id || userData.user_id) : null,
          is_delete: false
        }));
        
        await trx(TABLE_DETAIL_NAME).insert(detailsToInsert);
      }
    }
    
    // Get current details
    const details = await trx(TABLE_DETAIL_NAME)
      .where({ production_id: id, is_delete: false })
      .whereNull('deleted_at')
      .select('*');
      
    production.details = details;
    
    return production;
  });
};

/**
 * Soft delete item with details (using transaction)
 */
const remove = async (id, userData = null) => {
  return await db.transaction(async (trx) => {
    const updateData = {
      deleted_at: db.fn.now(),
      updated_at: db.fn.now(),
      is_delete: true
    };
    
    // Auto-set deleted_by from token
    if (userData) {
      updateData.deleted_by = userData.employee_id || userData.user_id;
      updateData.updated_by = userData.employee_id || userData.user_id;
    }
    
    // Soft delete production
    const [result] = await trx(TABLE_NAME)
      .where({ production_id: id, is_delete: false })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
    
    if (result) {
      // Soft delete all production details
      await trx(TABLE_DETAIL_NAME)
        .where({ production_id: id, is_delete: false })
        .whereNull('deleted_at')
        .update(updateData);
    }
    
    return result;
  });
};

/**
 * Restore soft deleted item
 */
const restore = async (id, userData = null) => {
  const updateData = {
    deleted_at: null,
    updated_at: db.fn.now(),
    is_delete: false
  };
  
  // Auto-set updated_by from token
  if (userData) {
    updateData.updated_by = userData.employee_id || userData.user_id;
  }
  
  const [result] = await db(TABLE_NAME)
    .where({ production_id: id })
    .whereNotNull('deleted_at')
    .update(updateData)
    .returning('*');
  return result;
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ production_id: id })
    .del();
};

module.exports = {
  findAll,
  findById,
  findOne,
  create,
  update,
  remove,
  restore,
  hardDelete
};
