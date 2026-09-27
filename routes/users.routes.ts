import { Router, Request, Response } from 'express';

const router = Router();

// Update user role
router.patch('/:id/role', (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['worker', 'buyer', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  return res.json({ success: true, message: `Role updated to ${role} for user ${id}` });
});

// Remove user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({ success: true, message: `User ${id} removed from database` });
});

export default router;
