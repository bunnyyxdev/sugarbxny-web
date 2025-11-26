/**
 * Check .env.local configuration (PostgreSQL/NeonDB)
 * Run: node scripts/check-env.js
 */

const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')

console.log('📋 Checking .env.local configuration...\n')

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!')
  console.log('\nPlease create .env.local with the following:')
  console.log('\n# Database Configuration (NeonDB PostgreSQL)')
  console.log('DATABASE_URL=postgresql://user:password@host/database?sslmode=require')
  console.log('DATABASE_URL_UNPOOLED=postgresql://user:password@host/database?sslmode=require')
  console.log('\n# Application')
  console.log('NEXTAUTH_SECRET=your_secret_key_here')
  console.log('NEXTAUTH_URL=http://localhost:3000')
  console.log('\n# Email Configuration (optional)')
  console.log('SMTP_HOST=smtp.gmail.com')
  console.log('SMTP_PORT=587')
  console.log('SMTP_USER=your_email@gmail.com')
  console.log('SMTP_PASS=your_app_password')
  console.log('\nGet your DATABASE_URL from NeonDB dashboard: https://console.neon.tech')
  process.exit(1)
}

const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}

envContent.split('\n').forEach(line => {
  const trimmed = line.trim()
  if (trimmed && !trimmed.startsWith('#')) {
    const match = trimmed.match(/^([^=]+)=(.*)$/)
    if (match) {
      envVars[match[1].trim()] = match[2].trim()
    }
  }
})

console.log('Current configuration:')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log(`DATABASE_URL: ${envVars.DATABASE_URL ? '✅ SET' : '❌ NOT SET'}`)
console.log(`DATABASE_URL_UNPOOLED: ${envVars.DATABASE_URL_UNPOOLED ? '✅ SET (optional)' : '⚠️  NOT SET (optional)'}`)
console.log(`NEXTAUTH_SECRET: ${envVars.NEXTAUTH_SECRET ? '✅ SET' : '❌ NOT SET'}`)
console.log(`NEXTAUTH_URL: ${envVars.NEXTAUTH_URL || '⚠️  NOT SET (defaults to http://localhost:3000)'}`)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

const issues = []

if (!envVars.DATABASE_URL) {
  issues.push('❌ DATABASE_URL is not set (REQUIRED)')
} else {
  // Validate connection string format
  try {
    const url = new URL(envVars.DATABASE_URL)
    if (url.protocol !== 'postgresql:' && url.protocol !== 'postgres:') {
      issues.push('⚠️  DATABASE_URL should use postgresql:// or postgres:// protocol')
    }
    if (!envVars.DATABASE_URL.includes('sslmode=require')) {
      issues.push('⚠️  DATABASE_URL should include ?sslmode=require for NeonDB')
    }
  } catch (e) {
    issues.push('⚠️  DATABASE_URL format appears invalid')
  }
}

if (!envVars.NEXTAUTH_SECRET) {
  issues.push('❌ NEXTAUTH_SECRET is not set (REQUIRED)')
}

if (issues.length === 0) {
  console.log('✅ All required environment variables are set!')
  console.log('\nNext steps:')
  console.log('1. Verify your DATABASE_URL is correct (get from NeonDB dashboard)')
  console.log('2. Ensure NeonDB project is active (not paused)')
  console.log('3. Run: npm run setup-db')
  console.log('4. Create admin account: npm run create-admin')
  console.log('5. Start dev server: npm run dev')
} else {
  console.log('⚠️  Issues found:')
  issues.forEach(issue => console.log(`   ${issue}`))
  console.log('\n📝 To fix:')
  console.log('1. Open .env.local in the root directory')
  console.log('2. Set DATABASE_URL with your NeonDB connection string')
  console.log('3. Get connection string from: https://console.neon.tech')
  console.log('4. Format: postgresql://user:password@host/database?sslmode=require')
  console.log('5. Generate NEXTAUTH_SECRET: openssl rand -base64 32')
}
