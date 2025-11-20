import express from 'express'
import { getReviews, createReview } from '../controllers/reviewsController.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiting for review creation
const createReviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many review submissions, please try again later.',
})

router.get('/', getReviews)
router.post('/', createReviewLimiter, createReview)

export default router

