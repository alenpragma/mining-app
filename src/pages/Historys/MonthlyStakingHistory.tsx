import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import TableRow from '../../components/TableRow';
import TableHead from '../../components/TableHead';
import axiosInstance from '../../utils/axiosConfig';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { IResponse, ITransaction } from '../../types/historys';

const MonthlyStakingHistory = () => {
  const [datas, setDatas] = useState<IResponse<ITransaction>>();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(25);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/admin/monthly-staking-history?per_page=${perPage}&page=${
          currentPage + 1
        }`,
      );

      setDatas(data.monthly_staking);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Monthly Staking" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div>
              <Skeleton height={40} count={10} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <TableHead cN="min-w-[100px]" data="SL NO" />
                  <TableHead data="User" />
                  <TableHead data="Amount" />
                  <TableHead data="Method" />
                  <TableHead data="Description" cN="min-w-[220px]" />
                  <TableHead data="Status" />
                </tr>
              </thead>
              <tbody>
                {datas?.data?.map((data: ITransaction, key: number) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow data={data?.email}>
                      <span>{data.name}</span>
                    </TableRow>
                    <TableRow data={data?.amount} />
                    <TableRow data={data?.method} />
                    <TableRow data={data?.description} />
                    <TableRow data={data?.status} className="capitalize" />
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="my-4">
        <PaginationButtons
          totalPages={Math.ceil(datas?.total / perPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </DefaultLayout>
  );
};

export default MonthlyStakingHistory;
