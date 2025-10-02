const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'productions';

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
 * Find single item by ID
 */
const findById = async (id) => {
  return await db(TABLE_NAME)
    .where({ production_id: id, is_delete: false })
    .whereNull('deleted_at')
    .first();
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
 * Create new item
 */
const create = async (data, userData = null) => {
  const insertData = {
    ...data,
    created_at: db.fn.now(),
    updated_at: db.fn.now(),
    is_delete: false
  };
  
  // Auto-set created_by from token
  if (userData) {
    insertData.created_by = userData.employee_id || userData.user_id;
    insertData.updated_by = userData.employee_id || userData.user_id;
  }
  
  const [result] = await db(TABLE_NAME)
    .insert(insertData)
    .returning('*');
  return result;
};

/**
 * Update existing item
 */
const update = async (id, data, userData = null) => {
  const updateData = {
    ...data,
    updated_at: db.fn.now()
  };
  
  // Auto-set updated_by from token
  if (userData) {
    updateData.updated_by = userData.employee_id || userData.user_id;
  }
  
  const [result] = await db(TABLE_NAME)
    .where({ production_id: id, is_delete: false })
    .whereNull('deleted_at')
    .update(updateData)
    .returning('*');
  return result;
};

/**
 * Soft delete item
 */
const remove = async (id, userData = null) => {
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
  
  const [result] = await db(TABLE_NAME)
    .where({ production_id: id, is_delete: false })
    .whereNull('deleted_at')
    .update(updateData)
    .returning('*');
  return result;
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
