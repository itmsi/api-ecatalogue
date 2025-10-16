const { replaceUrlsInObject, replaceUrlsInArray } = require('../utils/url-replacer');

/**
 * Middleware to automatically replace base URLs in API responses
 * This middleware will process the response data and replace URLs with the configured S3_BASE_URL
 */
const urlReplacerMiddleware = (req, res, next) => {
  // Store the original json method
  const originalJson = res.json;

  // Override the json method to process URLs before sending response
  res.json = function(data) {
    let processedData = data;

    try {
      // If S3_BASE_URL is not configured, return original data
      if (!process.env.S3_BASE_URL) {
        return originalJson.call(this, data);
      }

      // Process different data types
      if (Array.isArray(data)) {
        // Handle array of objects
        processedData = replaceUrlsInArray(data);
      } else if (data && typeof data === 'object') {
        // Handle single object
        if (data.data && Array.isArray(data.data)) {
          // Handle paginated response with data array
          processedData = {
            ...data,
            data: replaceUrlsInArray(data.data)
          };
        } else {
          // Handle single object response
          processedData = replaceUrlsInObject(data);
        }
      }

      // Call the original json method with processed data
      return originalJson.call(this, processedData);
    } catch (error) {
      console.warn('Error processing URLs in response:', error.message);
      // If there's an error, return original data
      return originalJson.call(this, data);
    }
  };

  next();
};

/**
 * Middleware to replace URLs in specific fields only
 * 
 * @param {string[]} urlFields - Array of field names to process
 */
const urlReplacerMiddlewareWithFields = (urlFields = []) => {
  return (req, res, next) => {
    // Store the original json method
    const originalJson = res.json;

    // Override the json method to process URLs before sending response
    res.json = function(data) {
      let processedData = data;

      try {
        // If S3_BASE_URL is not configured, return original data
        if (!process.env.S3_BASE_URL) {
          return originalJson.call(this, data);
        }

        // Process different data types with specific fields
        if (Array.isArray(data)) {
          // Handle array of objects
          processedData = replaceUrlsInArray(data, urlFields);
        } else if (data && typeof data === 'object') {
          // Handle single object
          if (data.data && Array.isArray(data.data)) {
            // Handle paginated response with data array
            processedData = {
              ...data,
              data: replaceUrlsInArray(data.data, urlFields)
            };
          } else {
            // Handle single object response
            processedData = replaceUrlsInObject(data, urlFields);
          }
        }

        // Call the original json method with processed data
        return originalJson.call(this, processedData);
      } catch (error) {
        console.warn('Error processing URLs in response:', error.message);
        // If there's an error, return original data
        return originalJson.call(this, data);
      }
    };

    next();
  };
};

module.exports = {
  urlReplacerMiddleware,
  urlReplacerMiddlewareWithFields
};
