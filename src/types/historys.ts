export type IResponse<T> = {
  total: number | any;
  data: T[];
};

export type ITransaction = {
  id: number;
  user_id: number;
  received_by: string | null;
  received_from: string | null;
  amount: number;
  type: 'Debit' | 'Credit';
  status: 'approved' | 'pending' | 'rejected';
  txn_id: string;
  method: string;
  wallet_id: number | null;
  description: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string | null;
};

export type IPackageMining = {
  date: string;
  user_id: number;
  total_amount: number;
  previous_day_minings_count: number;
  previous_day_purchases_count: number;
  transaction_count: number;
  name: string;
  phone: string;
  email: string;
};
