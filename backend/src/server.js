import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import pool from './config/database.js'
import initDatabase from './models/initDatabase.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

// Routes
import reviewsRoutes from './routes/reviews.js'
import eventsRoutes from './routes/events.js'
import enquiryRoutes from './routes/enquiry.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// API Routes
app.use('/api/reviews', reviewsRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/enquiry', enquiryRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database tables
    await initDatabase()

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📡 API available at http://localhost:${PORT}/api`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server')
  await pool.end()
  process.exit(0)
})

