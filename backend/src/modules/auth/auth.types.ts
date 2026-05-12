// User registration data
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// User login data
export interface LoginData {
  email: string;
  password: string;
}

// Change password data
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// Forgot password data
export interface ForgotPasswordData {
  email: string;
}

// Reset password data
export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

// Refresh token data
export interface RefreshTokenData {
  refreshToken: string;
}

// Login response
export interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Refresh token response
export interface RefreshTokenResponse {
  accessToken: string;
}

// JWT payload
export interface JWTPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}
