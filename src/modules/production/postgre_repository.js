const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'productions';
const TABLE_DETAIL_NAME = 'productions_detail';

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
 * Find single item by ID with details
 */
const findById = async (id) => {
  const production = await db(TABLE_NAME)
    .where({ production_id: id, is_delete: false })
    .whereNull('deleted_at')
    .first();
    
  if (!production) {
    return null;
  }
  
  // Get production details
  const details = await db(TABLE_DETAIL_NAME)
    .where({ production_id: id, is_delete: false })
    .whereNull('deleted_at')
    .select('*');
    
  production.details = details;
  return production;
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
    
    const insertData = {
      ...productionData,
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
        production_detail_description: detail.production_detail_description || null,
        engine_id: detail.engine_id || null,
        steering_id: detail.steering_id || null,
        cabine_id: detail.cabine_id || null,
        axle_id: detail.axle_id || null,
        transmission_id: detail.transmission_id || null,
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
    
    const updateData = {
      ...productionData,
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
          production_detail_description: detail.production_detail_description || null,
          engine_id: detail.engine_id || null,
          steering_id: detail.steering_id || null,
          cabine_id: detail.cabine_id || null,
          axle_id: detail.axle_id || null,
          transmission_id: detail.transmission_id || null,
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
