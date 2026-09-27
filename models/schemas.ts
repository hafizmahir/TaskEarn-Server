/**
 * TaskEarn Server-Side Database Schemas (Mongoose / MongoDB Architecture)
 */

export interface IUserDocument {
  id: string;
  name: string;
  email: string;
  role: 'worker' | 'buyer' | 'admin';
  coins: number;
  photoURL?: string;
  phone?: string;
  nid?: string;
  passwordHash?: string;
  createdAt: string;
}

export interface ITaskDocument {
  id: string;
  task_title: string;
  task_detail: string;
  required_workers: number;
  payable_amount: number;
  completion_date: string;
  submission_info: string;
  task_image_url: string;
  buyer_id: string;
  buyer_name: string;
  buyer_email: string;
  category: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  createdAt: string;
}

export interface ISubmissionDocument {
  id: string;
  task_id: string;
  task_title: string;
  payable_amount: number;
  worker_id: string;
  worker_name: string;
  worker_email: string;
  buyer_name: string;
  buyer_email: string;
  submission_details: string;
  submission_date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface IWithdrawalDocument {
  id: string;
  worker_id: string;
  worker_name: string;
  worker_email: string;
  withdrawal_coin: number;
  withdrawal_amount: number;
  payment_system: 'Stripe' | 'bKash' | 'Nagad' | 'Rocket';
  account_number: string;
  withdraw_date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface IPaymentDocument {
  id: string;
  buyer_id: string;
  buyer_name: string;
  buyer_email: string;
  coins: number;
  amount_usd: number;
  transaction_id: string;
  payment_method: string;
  date: string;
  status: 'completed' | 'refunded';
}

export interface INotificationDocument {
  id: string;
  message: string;
  toEmail: string;
  actionRoute: string;
  time: string;
  read: boolean;
  type?: string;
}
