/**
 * Database Configuration Example (PostgreSQL/NeonDB)
 * 
 * Copy this file to config/database.js and update with your PostgreSQL credentials
 * Or use environment variables in .env.local (recommended)
 * 
 * For NeonDB, use DATABASE_URL connection string instead of individual config
 */

module.exports = {
  development: {
    connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/sugarbunny_stores',
    ssl: {
      rejectUnauthorized: false // Required for NeonDB
    }
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for NeonDB
    }
  }
}
