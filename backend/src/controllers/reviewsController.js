import pool from '../config/database.js'
import { getCache, setCache, deleteCache } from '../utils/cache.js'

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    // Try to get from cache
    const cacheKey = 'reviews:all'
    const cached = await getCache(cacheKey)
    if (cached) {
      return res.json(cached)
    }

    // Fetch from database
    const [reviews] = await pool.execute(
      'SELECT * FROM reviews ORDER BY created_at DESC'
    )

    // Cache for 1 hour
    await setCache(cacheKey, reviews, 3600)

    res.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
}

// Create a new review
export const createReview = async (req, res) => {
  try {
    // Validation is handled by middleware, but we sanitize here too
    const { name, message, rating } = req.body

    // Additional sanitization (validation middleware already handled basic validation)
    const sanitizedName = name.trim().substring(0, 100)
    const sanitizedMessage = message.trim().substring(0, 1000)

    // Use prepared statements (already done, but ensuring)
    const [result] = await pool.execute(
      'INSERT INTO reviews (name, message, rating) VALUES (?, ?, ?)',
      [sanitizedName, sanitizedMessage, parseInt(rating, 10)]
    )

    const [newReview] = await pool.execute('SELECT * FROM reviews WHERE id = ?', [
      result.insertId,
    ])

    // Invalidate cache
    await deleteCache('reviews:all')

    res.status(201).json(newReview[0])
  } catch (error) {
    console.error('Error creating review:', error)
    res.status(500).json({ error: 'Failed to create review' })
  }
}

