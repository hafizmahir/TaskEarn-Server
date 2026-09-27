/**
 * MongoDB Atlas Connection Configuration
 * Database: TaskEarn
 * Collections: users, tasks, submissions, payments, withdrawals, notifications
 */

export const MONGODB_CONFIG = {
  username: process.env.MONGODB_USERNAME || 'TaskEarn',
  password: process.env.MONGODB_PASSWORD || 'AIeGL7CRo38YzbIr',
  uri:
    process.env.MONGODB_URI ||
    'mongodb+srv://TaskEarn:AIeGL7CRo38YzbIr@cluster0.owqcpnx.mongodb.net/taskearn?retryWrites=true&w=majority&appName=Cluster0',
  collections: [
    'users',
    'tasks',
    'submissions',
    'payments',
    'withdrawals',
    'notifications',
  ],
};

export function getDatabaseStatus() {
  return {
    database: 'taskearn',
    cluster: 'cluster0.owqcpnx.mongodb.net',
    user: MONGODB_CONFIG.username,
    connected: true,
    collections: MONGODB_CONFIG.collections,
    authMechanism: 'SCRAM-SHA-256',
  };
}
