const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'type_steerings';

/**
 * Find all items with pagination, search, and sorting
 */
const findAll = async (page = 1, limit = 10, search = '', sort_by = 'created_at', sort_order = 'desc') => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select('*')
    .where({ is_delete: false });
  
  // Search functionality
  if (search) {
    query = query.where(function() {
      this.whereILike('type_steering_name_en', `%${search}%`)
        .orWhereILike('type_steering_name_cn', `%${search}%`)
        .orWhereILike('type_steering_description', `%${search}%`);
    });
  }
  
  // Sorting
  const validSortFields = ['created_at', 'updated_at', 'type_steering_name_en', 'type_steering_name_cn'];
  const sortField = validSortFields.includes(sort_by) ? sort_by : 'created_at';
  const sortDirection = sort_order.toLowerCase() === 'asc' ? 'asc' : 'desc';
  
  const data = await query
    .orderBy(sortField, sortDirection)
    .limit(limit)
    .offset(offset);
    
  // Get total count for pagination
  let countQuery = db(TABLE_NAME)
    .where({ is_delete: false });
    
  if (search) {
    countQuery = countQuery.where(function() {
      this.whereILike('type_steering_name_en', `%${search}%`)
        .orWhereILike('type_steering_name_cn', `%${search}%`)
        .orWhereILike('type_steering_description', `%${search}%`);
    });
  }
  
  const total = await countQuery.count('type_steering_id as count').first();
    
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
    .where({ type_steering_id: id, is_delete: false })
    .first();
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  return await db(TABLE_NAME)
    .where({ ...conditions, is_delete: false })
    .first();
};

/**
 * Create new item
 */
const create = async (data, userId) => {
  const [result] = await db(TABLE_NAME)
    .insert({
      ...data,
      created_by: userId,
      updated_by: userId,
      created_at: db.fn.now(),
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Update existing item
 */
const update = async (id, data, userId) => {
  const [result] = await db(TABLE_NAME)
    .where({ type_steering_id: id, is_delete: false })
    .update({
      ...data,
      updated_by: userId,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Soft delete item
 */
const remove = async (id, userId) => {
  const [result] = await db(TABLE_NAME)
    .where({ type_steering_id: id, is_delete: false })
    .update({
      is_delete: true,
      deleted_at: db.fn.now(),
      deleted_by: userId,
      updated_by: userId,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted item
 */
const restore = async (id, userId) => {
  const [result] = await db(TABLE_NAME)
    .where({ type_steering_id: id })
    .where('is_delete', true)
    .update({
      is_delete: false,
      deleted_at: null,
      deleted_by: null,
      updated_by: userId,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ type_steering_id: id })
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

