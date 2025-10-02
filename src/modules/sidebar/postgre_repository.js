const { pgCore: db } = require('../../config/database');

/**
 * Get sidebars data with hierarchical structure
 */
const getSidebars = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    sort_by = 'created_at',
    sort_order = 'desc',
    vin_number = null
  } = filters;

  const offset = (page - 1) * limit;

  // Build base query with joins
  let query = db('catalogs as c')
    .leftJoin('categories as cat', 'c.category_id', 'cat.category_id')
    .leftJoin('productions as p', 'c.production_id', 'p.production_id')
    .select(
      'c.catalog_id',
      'c.category_id',
      'c.catalog_parent_id',
      'c.catalog_name_en',
      'c.catalog_name_ch',
      'c.catalog_quantity',
      'c.catalog_image',
      'c.catalog_description',
      'c.production_id',
      'c.created_at',
      'c.updated_at',
      'cat.category_name_en',
      'cat.category_name_ch',
      'p.production_name_en',
      'p.production_name_cn',
      'p.vin_number'
    )
    .where('c.deleted_at', null);

  // Add search filter
  if (search) {
    query = query.where(function() {
      this.whereILike('c.catalog_name_en', `%${search}%`)
          .orWhereILike('c.catalog_name_ch', `%${search}%`)
          .orWhereILike('c.catalog_description', `%${search}%`)
          .orWhereILike('cat.category_name_en', `%${search}%`)
          .orWhereILike('cat.category_name_ch', `%${search}%`);
    });
  }

  // Add VIN number filter
  if (vin_number) {
    query = query.where('p.vin_number', vin_number);
  }

  // Add sorting
  const allowedSortFields = {
    'created_at': 'c.created_at',
    'updated_at': 'c.updated_at',
    'catalog_name_en': 'c.catalog_name_en',
    'category_name_en': 'cat.category_name_en'
  };

  const sortField = allowedSortFields[sort_by] || 'c.created_at';
  query = query.orderBy(sortField, sort_order);

  // Get parents (root catalogs)
  let parentsQuery = query.clone()
    .whereNull('c.catalog_parent_id')
    .limit(limit)
    .offset(offset);

  const parents = await parentsQuery;

  // Build hierarchical structure with children
  const buildHierarchy = async (parentCatalogs) => {
    const result = [];

    for (const parent of parentCatalogs) {
      const catalogData = {
        id: parent.catalog_id,
        masterId: parent.catalog_parent_id,
        partNumber: null,
        partName: `${parent.catalog_name_en || ''} ${parent.catalog_name_ch || ''}`.trim(),
        softtype: "null",
        epcType: "null",
        catalog_id: parent.catalog_id,
        category_id: parent.category_id,
        catalog_parent_id: parent.catalog_parent_id,
        catalog_name_en: parent.catalog_name_en,
        catalog_name_ch: parent.catalog_name_ch,
        catalog_quantity: parent.catalog_quantity,
        catalog_image: parent.catalog_image,
        catalog_description: parent.catalog_description,
        production_id: parent.production_id,
        category_name_en: parent.category_name_en,
        category_name_ch: parent.category_name_ch,
        parent_catalog_name: null,
        production_name_en: parent.production_name_en,
        production_name_cn: parent.production_name_cn,
        vin_number: parent.vin_number,
        children: []
      };

      // Get children recursively
      await findChildrenRecursive(catalogData, 0);
      result.push(catalogData);
    }

    return result;
  };

    // Recursive function to find children
    const findChildrenRecursive = async (catalogItem, level = 0) => {
      // Stop recursion at level 3 to prevent infinite loops
      if (level >= 3) return;

      const childrenQuery = db('catalogs as c')
        .leftJoin('categories as cat', 'c.category_id', 'cat.category_id')
        .leftJoin('productions as p', 'c.production_id', 'p.production_id')
        .select(
        'c.catalog_id',
        'c.category_id',
        'c.catalog_parent_id',
        'c.catalog_name_en',
        'c.catalog_name_ch',
        'c.catalog_quantity',
        'c.catalog_image',
        'c.catalog_description',
        'c.production_id',
        'c.created_at',
        'c.updated_at',
        'cat.category_name_en',
        'cat.category_name_ch',
        'p.production_name_en',
        'p.production_name_cn',
        'p.vin_number'
      )
      .where('c.deleted_at', null)
      .where('c.catalog_parent_id', catalogItem.catalog_id);

    // Apply same search filter for children
    if (search) {
      childrenQuery.where(function() {
        this.whereILike('c.catalog_name_en', `%${search}%`)
            .orWhereILike('c.catalog_name_ch', `%${search}%`)
            .orWhereILike('c.catalog_description', `%${search}%`)
            .orWhereILike('cat.category_name_en', `%${search}%`)
            .orWhereILike('cat.category_name_ch', `%${search}%`);
      });
    }

    // Apply same VIN filter for children
    if (vin_number) {
      childrenQuery.where('p.vin_number', vin_number);
    }

    const children = await childrenQuery.orderBy('c.created_at', 'desc');

    for (const child of children) {
      const childData = {
        id: child.catalog_id,
        masterId: child.catalog_parent_id,
        partNumber: null,
        partName: `${child.catalog_name_en || ''} ${child.catalog_name_ch || ''}`.trim(),
        softtype: "null",
        epcType: "null",
        catalog_id: child.catalog_id,
        category_id: child.category_id,
        catalog_parent_id: child.catalog_parent_id,
        catalog_name_en: child.catalog_name_en,
        catalog_name_ch: child.catalog_name_ch,
        catalog_quantity: child.catalog_quantity,
        catalog_image: child.catalog_image,
        catalog_description: child.catalog_description,
        production_id: child.production_id,
        category_name_en: child.category_name_en,
        category_name_ch: child.category_name_ch,
        parent_catalog_name: catalogItem.catalog_name_en,
        production_name_en: child.production_name_en,
        production_name_cn: child.production_name_cn,
        vin_number: child.vin_number,
        children: []
      };

      catalogItem.children.push(childData);
      
      // Recursively find children of this child
      await findChildrenRecursive(childData, level + 1);
    }
  };

  // Get total count for pagination
  let countQuery = db('catalogs as c')
    .leftJoin('categories as cat', 'c.category_id', 'cat.category_id')
    .leftJoin('productions as p', 'c.production_id', 'p.production_id')
    .where('c.deleted_at', null)
    .whereNull('c.catalog_parent_id');

  if (search) {
    countQuery = countQuery.where(function() {
      this.whereILike('c.catalog_name_en', `%${search}%`)
          .orWhereILike('c.catalog_name_ch', `%${search}%`)
          .orWhereILike('c.catalog_description', `%${search}%`)
          .orWhereILike('cat.category_name_en', `%${search}%`)
          .orWhereILike('cat.category_name_ch', `%${search}%`);
    });
  }

  if (vin_number) {
    countQuery = countQuery.where('p.vin_number', vin_number);
  }

  const totalResult = await countQuery.count('c.catalog_id as count').first();
  const total = parseInt(totalResult.count);

  // Build hierarchical data
  const data = await buildHierarchy(parents);

  return {
    items: data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  getSidebars
};
