const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'world_manufacturing_plants';

/**
 * Find all world manufacturing plants with pagination and filters
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
      this.whereILike('world_manufacturing_plant_name', `%${search}%`)
          .orWhereILike('world_manufacturing_plant_code', `%${search}%`)
          .orWhereILike('world_manufacturing_plant_description', `%${search}%`);
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
      this.whereILike('world_manufacturing_plant_name', `%${search}%`)
          .orWhereILike('world_manufacturing_plant_code', `%${search}%`)
          .orWhereILike('world_manufacturing_plant_description', `%${search}%`);
    });
  }
    
  const total = await countQuery
    .count('world_manufacturing_plant_id as count')
    .first();
    
  return {
    items: data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: parseInt(total.count),
      totalPages: Math.ceil(total.count / parseFloat(limit))
    }
  };
};

/**
 * Find single world manufacturing plant by ID
 */
const findById = async (id) => {
  return await db(TABLE_NAME)
    .where({ 
      world_manufacturing_plant_id: id, 
      is_delete: false 
    })
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
 * Create new world manufacturing plant
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
 * Update existing world manufacturing plant
 */
const update = async (id, data) => {
  const [result] = await db(TABLE_NAME)
    .where({ 
      world_manufacturing_plant_id: id, 
      is_delete: false 
    })
    .update({
      ...data,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Soft delete world manufacturing plant
 */
const remove = async (id) => {
  const [result] = await db(TABLE_NAME)
    .where({ 
      world_manufacturing_plant_id: id, 
      is_delete: false 
    })
    .update({
      is_delete: true,
      deleted_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted world manufacturing plant
 */
const restore = async (id) => {
  const [result] = await db(TABLE_NAME)
    .where({ 
      world_manufacturing_plant_id: id,
      is_delete: true 
    })
    .update({
      is_delete: false,
      deleted_at: null,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Hard delete world manufacturing plant (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ world_manufacturing_plant_id: id })
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
