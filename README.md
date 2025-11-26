# 🛍️ Sugarbunny Stores

A modern, full-featured e-commerce webshop built with Next.js, React, and TypeScript. This platform provides a complete solution for selling virtual products and services with secure payment processing and comprehensive admin management.

🌐 **Live Site:** [https://store.sugarbunny.xyz/](https://store.sugarbunny.xyz/)

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)

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
- **MySQL2** - Database driver
- **bcryptjs** - Password hashing
- **Nodemailer** - Email functionality

### Payment & Services
- **Stripe** - Payment processing (optional)
- **Vercel Analytics** - Analytics integration

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **MySQL** 8.0 or higher
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
   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=sugarbunny_stores
   
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

4. **Set up the database**
   
   Option A: Using the setup script (recommended)
   ```bash
   npm run setup-db
   ```
   
   Option B: Manual setup
   - Create a MySQL database
   - Import the schema from `sql/schema.sql` using phpMyAdmin or MySQL command line

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

The application uses MySQL for data storage. You can configure the database connection in two ways:

1. **Using Environment Variables** (Recommended)
   - Set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in `.env.local`

2. **Using Config File**
   - Copy `config/database.example.js` to `config/database.js`
   - Update the connection details

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
4. **Set up MySQL database**
   - Use Vercel Postgres, PlanetScale, or any MySQL-compatible service
   - Update `DB_HOST` and connection details
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
- Verify database credentials in `.env.local`
- Ensure MySQL server is running
- Check firewall settings if using remote database
- Run `npm run check-env` to verify configuration

### Build Errors
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check Node.js version: `node --version` (should be 18+)
- Verify all dependencies are installed: `npm install`

### Email Not Sending
- Verify SMTP credentials in environment variables
- Check spam folder
- Test SMTP connection using admin dashboard
- For Gmail, use App Password instead of regular password

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Support

For support, please contact:
- **Discord**: [Join our Discord server](https://discord.gg/sugarbunny)
- **Website**: [https://store.sugarbunny.xyz/](https://store.sugarbunny.xyz/)

## 📝 License

This project is private and proprietary. All rights reserved.

---

**Built with ❤️ by Sugarbunny Stores**
