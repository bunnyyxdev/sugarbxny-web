/**
 * Database Configuration File (PostgreSQL/NeonDB)
 * 
 * IMPORTANT: Use DATABASE_URL environment variable in .env.local (recommended)
 * Or update this file with your PostgreSQL connection string
 */

module.exports = {
  // PostgreSQL/NeonDB Connection Settings
  // Use connection string from NeonDB dashboard
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/sugarbunny_stores',
  
  // SSL Configuration (required for NeonDB)
  ssl: {
    rejectUnauthorized: false
  },
  
  // Connection Pool Settings
  max: 20,              // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,  // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000,  // Return an error after 10 seconds if connection cannot be established
}

// Instructions:
// 1. Recommended: Use DATABASE_URL in .env.local file:
//    DATABASE_URL=postgresql://user:password@host/database?sslmode=require
//
// 2. Get connection string from NeonDB dashboard:
//    - Sign up at https://neon.tech
//    - Create a project
//    - Copy connection string from "Connection Details"
//
// 3. For pooled connections (recommended for production):
//    Use connection string with "-pooler" in hostname
//
// 4. For direct connections (migrations, admin tasks):
//    Use DATABASE_URL_UNPOOLED or connection string without "-pooler"
