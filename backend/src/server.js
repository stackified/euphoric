import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import pool from './config/database.js'
import initDatabase from './models/initDatabase.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { initCache, closeCache } from './utils/cache.js'

// Routes
import reviewsRoutes from './routes/reviews.js'
import eventsRoutes from './routes/events.js'
import enquiryRoutes from './routes/enquiry.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

// Middleware - Enhanced Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
)

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      
      const allowedOrigins = [FRONTEND_URL]
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

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

    // Initialize Redis cache (optional - won't crash if unavailable)
    try {
      await initCache()
    } catch (cacheError) {
      console.warn('⚠️  Cache initialization failed, continuing without cache:', cacheError.message)
    }

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
  await closeCache()
  await pool.end()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server')
  await closeCache()
  await pool.end()
  process.exit(0)
})

