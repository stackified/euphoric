import { body, validationResult } from 'express-validator'

/**
 * Input validation and sanitization utilities
 * Prevents XSS, SQL Injection, and validates input data
 */

// Sanitize string input
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return ''
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

// Sanitize email
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return ''
  return email.trim().toLowerCase().substring(0, 255)
}

// Sanitize phone
export const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') return ''
  return phone.trim().replace(/[^0-9+\-() ]/g, '').substring(0, 20)
}

// Review validation rules
export const reviewValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .escape(),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
]

// Enquiry validation rules
export const enquiryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number is too long')
    .custom((value) => {
      if (value && !/^[0-9+\-() ]+$/.test(value)) {
        throw new Error('Invalid phone number format')
      }
      return true
    }),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape(),
]

// Event validation rules
export const eventValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters')
    .escape(),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Location must be between 3 and 200 characters')
    .escape(),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description is too long')
    .escape(),
]

// Validation result handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array(),
    })
  }
  next()
}

