import express from 'express';
import authRoutes from './routes/auth.routes';
import tasksRoutes from './routes/tasks.routes';
import submissionsRoutes from './routes/submissions.routes';
import withdrawalsRoutes from './routes/withdrawals.routes';
import paymentsRoutes from './routes/payments.routes';
import usersRoutes from './routes/users.routes';
import reportsRoutes from './routes/reports.routes';
import emailsRoutes from './routes/emails.routes';
import { getDatabaseStatus } from './config/db';

const app = express();
app.use(express.json());

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/withdrawals', withdrawalsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/emails', emailsRoutes);

app.get('/api/database/status', (req, res) => {
  res.json(getDatabaseStatus());
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TaskEarn API Server',
    database: 'MongoDB Atlas (Connected)',
    timestamp: new Date().toISOString(),
  });
});

export default app;
