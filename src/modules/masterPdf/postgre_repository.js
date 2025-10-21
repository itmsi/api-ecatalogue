const { pgCore: db } = require('../../config/database');
const { applyPagination, applySorting, applySearch, formatPaginatedResponse } = require('../../utils/query_builder');

/**
 * Repository untuk operasi database master_pdf
 */

/**
 * Mendapatkan semua data master PDF dengan pagination dan filtering
 * @param {Object} params - Parameter untuk query
 * @returns {Object} - Data dan total count
 */
const getAll = async (params) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort_by = 'created_at',
      sort_order = 'desc',
      category = ''
    } = params;

    const offset = (page - 1) * limit;

    // Config untuk sorting dan search
    const allowedSortColumns = ['master_pdf_id', 'name_pdf', 'description', 'master_catalog', 'created_at', 'updated_at'];
    const searchableColumns = ['name_pdf', 'description', 'master_catalog'];
    
    // Parse sorting dengan validasi
    const sorting = {
      sortBy: sort_by === 'id' ? 'master_pdf_id' : 
              sort_by === 'name' ? 'name_pdf' : 
              sort_by === 'category' ? 'master_catalog' : 
              allowedSortColumns.includes(sort_by) ? sort_by : 'created_at',
      sortOrder: ['asc', 'desc'].includes(sort_order?.toLowerCase()) ? sort_order.toLowerCase() : 'desc'
    };
    
    // Parse search
    const searchParams = {
      searchTerm: search && typeof search === 'string' ? search.trim() : '',
      searchableColumns
    };
    
    // Parse pagination
    const pagination = { limit: parseInt(limit), offset };
    
    // Build query
    let query = db('master_pdf')
      .select(
        'master_pdf_id',
        'name_pdf',
        'description',
        'master_catalog',
        'created_at',
        'updated_at'
      )
      .where('is_delete', false);
    
    // Apply category filter
    if (category && category.trim() !== '') {
      query = query.where('master_catalog', category);
    }
    
    // Apply search
    query = applySearch(query, searchParams);
    
    // Apply sorting
    query = applySorting(query, sorting);
    
    // Apply pagination
    query = applyPagination(query, pagination);
    
    // Execute query
    const data = await query;
    
    // Build count query
    let countQuery = db('master_pdf')
      .where('is_delete', false);
    
    // Apply category filter to count query
    if (category && category.trim() !== '') {
      countQuery = countQuery.where('master_catalog', category);
    }
    
    // Apply search to count query
    countQuery = applySearch(countQuery, searchParams);
    
    const total = await countQuery.count('master_pdf_id as count').first();
    
    // Format response dengan standard pagination
    return formatPaginatedResponse(data, { page: parseInt(page), limit: parseInt(limit) }, total.count);

  } catch (error) {
    console.error('Error in masterPdf getAll repository:', error);
    throw error;
  }
};

/**
 * Mendapatkan data master PDF berdasarkan ID
 * @param {string} id - ID master PDF
 * @returns {Object|null} - Data master PDF atau null jika tidak ditemukan
 */
const getById = async (id) => {
  try {
    const result = await db('master_pdf')
      .select(
        'master_pdf_id',
        'name_pdf',
        'description',
        'master_catalog',
        'created_at',
        'updated_at'
      )
      .where('master_pdf_id', id)
      .where('is_delete', false)
      .first();

    return result;

  } catch (error) {
    console.error('Error in masterPdf getById repository:', error);
    throw error;
  }
};

/**
 * Mendapatkan statistik master PDF
 * @returns {Object} - Statistik data
 */
const getStats = async () => {
  try {
    // Total count (only non-deleted records)
    const totalCount = await db('master_pdf')
      .where('is_delete', false)
      .count('* as total')
      .first();

    // Count by category (master_catalog)
    const categoryStats = await db('master_pdf')
      .select('master_catalog')
      .count('* as count')
      .where('is_delete', false)
      .groupBy('master_catalog');

    // Recent uploads (last 30 days)
    const recentUploads = await db('master_pdf')
      .count('* as count')
      .where('is_delete', false)
      .where('created_at', '>=', db.raw("NOW() - INTERVAL '30 days'"))
      .first();

    return {
      total_count: parseInt(totalCount.total),
      category_stats: categoryStats.map(stat => ({
        category: stat.master_catalog,
        count: parseInt(stat.count)
      })),
      recent_uploads: parseInt(recentUploads.count)
    };

  } catch (error) {
    console.error('Error in masterPdf getStats repository:', error);
    throw error;
  }
};

/**
 * Mencari master PDF berdasarkan kriteria tertentu
 * @param {Object} criteria - Kriteria pencarian
 * @returns {Array} - Array data master PDF
 */
const search = async (criteria) => {
  try {
    const {
      search_term,
      category,
      limit = 50
    } = criteria;

    let query = db('master_pdf')
      .select(
        'master_pdf_id',
        'name_pdf',
        'description',
        'master_catalog',
        'created_at',
        'updated_at'
      )
      .where('is_delete', false);

    // Apply search term
    if (search_term && search_term.trim() !== '') {
      query = query.where(function() {
        this.where('name_pdf', 'ilike', `%${search_term}%`)
          .orWhere('description', 'ilike', `%${search_term}%`)
          .orWhere('master_catalog', 'ilike', `%${search_term}%`);
      });
    }

    // Apply category filter
    if (category && category.trim() !== '') {
      query = query.where('master_catalog', category);
    }

    // Apply limit and order
    query = query
      .orderBy('created_at', 'desc')
      .limit(limit);

    const results = await query;

    return results;

  } catch (error) {
    console.error('Error in masterPdf search repository:', error);
    throw error;
  }
};

/**
 * Mendapatkan daftar kategori yang tersedia
 * @returns {Array} - Array kategori
 */
const getCategories = async () => {
  try {
    const categories = await db('master_pdf')
      .select('master_catalog')
      .distinct()
      .whereNotNull('master_catalog')
      .where('master_catalog', '!=', '')
      .where('is_delete', false)
      .orderBy('master_catalog');

    return categories.map(cat => cat.master_catalog);

  } catch (error) {
    console.error('Error in masterPdf getCategories repository:', error);
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  getStats,
  search,
  getCategories
};
