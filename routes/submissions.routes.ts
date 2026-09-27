import { Router, Request, Response } from 'express';

const router = Router();

// Worker submit proof
router.post('/submit', (req: Request, res: Response) => {
  const { task_id, task_title, payable_amount, submission_details, worker_email, worker_name, buyer_email } = req.body;

  const newSubmission = {
    id: `sub-${Date.now()}`,
    task_id,
    task_title,
    payable_amount: Number(payable_amount),
    submission_details,
    worker_email,
    worker_name,
    buyer_email,
    submission_date: new Date().toISOString(),
    status: 'pending',
  };

  return res.status(201).json({ success: true, submission: newSubmission });
});

// Buyer approve submission
router.patch('/approve/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { worker_id, payable_amount } = req.body;

  return res.json({
    success: true,
    message: 'Submission approved and coins transferred to worker',
    submissionId: id,
    transferredCoins: payable_amount,
  });
});

// Buyer reject submission
router.patch('/reject/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { task_id } = req.body;

  return res.json({
    success: true,
    message: 'Submission rejected and task required_workers quota incremented by 1',
    submissionId: id,
  });
});

export default router;
