import { Router, Request, Response } from 'express';
import { IUserDocument } from '../models/schemas';

const router = Router();

// Registration endpoint: Worker gets 10 coins bonus, Buyer gets 50 coins bonus
router.post('/register', (req: Request, res: Response) => {
  const { name, email, role, password, photoURL, phone, nid } = req.body;

  if (!email || !name || !role) {
    return res.status(400).json({ error: 'Name, email, and role are required' });
  }

  // Bonus allocation logic
  const initialCoins = role === 'buyer' ? 50 : 10;

  const newUser: IUserDocument = {
    id: `user-${Date.now()}`,
    name,
    email: email.toLowerCase().trim(),
    role: role === 'buyer' ? 'buyer' : role === 'admin' ? 'admin' : 'worker',
    coins: initialCoins,
    photoURL: photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    phone,
    nid,
    createdAt: new Date().toISOString(),
  };

  const token = `jwt_token_${newUser.role}_${newUser.id}_${Date.now()}`;
  return res.status(201).json({ user: newUser, token });
});

// Login endpoint
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const role = cleanEmail.includes('admin')
    ? 'admin'
    : cleanEmail.includes('buyer')
    ? 'buyer'
    : 'worker';

  const user: IUserDocument = {
    id: `user-${role}-id`,
    name: role === 'admin' ? 'Admin Supervisor' : role === 'buyer' ? 'Rahman Ltd' : 'Rifat Ahmed',
    email: cleanEmail,
    role,
    coins: role === 'admin' ? 15400 : role === 'buyer' ? 5200 : 2450,
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00Z',
  };

  const token = `jwt_token_${role}_${user.id}_${Date.now()}`;
  return res.json({ user, token });
});

export default router;
