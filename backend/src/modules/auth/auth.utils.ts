import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { env } from '@/config/env';

// Hash password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

// Compare password with hash
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Generate random token for password reset
export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate token expiry (1 hour from now)
export const generateTokenExpiry = (): Date => {
  return new Date(Date.now() + 60 * 60 * 1000); // 1 hour
};

// Generate JWT tokens
export const generateTokens = (userId: string, role: string) => {
  const accessToken = generateAccessToken(userId, role);
  const refreshToken = generateRefreshToken(userId);
  
  return {
    accessToken,
    refreshToken
  };
};

// Generate access token
const generateAccessToken = (userId: string, role: string): string => {
  return jwt.sign(
    { userId, role },
    env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '15m' }
  );
};

// Generate refresh token
const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '7d' }
  );
};

// Verify access token
export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET!);
  } catch (error) {
    return null;
  }
};

// Verify refresh token
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    return null;
  }
};

// Import jwt for token generation
import * as jwt from 'jsonwebtoken';
