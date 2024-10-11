export type ITransaction = {
  id: number;
  user_id: number;
  received_by: number | null;
  received_from: number;
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
