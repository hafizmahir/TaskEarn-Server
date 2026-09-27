import { Router, Request, Response } from 'express';

const router = Router();

// File a report on an invalid submission
router.post('/file', (req: Request, res: Response) => {
  const { submission_id, task_id, task_title, reporter_email, reporter_name, worker_email, worker_name, violation_type, reason_notes } = req.body;

  if (!submission_id || !violation_type || !reason_notes) {
    return res.status(400).json({ error: 'Missing required report fields' });
  }

  const newReport = {
    id: `rep-${Date.now()}`,
    submission_id,
    task_id,
    task_title,
    reporter_email,
    reporter_name,
    worker_email,
    worker_name,
    violation_type,
    reason_notes,
    reported_at: new Date().toISOString(),
    status: 'pending',
  };

  return res.status(201).json({ success: true, report: newReport });
});

// Admin resolve report
router.patch('/resolve/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { action, resolution_notes } = req.body;

  return res.json({
    success: true,
    message: `Report ${id} resolved with action: ${action}`,
    admin_action: action,
  });
});

export default router;
