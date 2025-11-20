import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'euphoric_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test connection
pool
  .getConnection()
  .then((connection) => {
    console.log('✅ Database connected successfully')
    connection.release()
  })
  .catch((error) => {
    console.error('❌ Database connection error:', error.message)
  })

export default pool

