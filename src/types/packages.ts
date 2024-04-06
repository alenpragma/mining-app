export interface IPackage {
  created_at: string;
  daily_token: string;
  duration: string;
  hashpower: string;
  id: number;
  image: string | null;
  is_deleted: string;
  package_name: string;
  package_price: string;
  status: string;
  updated_at: string;
}

export interface IPackageDetails {
  details: IPackage | any;
  closeModal: () => void;
}
