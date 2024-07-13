import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPurchaseHistory } from '../../types/purchesHistory';
import SearchInput from '../../components/SearchInput';
import Skeleton from 'react-loading-skeleton';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { getPasDay } from './dateToDay';
import TableRow from '../../components/TableRow';
import TableHead from '../../components/TableHead';
import axiosInstance from '../../utils/axiosConfig';

const PurchaseHistory = () => {
  const [search, setSearch] = useState('');
  const [purchaseHistorys, setPurchaseHistorys] = useState<IPurchaseHistory[]>(
    [],
  );
  const [total, setTotal] = useState(0);

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(20);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/package-purchase-history?per_page=${perPage}&page=${
          currentPage + 1
        }`,
      );
      setPurchaseHistorys(response?.data?.purchase_history?.data);
      setTotal(response?.data?.purchase_history?.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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
                  <TableHead data="Sl NO" />
                  <TableHead data="Date" />
                  <TableHead data="Email" />
                  <TableHead data="Package Name" />
                  <TableHead data="Price" />
                  <TableHead data="Daily Token" />
                  <TableHead data="Received" />
                  <TableHead data="Remaining" />
                  <TableHead data="Status" />
                </tr>
              </thead>
              <tbody>
                {purchaseHistorys?.map((purchaseHistory: any, key: any) => (
                  <tr key={key}>
                    <TableRow data={currentPage * perPage + Number(key) + 1} />
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
                      data={purchaseHistory.status == 1 ? 'Running' : 'Expired'}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="my-4">
          <PaginationButtons
            totalPages={Math.ceil(total / perPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PurchaseHistory;
