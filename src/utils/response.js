/**
 * Standard response utilities for SSO API
 */

/**
 * Success response
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  })
}

/**
 * Base response (alias for successResponse)
 */
const baseResponse = (res, data = null, statusCode = 200) => {
  return successResponse(res, data?.data || data, data?.message || 'Success', statusCode)
}

/**
 * Error response
 */
const errorResponse = (res, error, statusCode = null, errors = null) => {
  // Handle if error is an object with message property
  const message = typeof error === 'object' && error?.message 
    ? error.message 
    : typeof error === 'string' 
    ? error 
    : 'Internal Server Error';
  
  const code = statusCode || error?.statusCode || error?.code || 500;
  
  return res.status(code).json({
    success: false,
    message,
    error: message,
    errors: errors || error?.errors || null,
    timestamp: new Date().toISOString()
  })
}

/**
 * Validation error response
 */
const validationErrorResponse = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors,
    timestamp: new Date().toISOString()
  })
}

/**
 * Not found response
 */
const notFoundResponse = (res, message = 'Resource not found') => {
  return res.status(404).json({
    success: false,
    message,
    timestamp: new Date().toISOString()
  })
}

/**
 * Unauthorized response
 */
const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return res.status(401).json({
    success: false,
    message,
    timestamp: new Date().toISOString()
  })
}

/**
 * Forbidden response
 */
const forbiddenResponse = (res, message = 'Forbidden') => {
  return res.status(403).json({
    success: false,
    message,
    timestamp: new Date().toISOString()
  })
}

module.exports = {
  successResponse,
  baseResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse
}
