import { Request, Response, NextFunction } from 'express';

// API Request Logger Middleware (Morgan-like)
export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Log request start
  console.log(`🚀 [API] ${timestamp} - ${req.method} ${req.originalUrl}`);
  console.log(`📥 [API] Headers:`, JSON.stringify(req.headers, null, 2));
  console.log(`📥 [API] Body:`, req.body ? JSON.stringify(req.body, null, 2) : 'No body');
  console.log(`📥 [API] Query:`, JSON.stringify(req.query, null, 2));
  console.log(`📥 [API] Params:`, JSON.stringify(req.params, null, 2));

  // Capture original res.end to log response
  const originalEnd = res.end;
  (res as any).end = function (this: Response, chunk?: any, encoding?: any, cb?: any): Response {
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`📤 [API] Response Status: ${res.statusCode}`);
    console.log(`📤 [API] Response Headers:`, JSON.stringify(res.getHeaders(), null, 2));
    console.log(`⏱️  [API] Duration: ${duration}ms`);
    console.log(`✅ [API] ${timestamp} - ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    console.log('─'.repeat(80));

    return originalEnd.call(this, chunk, encoding, cb);
  };

  next();
};

