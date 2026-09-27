import { Router, Request, Response } from 'express';

const router = Router();

// Dispatch automated email via SendGrid / AWS SES simulation
router.post('/dispatch', (req: Request, res: Response) => {
  const { to_email, recipient_name, subject, body, category } = req.body;

  if (!to_email || !subject) {
    return res.status(400).json({ error: 'to_email and subject are required' });
  }

  const emailLog = {
    id: `email-${Date.now()}`,
    to_email,
    recipient_name: recipient_name || 'Valued User',
    subject,
    body,
    sent_at: new Date().toISOString(),
    provider: 'SendGrid' as const,
    category: category || 'approval',
  };

  return res.status(200).json({
    success: true,
    message: `Automated email successfully dispatched to ${to_email} via SendGrid/AWS SES.`,
    emailLog,
  });
});

export default router;
