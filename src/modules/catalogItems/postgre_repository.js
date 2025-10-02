const { pgCore: db } = require('../../config/database');
const fs = require('fs');
const csv = require('csv-parser');

const TABLE_NAME = 'catalog_items';

/**
 * Find all catalog items with pagination
 */
const findAll = async (page = 1, limit = 10, filters = {}, sort_by = 'created_at', sort_order = 'desc') => {
  const offset = (page - 1) * limit;
  
  let query = db(TABLE_NAME)
    .select(
      'catalog_items.*',
      'catalogs.catalog_name_en',
      'catalogs.catalog_name_ch',
      'categories.category_name_en',
      'categories.category_name_ch'
    )
    .leftJoin('catalogs', 'catalog_items.catalog_id', 'catalogs.catalog_id')
    .leftJoin('categories', 'catalogs.category_id', 'categories.category_id')
    .where('catalog_items.deleted_at', null);
    
  let countQuery = db(TABLE_NAME)
    .leftJoin('catalogs', 'catalog_items.catalog_id', 'catalogs.catalog_id')
    .leftJoin('categories', 'catalogs.category_id', 'categories.category_id')
    .where('catalog_items.deleted_at', null);
  
  // Apply filters
  if (filters.catalog_id) {
    query = query.where('catalog_items.catalog_id', filters.catalog_id);
    countQuery = countQuery.where('catalog_items.catalog_id', filters.catalog_id);
  }
  
  if (filters.search) {
    const searchTerm = `%${filters.search}%`;
    query = query.where(function() {
      this.where('catalog_items.catalog_item_name_en', 'ilike', searchTerm)
        .orWhere('catalog_items.catalog_item_name_ch', 'ilike', searchTerm)
        .orWhere('catalog_items.part_number', 'ilike', searchTerm)
        .orWhere('catalog_items.target_id', 'ilike', searchTerm)
        .orWhere('catalog_items.diagram_serial_number', 'ilike', searchTerm);
    });
    countQuery = countQuery.where(function() {
      this.where('catalog_items.catalog_item_name_en', 'ilike', searchTerm)
        .orWhere('catalog_items.catalog_item_name_ch', 'ilike', searchTerm)
        .orWhere('catalog_items.part_number', 'ilike', searchTerm)
        .orWhere('catalog_items.target_id', 'ilike', searchTerm)
        .orWhere('catalog_items.diagram_serial_number', 'ilike', searchTerm);
    });
  }
  
  // Apply sorting
  query = query.orderBy(`catalog_items.${sort_by}`, sort_order);
  
  // Apply pagination
  query = query.limit(limit).offset(offset);
  
  const data = await query;
  const total = await countQuery.count('catalog_items.catalog_item_id as count').first();
    
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
 * Find single catalog item by ID
 */
const findById = async (id) => {
  return await db(TABLE_NAME)
    .select(
      'catalog_items.*',
      'catalogs.catalog_name_en',
      'catalogs.catalog_name_ch',
      'categories.category_name_en',
      'categories.category_name_ch'
    )
    .leftJoin('catalogs', 'catalog_items.catalog_id', 'catalogs.catalog_id')
    .leftJoin('categories', 'catalogs.category_id', 'categories.category_id')
    .where({ 'catalog_items.catalog_item_id': id, 'catalog_items.deleted_at': null })
    .first();
};

/**
 * Find by custom condition
 */
const findOne = async (conditions) => {
  return await db(TABLE_NAME)
    .where({ ...conditions, deleted_at: null })
    .first();
};

/**
 * Create new catalog item
 */
const create = async (data) => {
  const [result] = await db(TABLE_NAME)
    .insert({
      ...data,
      created_at: db.fn.now(),
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Update existing catalog item
 */
const update = async (id, data) => {
  const [result] = await db(TABLE_NAME)
    .where({ catalog_item_id: id, deleted_at: null })
    .update({
      ...data,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Soft delete catalog item
 */
const remove = async (id) => {
  const [result] = await db(TABLE_NAME)
    .where({ catalog_item_id: id, deleted_at: null })
    .update({
      deleted_at: db.fn.now(),
      is_delete: true
    })
    .returning('*');
  return result;
};

/**
 * Restore soft deleted catalog item
 */
const restore = async (id) => {
  const [result] = await db(TABLE_NAME)
    .where({ catalog_item_id: id })
    .whereNotNull('deleted_at')
    .update({
      deleted_at: null,
      is_delete: false,
      updated_at: db.fn.now()
    })
    .returning('*');
  return result;
};

/**
 * Hard delete catalog item (permanent)
 */
const hardDelete = async (id) => {
  return await db(TABLE_NAME)
    .where({ catalog_item_id: id })
    .del();
};

/**
 * Import catalog items from CSV file
 */
const importFromCsv = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let imported = 0;
    let errors = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        try {
          // Process each row
          for (const row of results) {
            try {
              // Map CSV columns to database fields
              const catalogItemData = {
                catalog_id: row.catalog_id || null,
                target_id: row.target_id || null,
                diagram_serial_number: row.diagram_serial_number || null,
                part_number: row.part_number || null,
                catalog_item_name_en: row.catalog_item_name_en || null,
                catalog_item_name_ch: row.catalog_item_name_ch || null,
                catalog_item_quantity: parseInt(row.catalog_item_quantity) || 0,
                catalog_item_description: row.catalog_item_description || null
              };

              // Check if item already exists by part_number
              if (catalogItemData.part_number) {
                const existing = await findOne({ part_number: catalogItemData.part_number });
                if (existing) {
                  errors.push(`Item dengan part_number ${catalogItemData.part_number} sudah ada`);
                  continue;
                }
              }

              await create(catalogItemData);
              imported++;
            } catch (error) {
              errors.push(`Error processing row: ${error.message}`);
            }
          }

          // Clean up file
          fs.unlinkSync(filePath);

          resolve({
            imported,
            errors,
            total: results.length
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

/**
 * Import catalog items from CSV file with upsert logic
 */
const importFromCsvWithUpsert = async (filePath, catalogId, employeeId) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let imported = 0;
    let updated = 0;
    let errors = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        try {
          // Process each row
          for (const row of results) {
            try {
              // Validasi kolom yang diperlukan
              if (!row.target_id || row.target_id.trim() === '') {
                errors.push(`Target ID tidak boleh kosong pada baris ${results.indexOf(row) + 1}`);
                continue;
              }

              // Map CSV columns to database fields
              const catalogItemData = {
                catalog_id: catalogId,
                target_id: row.target_id || null,
                diagram_serial_number: row.diagram_serial_number || null,
                part_number: row.part_number || null,
                catalog_item_name_en: row.catalog_item_name_en || null,
                catalog_item_name_ch: row.catalog_item_name_ch || null,
                catalog_item_quantity: parseInt(row.catalog_item_quantity) || 0,
                catalog_item_description: row.catalog_item_description || null
              };

              // Try to insert first, if duplicate then update
              try {
                const insertData = {
                  ...catalogItemData,
                  created_by: employeeId,
                  created_at: db.fn.now(),
                  updated_at: db.fn.now()
                };
                
                await db(TABLE_NAME).insert(insertData);
                imported++;
              } catch (insertError) {
                // If unique constraint violation, update the existing record
                if (insertError.code === '23505' && insertError.constraint === 'unique_catalog_target') {
                  const existingRecord = await findOne({ 
                    catalog_id: catalogId, 
                    target_id: catalogItemData.target_id 
                  });
                  
                  if (existingRecord) {
                    const updateData = {
                      ...catalogItemData,
                      updated_by: employeeId,
                      updated_at: db.fn.now()
                    };
                    
                    await db(TABLE_NAME)
                      .where({ 
                        catalog_item_id: existingRecord.catalog_item_id,
                        deleted_at: null 
                      })
                      .update(updateData);
                    
                    updated++;
                  } else {
                    // If record not found but constraint violation, it might be soft deleted
                    // Try to find including soft deleted records
                    const softDeletedRecord = await db(TABLE_NAME)
                      .where({ 
                        catalog_id: catalogId, 
                        target_id: catalogItemData.target_id 
                      })
                      .first();
                    
                    if (softDeletedRecord) {
                      // Restore and update the soft deleted record
                      const updateData = {
                        ...catalogItemData,
                        deleted_at: null,
                        is_delete: false,
                        updated_by: employeeId,
                        updated_at: db.fn.now()
                      };
                      
                      await db(TABLE_NAME)
                        .where({ catalog_item_id: softDeletedRecord.catalog_item_id })
                        .update(updateData);
                      
                      updated++;
                    } else {
                      errors.push(`Error processing row ${results.indexOf(row) + 1}: Record not found for update`);
                    }
                  }
                } else {
                  errors.push(`Error processing row ${results.indexOf(row) + 1}: ${insertError.message}`);
                }
              }
            } catch (error) {
              errors.push(`Error processing row ${results.indexOf(row) + 1}: ${error.message}`);
            }
          }

          // Clean up file
          fs.unlinkSync(filePath);

          resolve({
            imported,
            updated,
            errors,
            total: results.length
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

/**
 * Validate if catalog exists
 */
const validateCatalogExists = async (catalogId) => {
  const catalog = await db('catalogs')
    .where({ catalog_id: catalogId, deleted_at: null })
    .first();
  
  return !!catalog;
};

/**
 * Bulk create catalog items
 */
const bulkCreate = async (items) => {
  const timestamp = db.fn.now();
  const itemsWithTimestamp = items.map(item => ({
    ...item,
    created_at: timestamp,
    updated_at: timestamp
  }));

  return await db(TABLE_NAME)
    .insert(itemsWithTimestamp)
    .returning('*');
};

module.exports = {
  findAll,
  findById,
  findOne,
  create,
  update,
  remove,
  restore,
  hardDelete,
  importFromCsv,
  importFromCsvWithUpsert,
  validateCatalogExists,
  bulkCreate
};
