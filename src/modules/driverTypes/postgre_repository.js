const { pgCore } = require('../../config/database');

const TABLE_NAME = 'driver_types';

/**
 * Find all items with pagination and search
 */
const findAll = async (page = 1, limit = 10, search = '', sortBy = 'created_at', sortOrder = 'desc') => {
  const offset = (page - 1) * limit;
  
  let query = pgCore(TABLE_NAME)
    .select('*')
    .where({ is_delete: false })
    .whereNull('deleted_at');
    
  // Add search functionality
  if (search) {
    query = query.where(function() {
      this.where('driver_type_name', 'ilike', `%${search}%`)
        .orWhere('driver_type_description', 'ilike', `%${search}%`)
        .orWhere('driver_type_code', 'ilike', `%${search}%`);
    });
  }
  
  // Add sorting
  query = query.orderBy(sortBy, sortOrder);
  
  const data = await query
    .limit(limit)
    .offset(offset);
    
  // Get total count for pagination
  let countQuery = pgCore(TABLE_NAME)
    .where({ is_delete: false })
    .whereNull('deleted_at');
    
  if (search) {
    countQuery = countQuery.where(function() {
      this.where('driver_type_name', 'ilike', `%${search}%`)
        .orWhere('driver_type_description', 'ilike', `%${search}%`)
        .orWhere('driver_type_code', 'ilike', `%${search}%`);
    });
  }
    
  const total = await countQuery
    .count('driver_type_id as count')
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
  return await pgCore(TABLE_NAME)
    .where({ driver_type_id: id, is_delete: false })
    .whereNull('deleted_at')
    .first();
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  return await pgCore(TABLE_NAME)
    .where({ ...conditions, is_delete: false })
    .whereNull('deleted_at')
    .first();
};

/**
 * Create new item
 */
const create = async (data) => {
  const [result] = await pgCore(TABLE_NAME)
    .insert({
      ...data,
      created_at: pgCore.fn.now(),
      updated_at: pgCore.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Update existing item
 */
const update = async (id, data) => {
  const [result] = await pgCore(TABLE_NAME)
    .where({ driver_type_id: id, is_delete: false })
    .whereNull('deleted_at')
    .update({
      ...data,
      updated_at: pgCore.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Soft delete item
 */
const remove = async (id, deletedBy) => {
  const [result] = await pgCore(TABLE_NAME)
    .where({ driver_type_id: id, is_delete: false })
    .whereNull('deleted_at')
    .update({
      is_delete: true,
      deleted_at: pgCore.fn.now(),
      deleted_by: deletedBy,
      updated_at: pgCore.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted item
 */
const restore = async (id) => {
  const [result] = await pgCore(TABLE_NAME)
    .where({ driver_type_id: id })
    .whereNotNull('deleted_at')
    .update({
      is_delete: false,
      deleted_at: null,
      deleted_by: null,
      updated_at: pgCore.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await pgCore(TABLE_NAME)
    .where({ driver_type_id: id })
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
