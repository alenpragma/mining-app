import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPurchaseHistory } from '../../types/purchesHistory';
import SearchInput from '../../components/SearchInput';
import Skeleton from 'react-loading-skeleton';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { userToken } from '../../hooks/getTokenFromstorage';
import { getPasDay } from './dateToDay';
import TableRow from '../../components/TableRow';

const PurchaseHistory = () => {
  const [search, setSearch] = useState('');
  const [purchaseHistorys, setPurchaseHistorys] = useState<IPurchaseHistory[]>(
    [],
  );

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);

  const from = currentPage * perPage;
  const to = from + perPage;
  //  pagination end

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://mining.bizex.io/api/admin/package-purchase-history',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setPurchaseHistorys(response?.data?.purchase_history);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPurchaseHistorys = purchaseHistorys?.filter(
    (purchaseHistory) =>
      purchaseHistory?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Package Purchase History" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full w-100 mb-4">
          <SearchInput placeholder="Search..." setSearch={setSearch} />
        </div>
        <div className="max-w-full overflow-x-auto">
          {purchaseHistorys.length == 0 ? (
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
                    Email
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Package Name
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
                {filteredPurchaseHistorys
                  ?.slice(from, to)
                  ?.map((purchaseHistory: any, key: any) => (
                    <tr key={key}>
                      <TableRow data={key + 1} />
                      <TableRow data={purchaseHistory?.date} />
                      <TableRow data={purchaseHistory?.email} />
                      <TableRow data={purchaseHistory?.package_name} />
                      <TableRow data={purchaseHistory?.package_price} />
                      <TableRow data={purchaseHistory?.daily_token} />
                      <TableRow data={getPasDay(purchaseHistory?.date)} />
                      <TableRow
                        data={
                          purchaseHistory?.duration -
                          getPasDay(purchaseHistory?.date)
                        }
                      />
                      <TableRow
                        data={
                          purchaseHistory.status == 1 ? 'Running' : 'Expired'
                        }
                      />
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="my-4">
          <PaginationButtons
            totalPages={Math.ceil(filteredPurchaseHistorys.length / perPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PurchaseHistory;
