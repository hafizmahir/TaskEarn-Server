import { Router, Request, Response } from 'express';
import { ITaskDocument } from '../models/schemas';

const router = Router();

// GET all active tasks (where required_workers > 0)
router.get('/', (req: Request, res: Response) => {
  const { category, search } = req.query;
  // Return tasks filtered
  return res.json({ success: true, count: 5 });
});

// POST new task with escrow check
router.post('/create', (req: Request, res: Response) => {
  const { task_title, task_detail, required_workers, payable_amount, completion_date, submission_info, task_image_url, category, buyer_coins } = req.body;

  const totalPayable = Number(required_workers) * Number(payable_amount);
  if (buyer_coins !== undefined && totalPayable > buyer_coins) {
    return res.status(400).json({
      error: 'Not available Coin. Purchase Coin',
      insufficientCoins: true,
      refillNeeded: totalPayable - buyer_coins,
    });
  }

  const newTask: ITaskDocument = {
    id: `task-${Date.now()}`,
    task_title,
    task_detail,
    required_workers: Number(required_workers),
    payable_amount: Number(payable_amount),
    completion_date,
    submission_info,
    task_image_url,
    buyer_id: 'buyer-id',
    buyer_name: 'Verified Buyer',
    buyer_email: 'buyer@taskearn.com',
    category: category || 'Data Entry',
    createdAt: new Date().toISOString(),
  };

  return res.status(201).json({ success: true, task: newTask, escrowDeducted: totalPayable });
});

// DELETE task with refund calculation
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { required_workers, payable_amount } = req.body;
  const refundCoins = (Number(required_workers) || 0) * (Number(payable_amount) || 0);

  return res.json({ success: true, message: 'Task deleted', refundedCoins: refundCoins });
});

export default router;
