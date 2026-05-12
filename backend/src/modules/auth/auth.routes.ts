import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '@/middlewares/validate.middleware';
import { protect } from '@/middlewares/protect.middleware';
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema
} from './auth.schema';

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  // Public routes
  router.post('/register', validateRequest(registerSchema), authController.register);
  router.post('/login', validateRequest(loginSchema), authController.login);
  router.post('/forgot-password', validateRequest(forgotPasswordSchema), authController.forgotPassword);
  router.post('/reset-password', validateRequest(resetPasswordSchema), authController.resetPassword);
  router.post('/refresh-token', validateRequest(refreshTokenSchema), authController.refreshToken);

  // Protected routes
  router.use(protect); // All routes below this require authentication
  router.post('/logout', authController.logout);
  router.post('/change-password', validateRequest(changePasswordSchema), authController.changePassword);

  return router;
}
