const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'brands';

/**
 * Find all brands with pagination and filters
 */
const findAll = async (page = 1, limit = 10, filters = {}) => {
  const offset = (page - 1) * limit;
  const { search = '', sort_by = 'created_at', sort_order = 'desc' } = filters;
  
  let query = db(TABLE_NAME)
    .select('*')
    .where({ is_delete: false });
  
  // Apply search filter
  if (search && search.trim() !== '') {
    query = query.andWhere(function() {
      this.whereILike('brand_name', `%${search}%`)
          .orWhereILike('brand_code', `%${search}%`)
          .orWhereILike('brand_description', `%${search}%`);
    });
  }
  
  // Apply sorting
  const validSortOrders = ['asc', 'desc'];
  const orderDirection = validSortOrders.includes(sort_order.toLowerCase()) ? sort_order.toLowerCase() : 'desc';
  
  query = query.orderBy(sort_by, orderDirection);
  
  const data = await query
    .limit(limit)
    .offset(offset);
    
  // Get total count with same filters
  let countQuery = db(TABLE_NAME)
    .where({ is_delete: false });
    
  if (search && search.trim() !== '') {
    countQuery = countQuery.andWhere(function() {
      this.whereILike('brand_name', `%${search}%`)
          .orWhereILike('brand_code', `%${search}%`)
          .orWhereILike('brand_description', `%${search}%`);
    });
  }
    
  const total = await countQuery
    .count('brand_id as count')
    .first();
    
  return {
    items: data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: Number(total.count),
      totalPages: Math.ceil(total.count / limit)
    }
  };
};

/**
 * Find single brand by ID
 */
const findById = async (id) => {
  return await db(TABLE_NAME)
    .where({ brand_id: id, is_delete: false })
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
 * Create new brand
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
 * Update existing brand
 */
const update = async (id, data) => {
  const [result] = await db(TABLE_NAME)
    .where({ brand_id: id, is_delete: false })
    .update({
      ...data,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Soft delete brand
 */
const remove = async (id, deletedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ brand_id: id, is_delete: false })
    .update({
      is_delete: true,
      deleted_at: db.fn.now(),
      deleted_by: deletedBy
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted brand
 */
const restore = async (id, updatedBy = null) => {
  const [result] = await db(TABLE_NAME)
    .where({ brand_id: id, is_delete: true })
    .update({
      is_delete: false,
      deleted_at: null,
      deleted_by: null,
      updated_at: db.fn.now(),
      updated_by: updatedBy
    })
    .returning('*');
  return result;
};

/**
 * Hard delete brand (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ brand_id: id })
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
