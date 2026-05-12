import { Response } from 'express';

export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Send error response
  public send(res: Response): void {
    res.status(this.statusCode).json({
      success: false,
      message: this.message,
      ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
    });
  }
}
