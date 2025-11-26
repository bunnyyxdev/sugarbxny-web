import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

// Database configuration - reads from environment variables
// Make sure to set DATABASE_URL in your .env.local file
// Format: postgresql://user:password@host:port/database?sslmode=require

// Create connection pool with singleton pattern to prevent multiple pools
let pool: Pool | null = null

function getPool(): Pool {
  // Don't create pool during build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    throw new Error('Database pool should not be accessed during build phase')
  }
  
  if (!pool) {
    const connectionString = process.env.DATABASE_URL
    
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set. Please set it in .env.local')
    }

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false // Required for NeonDB
      },
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    })

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })
  }
  
  return pool
}

// Helper function to convert MySQL ? placeholders to PostgreSQL $1, $2, etc.
function convertMySQLToPostgreSQL(query: string): string {
  if (!query) return query
  
  // Check if query already uses PostgreSQL placeholders
  if (query.includes('$1')) return query
  
  // Convert ? to $1, $2, etc.
  let paramIndex = 1
  return query.replace(/\?/g, () => `$${paramIndex++}`)
}

// Helper function to add RETURNING id to INSERT queries if needed
function addReturningIfNeeded(query: string, isInsert: boolean = false): string {
  if (!isInsert) return query
  
  const trimmedQuery = query.trim()
  // Check if it's an INSERT and doesn't already have RETURNING
  if (trimmedQuery.toUpperCase().startsWith('INSERT') && 
      !trimmedQuery.toUpperCase().includes('RETURNING')) {
    // Add RETURNING id before semicolon or at end
    if (trimmedQuery.endsWith(';')) {
      return trimmedQuery.slice(0, -1) + ' RETURNING id;'
    }
    return trimmedQuery + ' RETURNING id'
  }
  
  return query
}

// Export a proxy that provides MySQL-like interface for compatibility
// This allows existing code to work with minimal changes
export default new Proxy({} as any, {
  get(target, prop) {
    // During build, return no-op functions
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      if (typeof prop === 'string' && (prop === 'execute' || prop === 'query' || prop === 'getConnection')) {
        return () => Promise.resolve([[], { rowCount: 0, insertId: null }])
      }
      return undefined
    }
    
    const poolInstance = getPool()
    
    // Map MySQL methods to PostgreSQL
    if (prop === 'execute') {
      // MySQL execute() -> PostgreSQL query()
      return async (query: string, params?: any[]) => {
        const isInsert = query.trim().toUpperCase().startsWith('INSERT')
        const convertedQuery = convertMySQLToPostgreSQL(query)
        const finalQuery = addReturningIfNeeded(convertedQuery, isInsert)
        
        const result = await poolInstance.query(finalQuery, params)
        
        // Map PostgreSQL result to MySQL-like format
        const mysqlLikeResult = {
          ...result,
          insertId: isInsert && result.rows.length > 0 ? result.rows[0].id : null
        }
        
        return [result.rows, mysqlLikeResult]
      }
    }
    
    if (prop === 'query') {
      // Direct query access
      return async (query: string, params?: any[]) => {
        const convertedQuery = convertMySQLToPostgreSQL(query)
        return await poolInstance.query(convertedQuery, params)
      }
    }
    
    if (prop === 'getConnection') {
      // Return a connection-like object
      return async () => {
        const client = await poolInstance.connect()
        return {
          execute: async (query: string, params?: any[]) => {
            const isInsert = query.trim().toUpperCase().startsWith('INSERT')
            const convertedQuery = convertMySQLToPostgreSQL(query)
            const finalQuery = addReturningIfNeeded(convertedQuery, isInsert)
            
            const result = await client.query(finalQuery, params)
            
            // Map PostgreSQL result to MySQL-like format
            const mysqlLikeResult = {
              ...result,
              insertId: isInsert && result.rows.length > 0 ? result.rows[0].id : null
            }
            
            return [result.rows, mysqlLikeResult]
          },
          query: async (query: string, params?: any[]) => {
            const convertedQuery = convertMySQLToPostgreSQL(query)
            return await client.query(convertedQuery, params)
          },
          release: () => client.release(),
          beginTransaction: async () => {
            await client.query('BEGIN')
          },
          commit: async () => {
            await client.query('COMMIT')
          },
          rollback: async () => {
            await client.query('ROLLBACK')
          }
        }
      }
    }
    
    // For other properties, return from pool
    const value = (poolInstance as any)[prop]
    return typeof value === 'function' ? value.bind(poolInstance) : value
  }
})

// Test connection on startup (skip during build)
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  setTimeout(() => {
    try {
      const poolInstance = getPool()
      poolInstance.query('SELECT NOW()')
        .then(() => {
          console.log('✅ Database connection successful (PostgreSQL/NeonDB)')
        })
        .catch((error) => {
          console.error('❌ Database connection failed:', error.message)
          console.error('')
          console.error('⚠️  DATABASE CONNECTION ERROR')
          console.error('')
          console.error('   SOLUTIONS:')
          console.error('')
          console.error('   1. ✅ CHECK DATABASE_URL:')
          console.error('      - Verify DATABASE_URL is set in .env.local')
          console.error('      - Format: postgresql://user:password@host/database?sslmode=require')
          console.error('      - Get connection string from NeonDB dashboard')
          console.error('')
          console.error('   2. ✅ CHECK NEONDB STATUS:')
          console.error('      - Ensure your NeonDB project is active (not paused)')
          console.error('      - Free tier projects auto-pause after inactivity')
          console.error('      - Wake up project in NeonDB dashboard if needed')
          console.error('')
          console.error('   3. ✅ VERIFY CONNECTION STRING:')
          console.error('      - Use pooled connection string for production')
          console.error('      - Format should include ?sslmode=require')
          console.error('      - Check for typos in username, password, or host')
          console.error('')
          console.error('   Current config:')
          console.error(`   - DATABASE_URL: ${process.env.DATABASE_URL ? '✅ SET' : '❌ NOT SET'}`)
          if (process.env.DATABASE_URL) {
            try {
              const url = new URL(process.env.DATABASE_URL)
              console.error(`   - Host: ${url.hostname}`)
              console.error(`   - Database: ${url.pathname.slice(1)}`)
              console.error(`   - User: ${url.username}`)
            } catch (e) {
              console.error(`   - Connection string format may be invalid`)
            }
          }
          console.error('')
        })
    } catch (err) {
      // Silently fail during initialization
    }
  }, 100)
}

// Initialize database tables automatically
export async function initializeDatabase() {
  try {
    const poolInstance = getPool()
    
    // Create users table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        member_id VARCHAR(20) UNIQUE,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    // Create index for email
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_email ON users(email)
    `)
    
    // Create index for member_id
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_member_id ON users(member_id)
    `)
    
    // Add member_id column if it doesn't exist
    try {
      await poolInstance.query(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS member_id VARCHAR(20) UNIQUE
      `)
    } catch (e: any) {
      // Column might already exist
    }
    
    // Generate member IDs for existing users that don't have one
    const usersResult = await poolInstance.query(`
      SELECT id FROM users WHERE member_id IS NULL OR member_id = ''
    `)
    
    for (const user of usersResult.rows) {
      const memberId = `SB${String(user.id).padStart(6, '0')}`
      await poolInstance.query(
        'UPDATE users SET member_id = $1 WHERE id = $2',
        [memberId, user.id]
      )
    }

    // Create admins table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_email ON admins(email)
    `)

    // Create admin sessions table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER NOT NULL,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_session_token ON admin_sessions(session_token)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_expires_at ON admin_sessions(expires_at)
    `)

    // Create products table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_code VARCHAR(20) UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100),
        image_url VARCHAR(500),
        file_url VARCHAR(500),
        stock INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_category ON products(category)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_is_active ON products(is_active)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_product_code ON products(product_code)
    `)
    
    // Add file_url column if it doesn't exist
    try {
      await poolInstance.query(`
        ALTER TABLE products ADD COLUMN IF NOT EXISTS file_url VARCHAR(500)
      `)
    } catch (e: any) {
      // Column might already exist
    }
    
    // Add product_code column if it doesn't exist
    try {
      await poolInstance.query(`
        ALTER TABLE products ADD COLUMN IF NOT EXISTS product_code VARCHAR(20) UNIQUE
      `)
    } catch (e: any) {
      // Column might already exist
    }
    
    // Generate product codes for existing products
    const productsResult = await poolInstance.query(`
      SELECT id FROM products WHERE product_code IS NULL OR product_code = ''
    `)
    
    for (const product of productsResult.rows) {
      const productCode = `PD${String(product.id).padStart(6, '0')}`
      await poolInstance.query(
        'UPDATE products SET product_code = $1 WHERE id = $2',
        [productCode, product.id]
      )
    }

    // Create redeem_codes table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS redeem_codes (
        id SERIAL PRIMARY KEY,
        code VARCHAR(100) UNIQUE NOT NULL,
        product_id INTEGER,
        discount_percent DECIMAL(5, 2) DEFAULT 0,
        discount_amount DECIMAL(10, 2) DEFAULT 0,
        max_uses INTEGER DEFAULT 1,
        used_count INTEGER DEFAULT 0,
        expires_at TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_code ON redeem_codes(code)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_is_active ON redeem_codes(is_active)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_expires_at ON redeem_codes(expires_at)
    `)

    // Create reviews table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        is_approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_product_id ON reviews(product_id)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_user_id ON reviews(user_id)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_is_approved ON reviews(is_approved)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_rating ON reviews(rating)
    `)

    // Create orders table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50) DEFAULT 'wise',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_status ON orders(status)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_customer_email ON orders(customer_email)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_payment_method ON orders(payment_method)
    `)
    
    // Add payment_method column if it doesn't exist
    try {
      await poolInstance.query(`
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'wise'
      `)
    } catch (e: any) {
      // Column might already exist
    }

    // Create order_items table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_order_id ON order_items(order_id)
    `)

    // Create payments table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'wise',
        mtcn_no VARCHAR(100),
        sender_name VARCHAR(255),
        transaction_date DATE,
        amount DECIMAL(10, 2) NOT NULL,
        payment_proof_url TEXT,
        payer_first_name VARCHAR(255),
        payer_last_name VARCHAR(255),
        payer_phone VARCHAR(50),
        payer_address TEXT,
        payer_city VARCHAR(100),
        payer_country VARCHAR(100),
        stripe_payment_intent_id VARCHAR(255),
        stripe_checkout_session_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_order_id ON payments(order_id)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_mtcn_no ON payments(mtcn_no)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_status ON payments(status)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_payment_method ON payments(payment_method)
    `)
    
    // Add payment columns if they don't exist
    const paymentColumns = [
      'payment_method', 'mtcn_no', 'sender_name', 'transaction_date',
      'payer_first_name', 'payer_last_name', 'payer_phone', 'payer_address',
      'payer_city', 'payer_country', 'stripe_payment_intent_id', 'stripe_checkout_session_id'
    ]
    
    for (const col of paymentColumns) {
      try {
        const colType = col === 'transaction_date' ? 'DATE' :
                       col.includes('stripe') ? 'VARCHAR(255)' :
                       col === 'payer_address' ? 'TEXT' :
                       col === 'mtcn_no' ? 'VARCHAR(100)' :
                       col === 'payer_city' || col === 'payer_country' ? 'VARCHAR(100)' :
                       col === 'payer_phone' ? 'VARCHAR(50)' :
                       'VARCHAR(255)'
        
        await poolInstance.query(`
          ALTER TABLE payments ADD COLUMN IF NOT EXISTS ${col} ${colType}
        `)
      } catch (e: any) {
        // Column might already exist
      }
    }

    // Create payment_settings table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS payment_settings (
        id SERIAL PRIMARY KEY,
        wise_account_name VARCHAR(255) DEFAULT 'Zhong Jie Yong',
        wise_account_number VARCHAR(100) DEFAULT '1101402249826',
        wise_bank VARCHAR(255) DEFAULT 'Kasikorn Bank (K-Bank)',
        wise_swift VARCHAR(50) DEFAULT 'KASITHBK',
        western_union_name VARCHAR(255) DEFAULT 'Zhong Jie Yong',
        western_union_account_number VARCHAR(100) DEFAULT '1101402249826',
        western_union_phone VARCHAR(50) DEFAULT '098-887-0075',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Create user_sessions table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_session_token ON user_sessions(session_token)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_expires_at ON user_sessions(expires_at)
    `)

    // Create blocked_countries table
    await poolInstance.query(`
      CREATE TABLE IF NOT EXISTS blocked_countries (
        id SERIAL PRIMARY KEY,
        country_code VARCHAR(2) UNIQUE NOT NULL,
        country_name VARCHAR(100) NOT NULL,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_country_code ON blocked_countries(country_code)
    `)
    
    await poolInstance.query(`
      CREATE INDEX IF NOT EXISTS idx_expires_at ON blocked_countries(expires_at)
    `)

    // Create default admin accounts if they don't exist
    try {
      const defaultAdmins = [
        {
          email: 'admin@sugarbunny.com',
          password: '$2a$10$BTMlg//L6n5x./qbZ5b1l./Wf2BR1VpQ3Ro4DXm54pE4/.obefK0u' // admin123
        },
        {
          email: 'admin2@sugarbunny.com',
          password: '$2a$10$QkV48F6ZxWcaM5Vw.fDeoOfEMVs6RX1.9XNrkewt7w/SKHOgZUhy.' // admin456
        },
        {
          email: 'superadmin@sugarbunny.com',
          password: '$2a$10$Xz5WiRK61qmTs0c6GCv7rOtR3tzVI8JhKLmHdQ0n0Y9AVb8OunklS' // superadmin
        }
      ]

      for (const admin of defaultAdmins) {
        const existing = await poolInstance.query(
          'SELECT id FROM admins WHERE email = $1',
          [admin.email]
        )

        if (existing.rows.length === 0) {
          await poolInstance.query(
            'INSERT INTO admins (email, password) VALUES ($1, $2)',
            [admin.email, admin.password]
          )
          console.log(`✅ Default admin account created: ${admin.email}`)
        }
      }
    } catch (adminError: any) {
      // Silently fail admin creation
      console.log('ℹ️  Skipping admin account creation (may already exist)')
    }

    // Create trigger function for updated_at (PostgreSQL doesn't support ON UPDATE)
    await poolInstance.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `)

    // Create triggers for updated_at
    const tablesWithUpdatedAt = [
      'users', 'admins', 'products', 'redeem_codes', 'reviews',
      'orders', 'payment_settings', 'blocked_countries'
    ]

    for (const table of tablesWithUpdatedAt) {
      try {
        await poolInstance.query(`
          DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table}
        `)
        await poolInstance.query(`
          CREATE TRIGGER update_${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column()
        `)
      } catch (e: any) {
        // Trigger might already exist
      }
    }

    console.log('✅ Database tables initialized successfully')
  } catch (error: any) {
    console.error('⚠️  Database initialization error:', error.message)
  }
}

// Auto-initialize database on startup
if (typeof window === 'undefined' && 
    process.env.NEXT_PHASE !== 'phase-production-build' &&
    process.env.NEXT_PHASE !== 'phase-production-server') {
  setTimeout(() => {
    initializeDatabase().catch(() => {
      // Silent fail - initialization errors are logged above
    })
  }, 200)
}

// Helper function to execute queries with retry logic
export async function executeWithRetry<T>(
  queryFn: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> {
  let lastError: any
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await queryFn()
    } catch (error: any) {
      lastError = error
      
      // Retry on connection-related errors
      if (
        error.code === 'ECONNRESET' ||
        error.code === 'ETIMEDOUT' ||
        error.message?.includes('connection') ||
        error.message?.includes('timeout')
      ) {
        if (attempt < maxRetries) {
          const delay = retryDelay * Math.pow(2, attempt - 1)
          console.log(`⚠️  Connection error (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
          continue
        }
      }
      
      throw error
    }
  }
  
  throw lastError
}
