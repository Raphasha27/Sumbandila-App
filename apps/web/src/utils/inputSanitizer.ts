import DOMPurify from 'dompurify';

// Type declaration for DOMPurify.sanitize return type
interface SanitizeConfig {
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  KEEP_CONTENT?: boolean;
  ALLOWED_URI_REGEXP?: RegExp;
  ADD_ATTR?: string[];
}

/**
 * Sanitizes user input to prevent XSS attacks
 * Uses DOMPurify with strict configuration
 */
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep the text content
  }).trim();
};

/**
 * Sanitizes and validates search queries
 * Additional validation for search-specific use cases
 */
export const sanitizeSearchQuery = (query: string): { sanitized: string; isValid: boolean; error?: string } => {
  // First, sanitize with DOMPurify
  const sanitized = sanitizeInput(query);

  // Check for empty input
  if (!sanitized) {
    return { sanitized: '', isValid: false, error: 'Search query cannot be empty' };
  }

  // Check for malicious patterns
  const maliciousPatterns = [
    /[\;\'\"--]/, // SQL injection patterns
    /<script/i, // Script tags
    /javascript:/i, // JavaScript protocol
    /on\w+=/i, // Event handlers
    /eval\(/i, // Eval function
    /document\./i, // Document object access
    /window\./i, // Window object access
  ];

  for (const pattern of maliciousPatterns) {
    if (pattern.test(query)) {
      return {
        sanitized: '',
        isValid: false,
        error: 'Invalid characters detected in search query'
      };
    }
  }

  // Length validation
  if (sanitized.length > 200) {
    return {
      sanitized: '',
      isValid: false,
      error: 'Search query too long (max 200 characters)'
    };
  }

  return { sanitized, isValid: true };
};

/**
 * Sanitizes HTML content while preserving safe tags
 * Use this when you need to display rich text
 */
export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOWED_URI_REGEXP: /^https?:\/\//i, // Only allow http/https URLs
    ADD_ATTR: ['target'],
  });
};

/**
 * Validates and sanitizes a URL
 */
export const sanitizeURL = (url: string): { sanitized: string; isValid: boolean } => {
  try {
    const sanitized = DOMPurify.sanitize(url, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    }).trim();

    // Validate URL format
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(sanitized)) {
      return { sanitized: '', isValid: false };
    }

    return { sanitized, isValid: true };
  } catch {
    return { sanitized: '', isValid: false };
  }
};

/**
 * Escapes special HTML characters
 * Alternative to DOMPurify for simple text display
 */
export const escapeHTML = (text: string): string => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
};
