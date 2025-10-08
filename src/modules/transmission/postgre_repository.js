const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'transmissions';
const RELATION_TABLE = 'transmissions_type_transmissions';
const TYPE_TRANSMISSION_TABLE = 'type_transmissions';

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
      this.whereILike('transmission_name_en', `%${search}%`)
        .orWhereILike('transmission_name_cn', `%${search}%`)
        .orWhereILike('transmission_description', `%${search}%`);
    });
  }
  
  // Sorting
  const validSortFields = ['created_at', 'updated_at', 'transmission_name_en', 'transmission_name_cn'];
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
      this.whereILike('transmission_name_en', `%${search}%`)
        .orWhereILike('transmission_name_cn', `%${search}%`)
        .orWhereILike('transmission_description', `%${search}%`);
    });
  }
  
  const total = await countQuery.count('transmission_id as count').first();
    
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
 * Find single item by ID with type_transmissions
 */
const findById = async (id) => {
  // Get transmission data
  const transmission = await db(TABLE_NAME)
    .where({ transmission_id: id, is_delete: false })
    .first();
    
  if (!transmission) {
    return null;
  }
  
  // Get related type_transmissions
  const typeTransmissions = await db(RELATION_TABLE)
    .select([
      `${TYPE_TRANSMISSION_TABLE}.type_transmission_id`,
      `${TYPE_TRANSMISSION_TABLE}.type_transmission_name_en`,
      `${TYPE_TRANSMISSION_TABLE}.type_transmission_name_cn`,
      `${TYPE_TRANSMISSION_TABLE}.type_transmission_description`
    ])
    .join(TYPE_TRANSMISSION_TABLE, `${RELATION_TABLE}.type_transmission_id`, `${TYPE_TRANSMISSION_TABLE}.type_transmission_id`)
    .where(`${RELATION_TABLE}.transmission_id`, id)
    .where(`${RELATION_TABLE}.is_delete`, false)
    .where(`${TYPE_TRANSMISSION_TABLE}.is_delete`, false);
  
  return {
    ...transmission,
    type_transmissions: typeTransmissions
  };
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
 * Create new item with type_transmissions
 */
const create = async (data, userId) => {
  const { type_transmissions = [], ...transmissionData } = data;
  
  return await db.transaction(async (trx) => {
    // Create transmission
    const [transmission] = await trx(TABLE_NAME)
      .insert({
        ...transmissionData,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      })
      .returning('*');
    
    // Create type_transmissions if provided
    if (type_transmissions.length > 0) {
      for (const typeTransmission of type_transmissions) {
        // First create or find existing type_transmission
        let [existingTypeTransmission] = await trx(TYPE_TRANSMISSION_TABLE)
          .where({
            type_transmission_name_en: typeTransmission.type_transmission_name_en,
            type_transmission_name_cn: typeTransmission.type_transmission_name_cn,
            is_delete: false
          })
          .returning('*');
        
        if (!existingTypeTransmission) {
          [existingTypeTransmission] = await trx(TYPE_TRANSMISSION_TABLE)
            .insert({
              ...typeTransmission,
              created_by: userId,
              updated_by: userId,
              created_at: db.fn.now(),
              updated_at: db.fn.now()
            })
            .returning('*');
        }
        
        // Create relation
        await trx(RELATION_TABLE)
          .insert({
            transmission_id: transmission.transmission_id,
            type_transmission_id: existingTypeTransmission.type_transmission_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          });
      }
    }
    
    // Return transmission with type_transmissions
    return await findById(transmission.transmission_id);
  });
};

/**
 * Update existing item with type_transmissions
 */
const update = async (id, data, userId) => {
  const { type_transmissions = [], ...transmissionData } = data;
  
  return await db.transaction(async (trx) => {
    // Update transmission
    const [transmission] = await trx(TABLE_NAME)
      .where({ transmission_id: id, is_delete: false })
      .update({
        ...transmissionData,
        updated_by: userId,
        updated_at: db.fn.now()
      })
      .returning('*');
    
    if (!transmission) {
      return null;
    }
    
    // Update type_transmissions relations
    if (type_transmissions.length > 0) {
      // Soft delete existing relations
      await trx(RELATION_TABLE)
        .where({ transmission_id: id })
        .update({
          is_delete: true,
          deleted_at: db.fn.now(),
          deleted_by: userId,
          updated_by: userId,
          updated_at: db.fn.now()
        });
      
      // Create new relations
      for (const typeTransmission of type_transmissions) {
        // First create or find existing type_transmission
        let [existingTypeTransmission] = await trx(TYPE_TRANSMISSION_TABLE)
          .where({
            type_transmission_name_en: typeTransmission.type_transmission_name_en,
            type_transmission_name_cn: typeTransmission.type_transmission_name_cn,
            is_delete: false
          })
          .returning('*');
        
        if (!existingTypeTransmission) {
          [existingTypeTransmission] = await trx(TYPE_TRANSMISSION_TABLE)
            .insert({
              ...typeTransmission,
              created_by: userId,
              updated_by: userId,
              created_at: db.fn.now(),
              updated_at: db.fn.now()
            })
            .returning('*');
        }
        
        // Create relation
        await trx(RELATION_TABLE)
          .insert({
            transmission_id: id,
            type_transmission_id: existingTypeTransmission.type_transmission_id,
            created_by: userId,
            updated_by: userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
          });
      }
    }
    
    // Return transmission with type_transmissions
    return await findById(id);
  });
};

/**
 * Soft delete item
 */
const remove = async (id, userId) => {
  return await db.transaction(async (trx) => {
    // Soft delete transmission
    const [transmission] = await trx(TABLE_NAME)
      .where({ transmission_id: id, is_delete: false })
      .update({
        is_delete: true,
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_by: userId,
        updated_at: db.fn.now()
      })
      .returning('*');
    
    if (!transmission) {
      return null;
    }
    
    // Soft delete relations
    await trx(RELATION_TABLE)
      .where({ transmission_id: id })
      .update({
        is_delete: true,
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_by: userId,
        updated_at: db.fn.now()
      });
    
    return transmission;
  });
};

/**
 * Restore soft deleted item
 */
const restore = async (id, userId) => {
  return await db.transaction(async (trx) => {
    // Restore transmission
    const [transmission] = await trx(TABLE_NAME)
      .where({ transmission_id: id })
      .where('is_delete', true)
      .update({
        is_delete: false,
        deleted_at: null,
        deleted_by: null,
        updated_by: userId,
        updated_at: db.fn.now()
      })
      .returning('*');
    
    if (!transmission) {
      return null;
    }
    
    // Restore relations
    await trx(RELATION_TABLE)
      .where({ transmission_id: id })
      .where('is_delete', true)
      .update({
        is_delete: false,
        deleted_at: null,
        deleted_by: null,
        updated_by: userId,
        updated_at: db.fn.now()
      });
    
    return transmission;
  });
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  return await db.transaction(async (trx) => {
    // Delete relations first
    await trx(RELATION_TABLE)
      .where({ transmission_id: id })
      .del();
    
    // Delete transmission
    return await trx(TABLE_NAME)
      .where({ transmission_id: id })
      .del();
  });
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
