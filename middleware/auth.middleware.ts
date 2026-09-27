import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'worker' | 'buyer' | 'admin';
    name: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If token is missing, continue or handle
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    // Simulated token validation or JWT decode
    // Token structure: jwt_<role>_<id>_<timestamp> or custom
    req.user = {
      id: 'user-token-id',
      email: 'user@taskearn.com',
      role: token.includes('admin') ? 'admin' : token.includes('buyer') ? 'buyer' : 'worker',
      name: 'Authenticated User',
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (allowedRoles: Array<'worker' | 'buyer' | 'admin'>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role permissions' });
    }
    next();
  };
};
