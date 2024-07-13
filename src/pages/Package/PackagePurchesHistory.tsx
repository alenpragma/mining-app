import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PackagePurchesHistorys from '../../components/PackagePurchesHistory/PackagePurchesHistorys';

export type IPackagePurchesHistory = {
  a2i_token: 'string';
  availibility: 'string';
  created_at: 'string';
  daily_token: 'string';
  date: 'string';
  duration: 'string';
  email: 'string';
  hashpower: 'string';
  id: number;
  image: 'string';
  is_deleted: 'string';
  name: 'string';
  package_name: 'string';
  package_price: 'string';
  status: 'string';
  updated_at: 'string';
};

const PackagePurchesHistory = () => {
  return (
    <>
      <Breadcrumb pageName="Package Historys" />
      <PackagePurchesHistorys />
    </>
  );
};

export default PackagePurchesHistory;
