const { pgCore: db } = require('../../config/database');

const TABLE_NAME = 'engines';
const RELATION_TABLE = 'engines_type_engines';
const TYPE_ENGINES_TABLE = 'type_engines';

/**
 * Find all items with pagination, search, and sorting
 */
const findAll = async (page = 1, limit = 10, search = '', sort_by = 'created_at', sort_order = 'desc') => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select(
      'engines.engines_id',
      'engines.engines_name_en',
      'engines.engines_name_cn',
      'engines.engines_description',
      'engines.created_at',
      'engines.created_by',
      'engines.updated_at',
      'engines.updated_by',
      'engines.deleted_at',
      'engines.deleted_by',
      'engines.is_delete'
    )
    .where({ 'engines.is_delete': false });
    
  // Add search functionality
  if (search && search.trim() !== '') {
    query = query.where(function() {
      this.whereILike('engines.engines_name_en', `%${search}%`)
          .orWhereILike('engines.engines_name_cn', `%${search}%`)
          .orWhereILike('engines.engines_description', `%${search}%`);
    });
  }
  
  // Add sorting
  const validSortColumns = ['engines_id', 'engines_name_en', 'engines_name_cn', 'created_at', 'updated_at'];
  const sortColumn = validSortColumns.includes(sort_by) ? sort_by : 'created_at';
  const sortDirection = sort_order.toLowerCase() === 'asc' ? 'asc' : 'desc';
  
  query = query.orderBy(`engines.${sortColumn}`, sortDirection)
               .limit(limit)
               .offset(offset);
    
  const data = await query;
  
  // Get related type_engines for each engine
  const enginesWithTypes = await Promise.all(
    data.map(async (engine) => {
      const typeEngines = await db(RELATION_TABLE)
        .select([
          'type_engines.type_engine_id',
          'type_engines.type_engine_name_en',
          'type_engines.type_engine_name_cn'
        ])
        .join(TYPE_ENGINES_TABLE, 'engines_type_engines.type_engine_id', 'type_engines.type_engine_id')
        .where({ 
          'engines_type_engines.engines_id': engine.engines_id,
          'engines_type_engines.is_delete': false,
          'type_engines.is_delete': false
        });
      
      return {
        ...engine,
        type_engines: typeEngines
      };
    })
  );
  
  // Get total count for pagination
  let countQuery = db(TABLE_NAME)
    .where({ 'engines.is_delete': false });
    
  if (search && search.trim() !== '') {
    countQuery = countQuery.where(function() {
      this.whereILike('engines.engines_name_en', `%${search}%`)
          .orWhereILike('engines.engines_name_cn', `%${search}%`)
          .orWhereILike('engines.engines_description', `%${search}%`);
    });
  }
  
  const total = await countQuery.count('engines.engines_id as count').first();
    
  return {
    items: enginesWithTypes,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: parseInt(total.count),
      totalPages: Math.ceil(total.count / limit)
    }
  };
};

/**
 * Find single item by ID with type_engines
 */
const findById = async (id) => {
  const engine = await db(TABLE_NAME)
    .select(
      'engines.engines_id',
      'engines.engines_name_en',
      'engines.engines_name_cn',
      'engines.engines_description',
      'engines.created_at',
      'engines.created_by',
      'engines.updated_at',
      'engines.updated_by',
      'engines.deleted_at',
      'engines.deleted_by',
      'engines.is_delete'
    )
    .where({ 'engines.engines_id': id, 'engines.is_delete': false })
    .first();
    
  if (!engine) {
    return null;
  }
  
  // Get related type_engines
  const typeEngines = await db(RELATION_TABLE)
    .select([
      'type_engines.type_engine_id',
      'type_engines.type_engine_name_en',
      'type_engines.type_engine_name_cn',
      'type_engines.type_engine_description'
    ])
    .join(TYPE_ENGINES_TABLE, 'engines_type_engines.type_engine_id', 'type_engines.type_engine_id')
    .where({ 
      'engines_type_engines.engines_id': id,
      'engines_type_engines.is_delete': false,
      'type_engines.is_delete': false
    });
    
  return {
    ...engine,
    type_engines: typeEngines
  };
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  // Add table prefix to conditions
  const prefixedConditions = {};
  Object.keys(conditions).forEach(key => {
    prefixedConditions[`engines.${key}`] = conditions[key];
  });
  
  return await db(TABLE_NAME)
    .select(
      'engines.engines_id',
      'engines.engines_name_en',
      'engines.engines_name_cn',
      'engines.engines_description',
      'engines.created_at',
      'engines.created_by',
      'engines.updated_at',
      'engines.updated_by',
      'engines.deleted_at',
      'engines.deleted_by',
      'engines.is_delete'
    )
    .where({ ...prefixedConditions, 'engines.is_delete': false })
    .first();
};

/**
 * Create new item with type_engines
 */
const create = async (data, userId) => {
  const { type_engines, ...engineData } = data;
  
  // Start transaction
  const trx = await db.transaction();
  
  try {
    // Create engine
    const [engine] = await trx(TABLE_NAME)
      .insert({
        ...engineData,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      })
      .returning('*');
    
    // Create type_engines if provided
    if (type_engines && type_engines.length > 0) {
      const typeEngineIds = [];
      
      for (const typeEngine of type_engines) {
        // Create or find existing type_engine
        let [typeEngineRecord] = await trx(TYPE_ENGINES_TABLE)
          .select(
            'type_engines.type_engine_id',
            'type_engines.type_engine_name_en',
            'type_engines.type_engine_name_cn',
            'type_engines.type_engine_description',
            'type_engines.created_at',
            'type_engines.created_by',
            'type_engines.updated_at',
            'type_engines.updated_by',
            'type_engines.deleted_at',
            'type_engines.deleted_by',
            'type_engines.is_delete'
          )
          .where({
            'type_engines.type_engine_name_en': typeEngine.type_engine_name_en,
            'type_engines.type_engine_name_cn': typeEngine.type_engine_name_cn,
            'type_engines.is_delete': false
          });
          
        if (!typeEngineRecord) {
          [typeEngineRecord] = await trx(TYPE_ENGINES_TABLE)
            .insert({
              type_engine_name_en: typeEngine.type_engine_name_en,
              type_engine_name_cn: typeEngine.type_engine_name_cn,
              type_engine_description: typeEngine.type_engine_description || null,
              created_by: userId,
              updated_by: userId,
              created_at: db.fn.now(),
              updated_at: db.fn.now()
            })
            .returning('*');
        }
        
        typeEngineIds.push(typeEngineRecord.type_engine_id);
      }
      
      // Create relations
      const relationData = typeEngineIds.map(typeEngineId => ({
        engines_id: engine.engines_id,
        type_engine_id: typeEngineId,
        created_by: userId,
        updated_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      }));
      
      await trx(RELATION_TABLE).insert(relationData);
    }
    
    await trx.commit();
    
    // Return engine with type_engines
    return await findById(engine.engines_id);
    
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

/**
 * Update existing item with type_engines
 */
const update = async (id, data, userId) => {
  const { type_engines, ...engineData } = data;
  
  // Start transaction
  const trx = await db.transaction();
  
  try {
    // Update engine
    const [engine] = await trx(TABLE_NAME)
      .where({ 'engines.engines_id': id, 'engines.is_delete': false })
      .update({
        ...engineData,
        updated_by: userId,
        updated_at: db.fn.now()
      })
      .returning('*');
      
    if (!engine) {
      await trx.rollback();
      return null;
    }
    
    // Handle type_engines if provided
    if (type_engines !== undefined) {
      // Soft delete existing relations
      await trx(RELATION_TABLE)
        .where({ 'engines_type_engines.engines_id': id, 'engines_type_engines.is_delete': false })
        .update({
          is_delete: true,
          deleted_at: db.fn.now(),
          deleted_by: userId
        });
      
      // Create new relations if type_engines provided
      if (type_engines && type_engines.length > 0) {
        const typeEngineIds = [];
        
        for (const typeEngine of type_engines) {
          // Create or find existing type_engine
          let [typeEngineRecord] = await trx(TYPE_ENGINES_TABLE)
            .select(
              'type_engines.type_engine_id',
              'type_engines.type_engine_name_en',
              'type_engines.type_engine_name_cn',
              'type_engines.type_engine_description',
              'type_engines.created_at',
              'type_engines.created_by',
              'type_engines.updated_at',
              'type_engines.updated_by',
              'type_engines.deleted_at',
              'type_engines.deleted_by',
              'type_engines.is_delete'
            )
            .where({
              'type_engines.type_engine_name_en': typeEngine.type_engine_name_en,
              'type_engines.type_engine_name_cn': typeEngine.type_engine_name_cn,
              'type_engines.is_delete': false
            });
            
          if (!typeEngineRecord) {
            [typeEngineRecord] = await trx(TYPE_ENGINES_TABLE)
              .insert({
                type_engine_name_en: typeEngine.type_engine_name_en,
                type_engine_name_cn: typeEngine.type_engine_name_cn,
                type_engine_description: typeEngine.type_engine_description || null,
                created_by: userId,
                updated_by: userId,
                created_at: db.fn.now(),
                updated_at: db.fn.now()
              })
              .returning('*');
          }
          
          typeEngineIds.push(typeEngineRecord.type_engine_id);
        }
        
        // Create new relations
        const relationData = typeEngineIds.map(typeEngineId => ({
          engines_id: id,
          type_engine_id: typeEngineId,
          created_by: userId,
          updated_by: userId,
          created_at: db.fn.now(),
          updated_at: db.fn.now()
        }));
        
        await trx(RELATION_TABLE).insert(relationData);
      }
    }
    
    await trx.commit();
    
    // Return updated engine with type_engines
    return await findById(id);
    
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

/**
 * Soft delete item
 */
const remove = async (id, userId) => {
  // Start transaction
  const trx = await db.transaction();
  
  try {
    // Soft delete engine
    const [engine] = await trx(TABLE_NAME)
      .where({ 'engines.engines_id': id, 'engines.is_delete': false })
      .update({
        is_delete: true,
        deleted_at: db.fn.now(),
        deleted_by: userId,
        updated_at: db.fn.now()
      })
      .returning('*');
      
    if (!engine) {
      await trx.rollback();
      return null;
    }
    
    // Soft delete relations
    await trx(RELATION_TABLE)
      .where({ 'engines_type_engines.engines_id': id, 'engines_type_engines.is_delete': false })
      .update({
        is_delete: true,
        deleted_at: db.fn.now(),
        deleted_by: userId
      });
    
    await trx.commit();
    return engine;
    
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

/**
 * Restore soft deleted item
 */
const restore = async (id, userId) => {
  // Start transaction
  const trx = await db.transaction();
  
  try {
    // Restore engine
    const [engine] = await trx(TABLE_NAME)
      .where({ 'engines.engines_id': id, 'engines.is_delete': true })
      .update({
        is_delete: false,
        deleted_at: null,
        deleted_by: null,
        updated_at: db.fn.now(),
        updated_by: userId
      })
      .returning('*');
      
    if (!engine) {
      await trx.rollback();
      return null;
    }
    
    // Restore relations
    await trx(RELATION_TABLE)
      .where({ 'engines_type_engines.engines_id': id, 'engines_type_engines.is_delete': true })
      .update({
        is_delete: false,
        deleted_at: null,
        deleted_by: null,
        updated_at: db.fn.now(),
        updated_by: userId
      });
    
    await trx.commit();
    return engine;
    
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

/**
 * Hard delete item (permanent)
 */
const hardDelete = async (id) => {
  // Start transaction
  const trx = await db.transaction();
  
  try {
    // Delete relations first
    await trx(RELATION_TABLE)
      .where({ 'engines_type_engines.engines_id': id })
      .del();
    
    // Delete engine
    const result = await trx(TABLE_NAME)
      .where({ 'engines.engines_id': id })
      .del();
    
    await trx.commit();
    return result;
    
  } catch (error) {
    await trx.rollback();
    throw error;
  }
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
