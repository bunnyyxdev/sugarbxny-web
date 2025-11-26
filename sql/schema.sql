-- ============================================
-- Sugarbunny Stores - Database Setup SQL (PostgreSQL/NeonDB)
-- ============================================
-- 
-- HOW TO USE:
-- 1. Connect to your NeonDB database using a PostgreSQL client
-- 2. Or use NeonDB's SQL Editor in the dashboard
-- 3. Copy and paste ALL the SQL below
-- 4. Execute the script
--
-- ============================================

-- Create trigger function for updated_at (PostgreSQL doesn't support ON UPDATE)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- Users Table
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  member_id VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_member_id ON users(member_id);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Admins Table
-- ============================================

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_email ON admins(email);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_admins_updated_at ON admins;
CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Admin Sessions Table
-- ============================================

CREATE TABLE IF NOT EXISTS admin_sessions (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_session_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_expires_at ON admin_sessions(expires_at);

-- ============================================
-- Create Admin Accounts
-- ============================================
-- All admin accounts below can login immediately after importing this SQL!
-- The system will fetch admin credentials from the database automatically.
--
-- ⚠️ IMPORTANT: Change passwords after first login!
-- ============================================

-- Admin Account 1
INSERT INTO admins (email, password) 
VALUES (
  'admin@sugarbunny.com',
  '$2a$10$BTMlg//L6n5x./qbZ5b1l./Wf2BR1VpQ3Ro4DXm54pE4/.obefK0u'
)
ON CONFLICT (email) DO NOTHING;

-- Admin Account 2
INSERT INTO admins (email, password) 
VALUES (
  'admin2@sugarbunny.com',
  '$2a$10$QkV48F6ZxWcaM5Vw.fDeoOfEMVs6RX1.9XNrkewt7w/SKHOgZUhy.'
)
ON CONFLICT (email) DO NOTHING;

-- Admin Account 3
INSERT INTO admins (email, password) 
VALUES (
  'superadmin@sugarbunny.com',
  '$2a$10$Xz5WiRK61qmTs0c6GCv7rOtR3tzVI8JhKLmHdQ0n0Y9AVb8OunklS'
)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Admin Login Credentials
-- ============================================
-- Account 1:
--   Email: admin@sugarbunny.com
--   Password: admin123
--
-- Account 2:
--   Email: admin2@sugarbunny.com
--   Password: admin456
--
-- Account 3:
--   Email: superadmin@sugarbunny.com
--   Password: superadmin
-- ============================================

-- ============================================
-- Products Table
-- ============================================

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
);

CREATE INDEX IF NOT EXISTS idx_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_product_code ON products(product_code);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Redeem Codes Table
-- ============================================

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
);

CREATE INDEX IF NOT EXISTS idx_code ON redeem_codes(code);
CREATE INDEX IF NOT EXISTS idx_is_active ON redeem_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_expires_at ON redeem_codes(expires_at);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_redeem_codes_updated_at ON redeem_codes;
CREATE TRIGGER update_redeem_codes_updated_at
  BEFORE UPDATE ON redeem_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Reviews Table
-- ============================================

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
);

CREATE INDEX IF NOT EXISTS idx_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_is_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_rating ON reviews(rating);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Orders Table
-- ============================================

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
);

CREATE INDEX IF NOT EXISTS idx_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_payment_method ON orders(payment_method);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Order Items Table
-- ============================================

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_order_id ON order_items(order_id);

-- ============================================
-- Payments Table
-- ============================================

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
);

CREATE INDEX IF NOT EXISTS idx_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_mtcn_no ON payments(mtcn_no);
CREATE INDEX IF NOT EXISTS idx_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payment_method ON payments(payment_method);

-- ============================================
-- Payment Settings Table
-- ============================================

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
);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_payment_settings_updated_at ON payment_settings;
CREATE TRIGGER update_payment_settings_updated_at
  BEFORE UPDATE ON payment_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- User Sessions Table
-- ============================================

CREATE TABLE IF NOT EXISTS user_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_session_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_expires_at ON user_sessions(expires_at);

-- ============================================
-- Blocked Countries Table
-- ============================================

CREATE TABLE IF NOT EXISTS blocked_countries (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(2) UNIQUE NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_country_code ON blocked_countries(country_code);
CREATE INDEX IF NOT EXISTS idx_expires_at ON blocked_countries(expires_at);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_blocked_countries_updated_at ON blocked_countries;
CREATE TRIGGER update_blocked_countries_updated_at
  BEFORE UPDATE ON blocked_countries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- How to Add More Admins
-- ============================================
-- Option 1: Generate SQL hash
--   Run: npm run generate-admin-sql email@example.com password
--   Copy the generated SQL and add it here
--
-- Option 2: Direct database insert
--   Run: npm run create-admin email@example.com password
--
-- Option 3: Add manually in NeonDB SQL Editor
--   Use the generated SQL from Option 1
-- ============================================
