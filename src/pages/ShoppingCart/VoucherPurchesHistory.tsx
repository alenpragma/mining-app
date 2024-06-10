import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';

const VoucherPurchesHistory = () => {
  const [vouchers, setVouchers] = useState<[]>();

  const fetchData = async () => {
    const response = await axiosInstance.get('/vouchers');
    setVouchers(response?.data[0]);
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Purches History" />
      <div>Hello world</div>
    </DefaultLayout>
  );
};

export default VoucherPurchesHistory;
