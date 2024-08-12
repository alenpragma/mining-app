type IStatus =
  | {
      label: string;
      value: string;
    }
  | any;

export type IStaking = {
  staking_name: string;
  min_staking: string;
  max_staking: string;
  duration: string;
  apy: string;
  monthly_roi: string;
  unstake_status: string;
  unstake_charge: string;
  package_price: string;
  status: string | IStatus;
  id?: number;
  created_at?: string;
  updated_at?: string;
};

// export interface IPackageDetails {
//   details: IPackage | any;
//   closeModal: () => void;
// }
