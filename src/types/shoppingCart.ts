type IStatus =
  | {
      label: string;
      value: string;
    }
  | any;

export type IShopingCart = {
  name: string;
  amount: string;
  validations: string;
  adminCharge: string;
  status: string | IStatus;
  id?: number;
  created_at?: string;
  updated_at?: string;
};
