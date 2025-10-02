const { pgCore: db } = require('../../config/database');
const { applyPagination, applySorting, applySearch } = require('../../utils/query_builder');

const TABLE_NAME = 'locations';

/**
 * Find all items with pagination
 */
const findAll = async (page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc', search = '') => {
  const offset = (page - 1) * limit;
  
  // Config untuk sorting dan search
  const allowedSortColumns = ['location_id', 'location_name', 'created_at', 'updated_at'];
  const searchableColumns = ['location_name', 'location_description'];
  
  // Parse sorting dengan validasi
  const sorting = {
    sortBy: allowedSortColumns.includes(sortBy) ? sortBy : 'created_at',
    sortOrder: ['asc', 'desc'].includes(sortOrder?.toLowerCase()) ? sortOrder.toLowerCase() : 'desc'
  };
  
  // Parse search
  const searchParams = {
    searchTerm: search && typeof search === 'string' ? search.trim() : '',
    searchableColumns
  };
  
  // Parse pagination
  const pagination = { limit: parseInt(limit), offset };
  
  // Build query
  let query = db(TABLE_NAME)
    .select('*')
    .where({ is_delete: false });
  
  // Apply search
  query = applySearch(query, searchParams);
  
  // Apply sorting
  query = applySorting(query, sorting);
  
  // Apply pagination
  query = applyPagination(query, pagination);
  
  // Execute query
  const data = await query;
  
  // Build count query
  let countQuery = db(TABLE_NAME)
    .where({ is_delete: false });
  
  // Apply search to count query
  countQuery = applySearch(countQuery, searchParams);
  
  const total = await countQuery.count('location_id as count').first();
    
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
    .where({ location_id: id, is_delete: false })
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
const create = async (data) => {
  const [result] = await db(TABLE_NAME)
    .insert({
      ...data,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
      is_delete: false
    })
    .returning('*');
  return result;
};

/**
 * Update existing item
 */
const update = async (id, data) => {
  const [result] = await db(TABLE_NAME)
    .where({ location_id: id, is_delete: false })
    .update({
      ...data,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Soft delete item
 */
const remove = async (id, deletedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ location_id: id, is_delete: false })
    .update({
      deleted_at: db.fn.now(),
      deleted_by: deletedBy,
      is_delete: true,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted item
 */
const restore = async (id, updatedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ location_id: id })
    .whereNotNull('deleted_at')
    .update({
      deleted_at: null,
      deleted_by: null,
      is_delete: false,
      updated_at: db.fn.now(),
      updated_by: updatedBy
    })
    .returning('*');
  return result;
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ location_id: id })
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
