# 🛍️ Sugarbunny Stores

A modern, full-featured e-commerce webshop built with Next.js, React, and TypeScript. This platform provides a complete solution for selling virtual products and services with secure payment processing and comprehensive admin management.

🌐 **Live Site:** [https://store.sugarbunny.xyz/](https://store.sugarbunny.xyz/)

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192)
![NeonDB](https://img.shields.io/badge/NeonDB-Serverless-00E5CC)

## ✨ Features

### 🎨 User Experience
- **Beautiful Modern UI** - Gradient design with pink, blue, and white color scheme
- **Dark Mode Support** - Seamless theme switching with persistent preferences
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Modern UI components with smooth transitions

### 🛒 E-Commerce Features
- **Product Catalog** - Browse and search products by category
- **Shopping Cart** - Add, remove, and manage items
- **Secure Checkout** - Complete order process with customer information
- **Order Management** - Track orders and view order history
- **Stock Management** - Real-time inventory tracking
- **Product Categories** - Organized product browsing

### 💳 Payment & Orders
- **Multiple Payment Methods** - Support for MoneyGram and wire transfers
- **Payment Verification** - Secure payment proof submission
- **Order Status Tracking** - Real-time order status updates
- **Email Notifications** - Automated order and payment confirmations

### 👤 User Management
- **User Authentication** - Secure login and registration
- **User Dashboard** - Personal account management
- **Order History** - View past purchases and downloads
- **Profile Management** - Update account information

### 🔐 Admin Features
- **Admin Dashboard** - Comprehensive management interface
- **Product Management** - Create, edit, and manage products
- **Order Management** - Process and track all orders
- **User Management** - View and manage user accounts
- **Redeem Codes** - Generate and manage discount codes
- **Review Management** - Moderate customer reviews
- **Payment Settings** - Configure payment methods and settings
- **Email Configuration** - Set up email notifications

### 🎁 Additional Features
- **Redeem Codes** - Discount code system
- **Product Reviews** - Customer review and rating system
- **Currency Exchange** - Real-time USD to THB conversion
- **Working Hours Display** - Business hours information
- **Discord Support** - Direct support link integration
- **FAQ Section** - Comprehensive frequently asked questions
- **Virtual Products** - Support for digital downloads and services

## 📁 Project Structure

```
sugarbunny-stores/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard pages
│   │   ├── dashboard/      # Admin main dashboard
│   │   └── login/          # Admin login page
│   ├── api/                 # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   ├── auth/           # Authentication endpoints
│   │   ├── orders/         # Order management endpoints
│   │   ├── payments/       # Payment processing endpoints
│   │   ├── products/       # Product endpoints
│   │   └── ...             # Other API routes
│   ├── cart/               # Shopping cart page
│   ├── checkout/           # Checkout process
│   ├── dashboard/          # User dashboard
│   ├── products/           # Product listing and detail pages
│   ├── payment/            # Payment pages
│   ├── login/              # User login page
│   ├── register/           # User registration page
│   └── layout.tsx          # Root layout
├── components/              # React components
│   ├── Navbar.tsx          # Navigation bar
│   ├── TopBar.tsx          # Top information bar
│   ├── Footer.tsx          # Footer component
│   ├── ProductGrid.tsx     # Product grid display
│   ├── CurrencyRate.tsx    # Currency exchange display
│   └── Toast.tsx           # Toast notifications
├── contexts/               # React contexts
│   ├── CartContext.tsx     # Shopping cart state
│   ├── ThemeContext.tsx    # Theme management
│   └── ToastContext.tsx    # Toast notifications
├── lib/                    # Utility functions
│   ├── db.ts              # Database connection
│   ├── auth.ts            # Authentication helpers
│   ├── products.ts        # Product utilities
│   ├── orders.ts          # Order utilities
│   ├── payments.ts        # Payment utilities
│   └── reviews.ts         # Review utilities
├── config/                 # Configuration files
│   ├── database.js        # Database configuration
│   └── database.example.js # Database config example
├── scripts/               # Setup and utility scripts
│   ├── setup-database.js  # Database setup script
│   ├── create-admin.js    # Admin account creation
│   ├── check-env.js       # Environment validation
│   └── init-db.ts         # Database initialization
├── sql/                   # Database schema
│   └── schema.sql         # Complete database schema
├── public/                # Static assets
│   └── assets/            # Images and media files
├── middleware.ts          # Next.js middleware
└── next.config.js         # Next.js configuration
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **PostgreSQL** - Database (via NeonDB serverless)
- **pg** / **@vercel/postgres** - PostgreSQL database driver
- **bcryptjs** - Password hashing
- **Nodemailer** - Email functionality

### Payment & Services
- **Stripe** - Payment processing (optional)
- **Vercel Analytics** - Analytics integration

## ⚡ Quick Start

For experienced developers who want to get started quickly:

```bash
# Clone and install
git clone <repository-url> && cd sugarbunny-stores && npm install

# Set up environment
cp .env.example .env.local  # Edit with your credentials

# Set up database
npm run setup-db

# Create admin account
npm run create-admin

# Start development server
npm run dev
```

Visit `http://localhost:3000` and login to admin dashboard at `/admin/login`

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **NeonDB Account** - [Sign up for free](https://neon.tech) (PostgreSQL serverless database)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sugarbunny-stores
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration (NeonDB PostgreSQL)
   # Get your connection string from NeonDB dashboard
   DATABASE_URL=postgresql://user:password@ep-xxx-xxx-pooler.us-east-1.aws.neon.tech/dbname?sslmode=require
   DATABASE_URL_UNPOOLED=postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   
   # Application
   NEXTAUTH_SECRET=your_secret_key_here
   NEXTAUTH_URL=http://localhost:3000
   
   # Email Configuration (for Nodemailer)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   SMTP_FROM=noreply@sugarbunny.xyz
   
   # Optional: Stripe (if using)
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   
   # Optional: Vercel Analytics
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
   ```
   
   **Getting NeonDB Connection String:**
   1. Sign up at [neon.tech](https://neon.tech)
   2. Create a new project
   3. Copy the connection string from the dashboard
   4. Use `DATABASE_URL` for pooled connections (recommended)
   5. Use `DATABASE_URL_UNPOOLED` for migrations and direct connections

4. **Set up the database**
   
   Option A: Using the setup script (recommended)
   ```bash
   npm run setup-db
   ```
   
   Option B: Manual setup
   - Connect to your NeonDB database using a PostgreSQL client
   - Import the schema from `sql/schema.sql` (may need PostgreSQL-specific syntax)
   - Or use NeonDB's SQL editor in the dashboard

5. **Create an admin account**
   ```bash
   npm run create-admin
   ```
   Or use the SQL generator:
   ```bash
   npm run generate-admin-sql
   ```

6. **Verify environment variables**
   ```bash
   npm run check-env
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run setup-db` - Set up database schema automatically
- `npm run check-env` - Verify all required environment variables are set
- `npm run create-admin` - Create a new admin account interactively
- `npm run generate-admin-sql` - Generate SQL for creating admin accounts

## 🔧 Configuration

### Database Setup

The application uses **NeonDB (PostgreSQL)** for data storage. NeonDB is a serverless PostgreSQL database that automatically scales and requires no server management.

**Connection String Setup:**
1. **Get your connection string from NeonDB dashboard**
   - Sign in to [NeonDB Console](https://console.neon.tech)
   - Select your project
   - Go to "Connection Details"
   - Copy the connection string

2. **Set environment variables**
   ```env
   # For pooled connections (recommended for production)
   DATABASE_URL=postgresql://user:password@ep-xxx-pooler.us-east-1.aws.neon.tech/dbname?sslmode=require
   
   # For direct connections (migrations, admin tasks)
   DATABASE_URL_UNPOOLED=postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```

3. **Connection String Format:**
   ```
   postgresql://[user]:[password]@[host]/[database]?sslmode=require
   ```

**Why NeonDB?**
- ✅ Serverless - No server management needed
- ✅ Auto-scaling - Handles traffic spikes automatically
- ✅ Free tier available
- ✅ Built-in connection pooling
- ✅ Branching support for development
- ✅ Automatic backups

### Email Configuration

Configure email settings for automated notifications:

- **Via Admin Dashboard**: Navigate to Admin → Email Settings
- **Via Environment Variables**: Set SMTP configuration in `.env.local`

Email notifications are sent for:
- Order confirmations
- Payment receipts
- Password reset requests
- Order status updates

### Payment Configuration

The platform supports multiple payment methods:
- **MoneyGram** - Configure in Admin → Payment Settings
- **Wire Transfer** - Configure in Admin → Payment Settings
- **Stripe** (Optional) - Set up Stripe keys in environment variables

## 🌐 Deployment

### Recommended: Vercel

1. **Push your code to GitHub/GitLab**
2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" and import your repository
3. **Configure environment variables**
   - Add all variables from `.env.local` in Vercel dashboard
4. **Set up NeonDB database**
   - Create a NeonDB project at [neon.tech](https://neon.tech)
   - Copy connection string from dashboard
   - Add `DATABASE_URL` to Vercel environment variables
   - NeonDB works seamlessly with Vercel deployments
5. **Deploy**
   - Vercel will automatically build and deploy your application

### Other Deployment Options

- **Netlify** - Similar process to Vercel
- **Railway** - Includes MySQL database option
- **DigitalOcean App Platform** - Full-stack deployment
- **Traditional VPS** - Requires Node.js and MySQL setup

### Pre-Deployment Checklist

- [ ] All environment variables are set
- [ ] Database is configured and accessible
- [ ] Email service (SMTP) is configured
- [ ] Payment gateway is set up (if using)
- [ ] Admin account is created
- [ ] SSL certificate is configured (for production)
- [ ] Domain is configured and DNS is set up

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env.local` to version control
- **Database**: Use strong passwords and restrict database access
- **Admin Accounts**: Change default admin passwords immediately
- **HTTPS**: Always use HTTPS in production
- **Session Management**: Sessions are securely managed with tokens
- **Password Hashing**: All passwords are hashed using bcryptjs

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env.local` is correct
- Check NeonDB dashboard for connection status
- Ensure connection string includes `?sslmode=require`
- Use pooled connection string (`-pooler`) for production
- Use unpooled connection string for migrations
- Run `npm run check-env` to verify configuration
- Check NeonDB project is not paused (free tier auto-pauses after inactivity)

### Build Errors
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check Node.js version: `node --version` (should be 18+)
- Verify all dependencies are installed: `npm install`

### Email Not Sending
- Verify SMTP credentials in environment variables
- Check spam folder
- Test SMTP connection using admin dashboard
- For Gmail, use App Password instead of regular password

## 📡 API Documentation

### Public Endpoints

#### Products
- `GET /api/products` - Get all active products
- `GET /api/products/[id]` - Get product by ID
- `GET /api/products/category` - Get products by category

#### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/[id]` - Get order by ID
- `GET /api/orders/user` - Get user's orders (requires authentication)

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify user session
- `POST /api/auth/reset-password` - Request password reset

#### Payments
- `POST /api/payments/submit` - Submit payment proof
- `POST /api/payments/send-email` - Send payment confirmation email
- `GET /api/payment-settings` - Get payment settings

#### Reviews
- `GET /api/reviews` - Get product reviews
- `POST /api/reviews` - Create a review (requires authentication)

#### Utilities
- `GET /api/exchange-rate` - Get USD to THB exchange rate
- `GET /api/redeem-codes/validate` - Validate redeem code

### Admin Endpoints

All admin endpoints require authentication via admin session.

- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create/update product
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/orders/[id]/status` - Update order status
- `GET /api/admin/users` - Get all users
- `GET /api/admin/reviews` - Get all reviews
- `POST /api/admin/redeem-codes` - Create redeem code
- `GET /api/admin/payment-settings` - Get payment settings
- `POST /api/admin/payment-settings` - Update payment settings
- `GET /api/admin/email-settings` - Get email settings
- `POST /api/admin/email-settings` - Update email settings

## 🔑 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | NeonDB PostgreSQL connection string (pooled) | `postgresql://user:pass@ep-xxx-pooler.us-east-1.aws.neon.tech/db?sslmode=require` |
| `DATABASE_URL_UNPOOLED` | Recommended | NeonDB PostgreSQL connection string (direct) | `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/db?sslmode=require` |
| `NEXTAUTH_SECRET` | Yes | Secret key for session encryption | `your_secret_key` |
| `NEXTAUTH_URL` | Yes | Application URL | `http://localhost:3000` |
| `SMTP_HOST` | No | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | No | SMTP server port | `587` |
| `SMTP_USER` | No | SMTP username | `your_email@gmail.com` |
| `SMTP_PASS` | No | SMTP password | `your_app_password` |
| `SMTP_FROM` | No | Default sender email | `noreply@sugarbunny.xyz` |
| `STRIPE_SECRET_KEY` | No | Stripe secret key (if using) | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key (if using) | `pk_test_...` |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | No | Vercel Analytics ID | `your_analytics_id` |

## 🗄️ Database Schema Overview

The application uses **PostgreSQL** (via NeonDB) with the following main tables:

- **users** - User accounts and authentication
- **admins** - Admin accounts
- **admin_sessions** - Admin session management
- **products** - Product catalog with pricing, stock, and metadata
- **orders** - Customer orders and order details
- **order_items** - Individual items within orders
- **payments** - Payment records and verification
- **payment_settings** - Payment method configurations
- **reviews** - Product reviews and ratings
- **redeem_codes** - Discount and promotional codes
- **email_settings** - Email service configuration

For the complete schema, see `sql/schema.sql` (may need PostgreSQL-specific syntax conversion).

**Note:** If migrating from MySQL, you'll need to convert the schema to PostgreSQL syntax (e.g., `AUTO_INCREMENT` → `SERIAL`, `ENGINE=InnoDB` → removed, etc.).

## 🌐 Browser Compatibility

This application is tested and works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📸 Screenshots

> 💡 **Tip**: Add screenshots of your application here to showcase the UI and features.

Example sections to include:
- Homepage
- Product listing
- Shopping cart
- Checkout process
- User dashboard
- Admin dashboard

## 🔄 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow TypeScript best practices
   - Use Tailwind CSS for styling
   - Test locally before committing

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit and push**
   ```bash
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a pull request** (if using version control)

## ⚡ Performance Notes

- **Product Caching**: Products are cached for 60 seconds to reduce database load
- **Exchange Rate Caching**: Exchange rates are cached daily
- **Image Optimization**: Next.js automatically optimizes images
- **Static Generation**: Product pages can be statically generated for better performance
- **Database Indexing**: Key fields are indexed for faster queries

## 📋 Version History

### v0.1.0 (Current)
- Initial release
- Full e-commerce functionality
- Admin dashboard
- Payment processing
- User authentication
- Product management
- Order management
- Review system
- Redeem codes

> See [CHANGELOG.md](CHANGELOG.md) for detailed version history (if available)

## 🔄 Migration from MySQL to NeonDB (PostgreSQL)

If you're migrating from MySQL to NeonDB, here are the key changes needed:

### Code Changes Required

1. **Update Database Driver**
   ```bash
   npm uninstall mysql2
   npm install pg @types/pg
   # Or for Vercel: npm install @vercel/postgres
   ```

2. **Update Connection Code**
   - Replace MySQL connection pool with PostgreSQL client
   - Update `lib/db.ts` to use `pg` or `@vercel/postgres`
   - Change connection string format

3. **SQL Syntax Changes**
   - `AUTO_INCREMENT` → `SERIAL` or `GENERATED ALWAYS AS IDENTITY`
   - `ENGINE=InnoDB` → Remove (PostgreSQL doesn't use engines)
   - `TIMESTAMP DEFAULT CURRENT_TIMESTAMP` → `TIMESTAMP DEFAULT NOW()`
   - `ON UPDATE CURRENT_TIMESTAMP` → Use triggers or application logic
   - `VARCHAR(255)` → `VARCHAR(255)` (same)
   - `TEXT` → `TEXT` (same)
   - `DECIMAL(10, 2)` → `DECIMAL(10, 2)` (same)
   - `BOOLEAN` → `BOOLEAN` (same, but use `true/false` not `1/0`)

4. **Query Changes**
   - `LIMIT ?, ?` → `LIMIT ? OFFSET ?`
   - `LAST_INSERT_ID()` → `RETURNING id`
   - `IFNULL()` → `COALESCE()`
   - Backticks for identifiers → Double quotes (or remove if not needed)

5. **Environment Variables**
   - Remove: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Add: `DATABASE_URL` and `DATABASE_URL_UNPOOLED`

### Migration Steps

1. **Export MySQL Data**
   ```bash
   mysqldump -u user -p database_name > mysql_backup.sql
   ```

2. **Convert Schema**
   - Convert MySQL schema to PostgreSQL syntax
   - Update `sql/schema.sql` with PostgreSQL syntax

3. **Import to NeonDB**
   - Create new NeonDB project
   - Run converted schema SQL
   - Import data (may need data transformation)

4. **Update Application**
   - Install PostgreSQL driver
   - Update connection code
   - Test all functionality

### Example Connection Code (PostgreSQL)

```typescript
// Using pg library
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// Using @vercel/postgres (recommended for Vercel)
import { sql } from '@vercel/postgres'

const result = await sql`SELECT * FROM users WHERE id = ${userId}`
```

## 🗺️ Roadmap

### Planned Features
- [ ] Multi-language support (i18n)
- [ ] Advanced search and filtering
- [ ] Wishlist functionality
- [ ] Social media integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Automated backup system
- [ ] API rate limiting
- [ ] Webhook support
- [ ] Multi-currency support (beyond USD/THB)

### Under Consideration
- [ ] Subscription-based products
- [ ] Affiliate program
- [ ] Gift cards
- [ ] Product bundles
- [ ] Advanced reporting

## ⚠️ Known Issues & Limitations

### Current Limitations
- **Single Currency Display**: Primary currency is USD with THB conversion
- **File Upload Size**: Limited by Next.js server action body size (10MB default)
- **Session Management**: Uses cookie-based sessions (consider JWT for scalability)
- **Email Templates**: Basic email templates (customization via admin dashboard)
- **Payment Gateway**: Manual payment verification required (no automatic gateway integration)

### Known Issues
- None reported at this time

> If you encounter any issues, please report them via Discord or create an issue in the repository.

## 💾 Backup & Recovery

### Database Backup

**NeonDB Automatic Backups:**
- NeonDB automatically creates point-in-time backups
- Access backups via NeonDB dashboard
- Restore to any point in time (within retention period)

**Manual Backup:**
```bash
# Export database using pg_dump
pg_dump "postgresql://user:pass@host/dbname" > backup_$(date +%Y%m%d).sql

# Import backup using psql
psql "postgresql://user:pass@host/dbname" < backup_20240101.sql
```

**Using NeonDB Dashboard:**
1. Go to NeonDB Console → Your Project
2. Navigate to "Branches" for point-in-time recovery
3. Create a branch from a specific timestamp
4. Export data using SQL editor or API

**Automated Backup (Recommended):**
- NeonDB handles automatic backups (included in all plans)
- Set up additional exports if needed via cron jobs
- Use NeonDB branching for development/testing environments

### File Backup
- Product images and files are stored in `public/assets/`
- Consider using cloud storage (AWS S3, Cloudinary) for production
- Backup configuration files: `config/database.js`, `.env.local`

### Recovery Steps
1. Restore database from backup
2. Restore file assets
3. Verify environment variables
4. Test application functionality
5. Update admin passwords if needed

## 📊 Monitoring & Logging

### Application Logs
- **Development**: Logs are output to console
- **Production**: Consider using logging services:
  - Vercel Analytics (already integrated)
  - Sentry for error tracking
  - LogRocket for session replay
  - Custom logging solution

### Key Metrics to Monitor
- Database connection pool usage
- API response times
- Error rates
- Order completion rates
- Payment processing times
- Email delivery rates

### Health Checks
- Database connectivity: `npm run check-env`
- API endpoints: Monitor `/api/products` response time
- Email service: Test via admin dashboard

## 💡 Common Use Cases

### For Store Owners
1. **Adding a New Product**
   - Login to admin dashboard
   - Navigate to Products → Add New
   - Fill in product details, upload image
   - Set price, stock, and category
   - Save and publish

2. **Processing an Order**
   - View pending orders in admin dashboard
   - Verify payment proof (if submitted)
   - Update order status to "Processing" or "Completed"
   - Customer receives email notification

3. **Managing Inventory**
   - View all products with stock levels
   - Update stock quantities as needed
   - Set products as active/inactive

### For Developers
1. **Adding a New API Endpoint**
   - Create route file in `app/api/[endpoint]/route.ts`
   - Implement GET/POST/PUT/DELETE handlers
   - Add authentication if needed
   - Test with Postman or similar tool

2. **Creating a New Page**
   - Create folder in `app/[page-name]/`
   - Add `page.tsx` with your component
   - Add `layout.tsx` if custom layout needed
   - Update navigation if needed

3. **Adding a New Component**
   - Create component in `components/`
   - Use TypeScript for type safety
   - Style with Tailwind CSS
   - Export and use in pages

## ❓ Frequently Asked Questions (FAQ)

### General Questions

**Q: Can I use this for physical products?**  
A: Yes, but the current implementation is optimized for virtual/digital products. You may need to modify shipping logic.

**Q: Does this support multiple stores?**  
A: Currently, it's designed for a single store. Multi-store support would require significant modifications.

**Q: Can I customize the theme?**  
A: Yes, modify Tailwind CSS classes in components and update `tailwind.config.js` for custom colors.

**Q: Is this production-ready?**  
A: Yes, but ensure you:
- Set up proper backups
- Configure production environment variables
- Set up monitoring
- Test all payment flows
- Review security settings

### Technical Questions

**Q: How do I change the database?**  
A: Update environment variables or `config/database.js`. Run migrations if schema changes are needed.

**Q: Can I use PostgreSQL instead of MySQL?**  
A: The current implementation uses MySQL-specific features. Migration would require code changes.

**Q: How do I add more payment methods?**  
A: Extend the payment settings in admin dashboard and add corresponding API endpoints.

**Q: How do I customize email templates?**  
A: Email templates are in the admin dashboard under Email Settings, or modify the email sending code in API routes.

### Troubleshooting

**Q: Build fails with database errors**  
A: This is normal during build. Database operations are skipped during static generation. Ensure database is available at runtime.

**Q: Images not loading**  
A: Check file paths in `public/` directory and ensure Next.js image optimization is configured correctly.

**Q: Email not sending**  
A: Verify SMTP credentials, check spam folder, and test SMTP connection via admin dashboard.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Support

For support, please contact:
- **Discord**: [Join our Discord server](https://discord.gg/sugarbunny)
- **Website**: [https://store.sugarbunny.xyz/](https://store.sugarbunny.xyz/)

## 🎯 Best Practices

### Code Quality
- Use TypeScript for all new files
- Follow Next.js App Router conventions
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic

### Security
- Never commit `.env.local` or sensitive data
- Use environment variables for all secrets
- Validate all user inputs
- Use parameterized queries (already implemented)
- Regularly update dependencies

### Performance
- Optimize images before uploading
- Use Next.js Image component
- Implement proper caching strategies
- Monitor database query performance
- Use pagination for large datasets

### Maintenance
- Keep dependencies updated
- Regular database backups
- Monitor error logs
- Review and update security settings
- Test before deploying updates

## 📝 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [MySQL](https://www.mysql.com/)
- Icons and UI inspiration from the community

---

**Built with ❤️ by Sugarbunny Stores**

*Last updated: 2024*
