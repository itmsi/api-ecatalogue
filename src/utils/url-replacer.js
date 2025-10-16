const { replaceBaseUrl } = require('../config/minio');

/**
 * Replace base URL in existing URLs stored in database
 * This function can be used to update existing records with new base URL
 * 
 * @param {string} originalUrl - The original URL from database
 * @returns {string} - The URL with replaced base URL
 */
const replaceExistingUrl = (originalUrl) => {
  if (!originalUrl || typeof originalUrl !== 'string') {
    return originalUrl;
  }

  // Use the same replaceBaseUrl function from minio config
  return replaceBaseUrl(originalUrl);
};

/**
 * Replace base URL in multiple URLs (for batch processing)
 * 
 * @param {string[]} urls - Array of URLs to replace
 * @returns {string[]} - Array of URLs with replaced base URL
 */
const replaceMultipleUrls = (urls) => {
  if (!Array.isArray(urls)) {
    return urls;
  }

  return urls.map(url => replaceExistingUrl(url));
};

/**
 * Replace base URL in object properties that contain URLs
 * 
 * @param {Object} obj - Object that may contain URL properties
 * @param {string[]} urlFields - Array of field names that contain URLs
 * @returns {Object} - Object with replaced URLs
 */
const replaceUrlsInObject = (obj, urlFields = []) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const result = { ...obj };

  // Common URL field names to check
  const commonUrlFields = [
    'url', 'image_url', 'file_url', 'photo_url', 'catalog_image_url',
    'file_foto_url', 'pdf_url', 'document_url', 'attachment_url'
  ];

  const fieldsToCheck = urlFields.length > 0 ? urlFields : commonUrlFields;

  fieldsToCheck.forEach(field => {
    if (result[field] && typeof result[field] === 'string') {
      result[field] = replaceExistingUrl(result[field]);
    }
  });

  return result;
};

/**
 * Replace base URL in array of objects
 * 
 * @param {Object[]} objects - Array of objects that may contain URLs
 * @param {string[]} urlFields - Array of field names that contain URLs
 * @returns {Object[]} - Array of objects with replaced URLs
 */
const replaceUrlsInArray = (objects, urlFields = []) => {
  if (!Array.isArray(objects)) {
    return objects;
  }

  return objects.map(obj => replaceUrlsInObject(obj, urlFields));
};

module.exports = {
  replaceExistingUrl,
  replaceMultipleUrls,
  replaceUrlsInObject,
  replaceUrlsInArray
};
