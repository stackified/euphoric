import pool from '../config/database.js'

const initDatabase = async () => {
  try {
    // Test connection first
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()

    // Create reviews table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create events table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        location VARCHAR(255) NOT NULL,
        image VARCHAR(500),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create enquiries table (optional - for tracking)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('✅ Database tables initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing database:', error.message)
    
    // Provide specific help for authentication errors
    if (error.message.includes('auth_gssapi_client') || error.message.includes('authentication')) {
      console.error('\n🔧 FIX REQUIRED: MySQL Authentication Plugin Issue')
      console.error('   Your MySQL user is using an unsupported authentication method.')
      console.error('\n   Run these commands in MySQL to fix:')
      console.error('   ----------------------------------------')
      const user = process.env.DB_USER || 'root'
      const host = process.env.DB_HOST || 'localhost'
      console.error(`   ALTER USER '${user}'@'${host}' IDENTIFIED WITH mysql_native_password BY '${process.env.DB_PASSWORD || ''}';`)
      console.error('   FLUSH PRIVILEGES;')
      console.error('   ----------------------------------------')
      console.error('\n   Or if connecting from any host:')
      console.error(`   ALTER USER '${user}'@'%' IDENTIFIED WITH mysql_native_password BY '${process.env.DB_PASSWORD || ''}';`)
      console.error('   FLUSH PRIVILEGES;')
      console.error('\n   After running these commands, restart the backend server.')
    }
    
    // Re-throw to prevent server from starting without database
    throw error
  }
}

export default initDatabase

