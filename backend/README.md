# Chalet Booking Platform - Backend

A scalable, enterprise-level backend architecture for a Chalet Booking Platform built with Node.js, Express.js, PostgreSQL, and Prisma ORM.

## 🏗️ Architecture Overview

This backend follows a clean, modular architecture with separation of concerns:

```
backend/
│
├── prisma/
│   └── schema.prisma              # Database schema and configuration
│
├── src/
│   ├── config/                    # Configuration files
│   │   ├── env.ts                 # Environment variables
│   │   └── database.ts            # Database connection
│   │
│   ├── modules/                   # Feature modules
│   │   ├── auth/                  # Authentication module
│   │   ├── users/                 # User management
│   │   ├── chalets/               # Chalet management
│   │   ├── bookings/              # Booking management
│   │   ├── amenities/             # Amenities management
│   │   ├── calendar/              # Calendar management
│   │   └── payments/              # Payment processing
│   │
│   ├── routes/                    # Centralized routing
│   │   └── index.ts               # Main routes file
│   │
│   ├── middlewares/               # Custom middlewares
│   │   ├── protect.middleware.ts  # Authentication middleware
│   │   ├── checkRole.middleware.ts # Role-based authorization
│   │   └── validate.middleware.ts  # Request validation
│   │
│   ├── lib/                       # External service integrations
│   │   └── cloudinary.ts          # Cloudinary image upload
│   │
│   ├── utils/                     # Utility functions
│   │   ├── asyncHandler.ts        # Async error handler
│   │   ├── ApiError.ts            # Custom error class
│   │   └── ApiResponse.ts          # Standardized response
│   │
│   ├── types/                     # TypeScript type definitions
│   ├── constants/                 # Application constants
│   ├── app.ts                     # Express app configuration
│   └── server.ts                  # Server startup
│
├── .env                           # Environment variables
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🚀 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Features

### Authentication Module
- User registration and login
- JWT-based authentication
- Password reset functionality
- Role-based authorization
- Token refresh mechanism

### Core Modules (Templates)
- **Users**: Profile management, user administration
- **Chalets**: Property listings, search, filters
- **Bookings**: Reservation management, availability
- **Amenities**: Chalet amenities management
- **Calendar**: Availability calendar
- **Payments**: Payment processing integration

### Infrastructure
- Centralized error handling
- Request validation
- Rate limiting
- CORS configuration
- Security headers
- Graceful shutdown
- Environment-based configuration

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- Cloudinary account (for image uploads)

### 1. Clone and Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy the `.env` file and update the variables:
```bash
cp .env.example .env
```

Update the following variables in `.env`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/chalate_db?schema=public"

# JWT Secrets (generate strong secrets)
ACCESS_TOKEN_SECRET="your-super-secret-access-token-key"
REFRESH_TOKEN_SECRET="your-super-secret-refresh-token-key"
RESET_TOKEN_SECRET="your-super-secret-reset-token-key"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) View database in Prisma Studio
npm run db:studio
```

### 4. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Health Check
- `GET /api/health` - Server health check

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🏛️ Module Structure

Each module follows this consistent structure:

```
module-name/
├── module-name.controller.ts    # Route handlers
├── module-name.service.ts        # Business logic
├── module-name.schema.ts         # Validation schemas
├── module-name.routes.ts         # Route definitions
├── module-name.types.ts          # TypeScript interfaces
└── index.ts                      # Module exports
```

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Role-based access control (USER, MANAGER, ADMIN)
- Request rate limiting
- Input validation and sanitization
- Security headers with Helmet
- CORS configuration
- Password hashing with bcryptjs

## 🚀 Production Deployment

1. **Environment Setup**
   - Set `NODE_ENV=production`
   - Configure production database URL
   - Set up production Cloudinary credentials

2. **Build**
   ```bash
   npm run build
   ```

3. **Database Migration**
   ```bash
   npm run db:migrate
   ```

4. **Start Server**
   ```bash
   npm start
   ```

## 📝 Next Steps

The architecture is set up and ready for implementation. Next steps include:

1. **Implement Business Logic**: Add actual functionality to each module
2. **API Documentation**: Set up Swagger/OpenAPI documentation
3. **Testing**: Add unit and integration tests
4. **Monitoring**: Add logging and monitoring
5. **CI/CD**: Set up deployment pipelines

## 🤝 Contributing

1. Follow the established module structure
2. Use TypeScript strictly
3. Add proper error handling
4. Include input validation
5. Write clean, documented code

## 📄 License

This project is licensed under the MIT License.
