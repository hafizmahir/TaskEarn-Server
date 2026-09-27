import { Router, Request, Response } from 'express';

const router = Router();

// Worker request withdrawal
router.post('/request', (req: Request, res: Response) => {
  const { coin, payment_system, account_number, user_coins } = req.body;

  if (Number(coin) < 200) {
    return res.status(400).json({ error: 'Minimum withdrawal requirement is 200 coins ($10.00 USD)' });
  }

  if (user_coins !== undefined && Number(coin) > user_coins) {
    return res.status(400).json({ error: 'Insufficient coin balance' });
  }

  const usdAmount = Number((Number(coin) / 20).toFixed(2));

  const withdrawal = {
    id: `with-${Date.now()}`,
    withdrawal_coin: Number(coin),
    withdrawal_amount: usdAmount,
    payment_system,
    account_number,
    withdraw_date: new Date().toISOString(),
    status: 'pending',
  };

  return res.status(201).json({ success: true, withdrawal });
});

// Admin Payment Success button
router.patch('/approve/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({ success: true, message: 'Withdrawal marked approved and paid via payment system', id });
});

export default router;
