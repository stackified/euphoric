import pool from '../config/database.js'

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const [reviews] = await pool.execute(
      'SELECT * FROM reviews ORDER BY created_at DESC'
    )
    res.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
}

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { name, message, rating } = req.body

    // Validation
    if (!name || !message || !rating) {
      return res.status(400).json({ error: 'Name, message, and rating are required' })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' })
    }

    const [result] = await pool.execute(
      'INSERT INTO reviews (name, message, rating) VALUES (?, ?, ?)',
      [name, message, rating]
    )

    const [newReview] = await pool.execute('SELECT * FROM reviews WHERE id = ?', [
      result.insertId,
    ])

    res.status(201).json(newReview[0])
  } catch (error) {
    console.error('Error creating review:', error)
    res.status(500).json({ error: 'Failed to create review' })
  }
}

