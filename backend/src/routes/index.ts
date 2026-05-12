import { Router, Request, Response } from 'express';
import { createAuthRoutes } from '@/modules/auth';
import { AuthService } from '@/modules/auth';
import { AuthController } from '@/modules/auth';
import { prisma } from '@/config/database';

// Initialize services
const authService = new AuthService(prisma);

// Initialize controllers
const authController = new AuthController(authService);

// Create router
const router = Router();

// Health check route
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use('/auth', createAuthRoutes(authController));

// TODO: Add other module routes
// router.use('/users', createUserRoutes());
// router.use('/chalets', createChaletRoutes());
// router.use('/bookings', createBookingRoutes());
// router.use('/amenities', createAmenityRoutes());
// router.use('/calendar', createCalendarRoutes());
// router.use('/payments', createPaymentRoutes());

export default router;
