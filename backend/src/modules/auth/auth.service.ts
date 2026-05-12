import { PrismaClient } from '@prisma/client';
import { ApiError } from '@/utils/ApiError';
import {
  hashPassword,
  comparePassword,
  generateResetToken,
  generateTokenExpiry,
  generateTokens,
  verifyRefreshToken
} from './auth.utils';
// import { sendResetPasswordEmail } from '@/lib/mailer'; // Temporarily disabled

export class AuthService {
  constructor(private prisma: PrismaClient) { }

  // Register new user
  async register(userData: {
    fullName?: string | null;
    email: string;
    password: string;
    image?: string | null;
  }) {
    const { fullName, email, password, image } = userData;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        fullName: fullName || '',
        email,
        password: hashedPassword,
        image: image || null
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user;
  }

  // Login user
  async login(loginData: { email: string; password: string }) {
    const { email, password } = loginData;

    console.log('🔍 [AUTH] Login attempt for email:', email);
    console.log('🔍 [AUTH] Password length:', password.length);

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    console.log('🔍 [AUTH] User found:', !!user);
    if (user) {
      console.log('🔍 [AUTH] User ID:', user.id);
      console.log('🔍 [AUTH] Stored password hash exists:', !!user.password);
    }

    if (!user) {
      console.log('❌ [AUTH] Login failed: User not found');
      throw new ApiError(401, 'Invalid credentials');
    }

    // Compare password
    console.log('🔍 [AUTH] Comparing passwords...');
    const isPasswordValid = await comparePassword(password, user.password);
    console.log('🔍 [AUTH] Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ [AUTH] Login failed: Invalid password');
      throw new ApiError(401, 'Invalid credentials');
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    // Return user data and tokens
    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        role: user.role
      },
      accessToken,
      refreshToken
    };
  }

  // Logout user (stateless - frontend removes token)
  async logout(_logoutData: any) {
    // Stateless JWT logout - frontend handles token removal
    // Optional: Implement token blacklisting if needed
    return { message: 'Logged out successfully' };
  }

  // Refresh access token
  async refreshToken(refreshData: { refreshToken: string }) {
    const { refreshToken } = refreshData;

    try {
      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken) as any;

      if (!decoded || !decoded.userId) {
        throw new ApiError(401, 'Invalid refresh token');
      }

      // Find user
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        throw new ApiError(401, 'User not found');
      }

      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id, user.role);

      return {
        accessToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      throw new ApiError(401, 'Invalid refresh token');
    }
  }

  // Forgot password
  async forgotPassword(forgotPasswordData: { email: string }) {
    const { email } = forgotPasswordData;

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    // Always return success message to prevent email enumeration
    if (!user) {
      return { message: 'If an account with this email exists, a password reset link has been sent' };
    }

    // Generate reset token and expiry
    const resetToken = generateResetToken();
    const resetTokenExpiry = generateTokenExpiry();

    // Save reset token to database
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    // Send reset email (temporarily disabled)
    try {
      // await sendResetPasswordEmail(email, resetToken);
      console.log('Email service temporarily disabled. Reset token:', resetToken);
    } catch (error) {
      // Log error but don't throw to prevent exposing email existence
      console.error('Failed to send reset email:', error);
    }

    return { message: 'If an account with this email exists, a password reset link has been sent' };
  }

  // Reset password
  async resetPassword(resetData: { token: string; newPassword: string }) {
    const { token, newPassword } = resetData;

    // Find user with valid reset token
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      throw new ApiError(400, 'Invalid or expired token');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear reset token
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return { message: 'Password reset successfully' };
  }

  // Change password
  async changePassword(userId: string, changePasswordData: {
    currentPassword: string;
    newPassword: string
  }) {
    const { currentPassword, newPassword } = changePasswordData;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      throw new ApiError(400, 'Invalid current password');
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword
      }
    });

    return { message: 'Password changed successfully' };
  }
}
