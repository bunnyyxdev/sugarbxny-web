/**
 * Create New Admin Account (PostgreSQL/NeonDB)
 * 
 * This script creates a new admin account in the database
 * Run: node scripts/create-admin.js
 * Or: npm run create-admin email password
 */

const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const readline = require('readline')
require('dotenv').config({ path: '.env.local' })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function createAdmin() {
  let pool
  let email, password

  try {
    // Check for DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL environment variable is not set!')
      console.error('\nPlease set DATABASE_URL in your .env.local file')
      process.exit(1)
    }

    // Get email and password from command line or prompt
    if (process.argv[2] && process.argv[3]) {
      email = process.argv[2]
      password = process.argv[3]
    } else {
      console.log('📝 Create New Admin Account\n')
      email = await question('Enter admin email: ')
      password = await question('Enter admin password: ')
    }

    if (!email || !password) {
      console.error('❌ Email and password are required!')
      process.exit(1)
    }

    // Validate email format
    if (!email.includes('@')) {
      console.error('❌ Invalid email format!')
      process.exit(1)
    }

    // Validate password length
    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters!')
      process.exit(1)
    }

    // Connect to database
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })

    console.log('✓ Connected to database')

    // Check if admin already exists
    const existingResult = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [email]
    )

    if (existingResult.rows.length > 0) {
      console.error(`❌ Admin with email "${email}" already exists!`)
      console.log('   Use a different email or update the existing admin.')
      process.exit(1)
    }

    // Hash password and insert
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query(
      'INSERT INTO admins (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    )

    console.log('\n✅ Admin account created successfully!')
    console.log(`\n   Email: ${email}`)
    console.log(`   Password: ${password}`)
    console.log('\n   ⚠️  You can now login with these credentials at /admin/login')
    console.log('   ⚠️  IMPORTANT: Change this password after first login!')

  } catch (error) {
    console.error('\n❌ Error creating admin account:', error.message)
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('\n   Database connection failed. Check your .env.local file:')
      console.error('   - DATABASE_URL must be set correctly')
      console.error('   - Ensure NeonDB project is active (not paused)')
    } else if (error.message.includes('relation "admins" does not exist')) {
      console.error('\n   Database tables not found. Run: npm run setup-db')
    } else if (error.code === '23505') { // PostgreSQL unique violation
      console.error(`\n   Admin with email "${email}" already exists!`)
    }
    
    process.exit(1)
  } finally {
    if (pool) {
      await pool.end()
    }
    rl.close()
  }
}

createAdmin()
