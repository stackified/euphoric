import express from 'express'
import { createEnquiry } from '../controllers/enquiryController.js'
import rateLimit from 'express-rate-limit'
import { enquiryValidation, handleValidationErrors } from '../utils/validation.js'

const router = express.Router()

// Rate limiting for enquiry submission
const createEnquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many enquiry submissions, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/', createEnquiryLimiter, enquiryValidation, handleValidationErrors, createEnquiry)

export default router

