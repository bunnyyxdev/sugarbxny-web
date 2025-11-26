/**
 * Database Setup Script (PostgreSQL/NeonDB)
 * 
 * This script helps you set up the database with initial configuration
 * Run: node scripts/setup-database.js
 */

const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

async function setupDatabase() {
  let pool

  try {
    // Check for DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL environment variable is not set!')
      console.error('\nPlease set DATABASE_URL in your .env.local file:')
      console.error('DATABASE_URL=postgresql://user:password@host/database?sslmode=require')
      console.error('\nGet your connection string from NeonDB dashboard:')
      console.error('https://console.neon.tech')
      process.exit(1)
    }

    // Create connection pool
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false // Required for NeonDB
      }
    })

    console.log('✅ Connected to PostgreSQL/NeonDB database')
    console.log('')

    // Test connection
    await pool.query('SELECT NOW()')
    console.log('✅ Database connection test successful')
    console.log('')

    // Read and execute schema file
    const schemaPath = path.join(__dirname, '..', 'sql', 'schema.sql')
    
    if (!fs.existsSync(schemaPath)) {
      console.error(`❌ Schema file not found: ${schemaPath}`)
      process.exit(1)
    }

    const schemaSQL = fs.readFileSync(schemaPath, 'utf8')
    
    console.log('📝 Executing database schema...')
    console.log('')

    // Split SQL by semicolons and execute each statement
    // PostgreSQL requires executing statements separately
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await pool.query(statement)
        } catch (error) {
          // Ignore "already exists" errors
          if (!error.message.includes('already exists') && 
              !error.message.includes('duplicate') &&
              !error.message.includes('does not exist')) {
            console.warn(`⚠️  Warning: ${error.message}`)
          }
        }
      }
    }

    console.log('✅ Database schema executed successfully')
    console.log('')
    console.log('📋 Next steps:')
    console.log('1. Create an admin account: npm run create-admin')
    console.log('2. Start the development server: npm run dev')
    console.log('3. Login at /admin/login with default credentials:')
    console.log('   - Email: admin@sugarbunny.com')
    console.log('   - Password: admin123')
    console.log('')
    console.log('⚠️  IMPORTANT: Change default admin passwords after first login!')

  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message)
    console.error('')
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('⚠️  CONNECTION ERROR')
      console.error('')
      console.error('   Possible issues:')
      console.error('   1. DATABASE_URL is incorrect')
      console.error('   2. NeonDB project is paused (free tier auto-pauses)')
      console.error('   3. Network connectivity issues')
      console.error('')
      console.error('   Solutions:')
      console.error('   - Verify DATABASE_URL in .env.local')
      console.error('   - Check NeonDB dashboard and wake up project if paused')
      console.error('   - Ensure connection string includes ?sslmode=require')
    } else if (error.message.includes('password authentication failed')) {
      console.error('⚠️  AUTHENTICATION ERROR')
      console.error('')
      console.error('   The database credentials are incorrect.')
      console.error('   Please verify your DATABASE_URL in .env.local')
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.error('⚠️  DATABASE NOT FOUND')
      console.error('')
      console.error('   The database specified in DATABASE_URL does not exist.')
      console.error('   Create it in NeonDB dashboard first.')
    }
    
    process.exit(1)
  } finally {
    if (pool) {
      await pool.end()
    }
  }
}

setupDatabase()
