import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface EnvConfig {
  // Server
  PORT: number;
  NODE_ENV: string;

  // Database
  DATABASE_URL: string;

  // JWT
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  RESET_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;

  // CORS
  CORS_ORIGIN: string;

  // Email
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  APP_NAME: string;
  FRONTEND_URL: string;
}

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  DATABASE_URL: process.env.DATABASE_URL || '',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
  RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET || '',
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '7d',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',

  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',

  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  APP_NAME: process.env.APP_NAME || 'Chalet System',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};

// Validate required environment variables
export const validateEnv = (): void => {
  const requiredVars = [
    'DATABASE_URL',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'RESET_TOKEN_SECRET'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};
