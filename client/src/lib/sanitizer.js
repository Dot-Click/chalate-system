/**
 * Sanitizes error messages to prevent XSS attacks
 * @param {string} message - The error message to sanitize
 * @returns {string} - The sanitized error message
 */
export const sanitizeErrorMessage = (message) => {
  if (typeof message !== 'string') {
    return 'An unexpected error occurred';
  }

  // Remove HTML tags and encode special characters
  return message
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim() || 'An unexpected error occurred';
};

/**
 * Validates and sanitizes user input
 * @param {string} input - The input to validate
 * @returns {string} - The sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};
