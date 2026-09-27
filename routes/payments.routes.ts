import { Router, Request, Response } from 'express';

const router = Router();

// Stripe Payment creation / Intent confirmation
router.post('/create-intent', (req: Request, res: Response) => {
  const { package_id, coins, price_usd } = req.body;

  const paymentRecord = {
    id: `pay-${Date.now()}`,
    coins,
    amount_usd: price_usd,
    transaction_id: `ch_stripe_${Date.now()}`,
    status: 'completed',
    date: new Date().toISOString(),
  };

  return res.json({ success: true, payment: paymentRecord, clientSecret: `pi_test_${Date.now()}_secret` });
});

export default router;
