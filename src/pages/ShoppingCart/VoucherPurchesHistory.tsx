import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import Skeleton from 'react-loading-skeleton';
import { getPasDay } from '../Purchase/dateToDay';

type ttt = {
  id: number;
  date: 'string';
  name: 'string';
  email: 'string';
  package_name: 'string';
  package_price: 'string';
  daily_token: 'string';
  a2i_token: 'string';
  duration: 'string';
  hashpower: 'string';
  status: 'string';
  image: 'string';
  is_deleted: 'string';
  created_at: 'string';
  updated_at: 'string';
  availibility: 'string';
};

const VoucherPurchesHistory = () => {
  const [purchesHistorys, setPurchesHistorys] = useState<any>([{}, {}]);

  const fetchData = async () => {
    const response = await axiosInstance.get('/admin/package-purchase-history');
    setPurchesHistorys(response?.data?.purchase_history);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Voucher Purches History" />

      <div className="max-w-full overflow-x-auto">
        {purchesHistorys.length == 0 ? (
          <div>
            <Skeleton height={40} count={6} />
          </div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  SL NO
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Email
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Daily Token
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Received
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Remaining
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {purchesHistorys?.map((purchaseHistory: any, key: any) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {purchaseHistory?.date}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {purchaseHistory?.email}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {purchaseHistory.package_name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {purchaseHistory.package_price}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {Number(purchaseHistory.daily_token)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {getPasDay(purchaseHistory?.date)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {purchaseHistory?.duration -
                        getPasDay(purchaseHistory?.date)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {purchaseHistory.status == 1 ? 'Running' : 'Expired'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DefaultLayout>
  );
};

export default VoucherPurchesHistory;
