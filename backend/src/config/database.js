import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "euphoric_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Enable multiple statements if needed
  multipleStatements: false,
  // Connection timeout
  connectTimeout: 10000,
  // SSL configuration (set to false for local development)
  ssl: process.env.DB_SSL === "true" ? {} : false,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection with better error handling
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ Database connected successfully");
    connection.release();
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error.message);

    // Provide helpful error messages
    if (
      error.code === "ER_NOT_SUPPORTED_AUTH_MODE" ||
      error.code === "AUTH_SWITCH_PLUGIN_ERROR" ||
      error.message.includes("auth_gssapi_client") ||
      error.message.includes("unknown plugin")
    ) {
      console.error("\n💡 Authentication Plugin Error Detected");
      console.error(
        "   This usually happens with MySQL 8.0+ default authentication."
      );
      console.error(
        "   Your MySQL user is using an unsupported authentication method."
      );
      console.error("\n   To fix this, run these SQL commands in MySQL:");
      console.error(
        `   ALTER USER '${dbConfig.user}'@'${dbConfig.host}' IDENTIFIED WITH mysql_native_password BY '${dbConfig.password}';`
      );
      console.error("   FLUSH PRIVILEGES;");
      console.error("\n   Or if using a different host:");
      console.error(
        `   ALTER USER '${dbConfig.user}'@'%' IDENTIFIED WITH mysql_native_password BY '${dbConfig.password}';`
      );
      console.error("   FLUSH PRIVILEGES;");
      console.error("\n   After running these commands, restart the backend server.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("\n💡 Connection Refused");
      console.error("   Make sure MySQL server is running and accessible.");
      console.error(`   Check host: ${dbConfig.host}, port: 3306`);
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("\n💡 Access Denied");
      console.error("   Check your database credentials in .env file:");
      console.error(`   DB_USER: ${dbConfig.user}`);
      console.error(`   DB_PASSWORD: ${dbConfig.password ? "***" : "(empty)"}`);
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.error("\n💡 Database Not Found");
      console.error(`   Database '${dbConfig.database}' does not exist.`);
      console.error(
        "   Create it with: CREATE DATABASE " + dbConfig.database + ";"
      );
    }
  });

export default pool;
