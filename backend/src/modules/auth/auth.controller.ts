import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { asyncHandler } from '@/utils/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';

export class AuthController {
  constructor(private authService: AuthService) { }

  // Register new user
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, result, 'User registered successfully'));
  });

  // Login user
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'User logged in successfully'));
  });

  // Logout user
  logout = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.logout(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'User logged out successfully'));
  });

  // Refresh access token
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.refreshToken(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Token refreshed successfully'));
  });

  // Change password
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user?.id) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, 'User not authenticated'));
    }

    const result = await this.authService.changePassword(req.user.id, req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Password changed successfully'));
  });

  // Forgot password
  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.forgotPassword(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Password reset email sent'));
  });

  // Reset password
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.resetPassword(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Password reset successfully'));
  });
}
