import express from 'express'
import { createEnquiry } from '../controllers/enquiryController.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiting for enquiry submission
const createEnquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many enquiry submissions, please try again later.',
})

router.post('/', createEnquiryLimiter, createEnquiry)

export default router

