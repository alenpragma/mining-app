import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import TableRow from '../../components/TableRow';
import TableHead from '../../components/TableHead';
import axiosInstance from '../../utils/axiosConfig';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { IPackageMining, IResponse, ITransaction } from '../../types/historys';
import { formatToLocalDate } from '../../hooks/formatDate';
import SearchInput from '../../components/SearchInput';
import SearchIcon from '../../assets/icon/SearchIcon';

const PackageMining = () => {
  const [datas, setDatas] = useState<IResponse<IPackageMining>>();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(25);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/admin/package-mining-history?per_page=${perPage}&page=${
          currentPage + 1
        }&search=${search}`,
      );

      setDatas(data.date_wise_totals);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  const searchData = () => {
    fetchData();
    setCurrentPage(0);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Package Mining" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between">
          <div className="max-w-full w-100 mb-4 relative">
            <SearchInput
              placeholder="Search..."
              search={search}
              setSearch={setSearch}
            />
            <div onClick={() => searchData()}>
              <SearchIcon />
            </div>
          </div>
        </div>

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
                  <TableHead data="Id" />
                  <TableHead data="Date" cN="min-w-[150px]" />
                  <TableHead data="User" />
                  <TableHead data="Total amount" cN="min-w-[140px]" />
                  <TableHead data="Phone" />
                  <TableHead data="Transaction count" />
                  <TableHead
                    data="Previous day minings count"
                    cN="min-w-[150px]"
                  />
                  <TableHead
                    data="previous day purchases count"
                    cN="min-w-[160px]"
                  />
                </tr>
              </thead>
              <tbody>
                {datas?.data?.map((data: IPackageMining, key: number) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow data={data.user_id} />
                    <TableRow data={formatToLocalDate(data?.date)} />
                    <TableRow data={data?.email}>
                      <span>{data.name}</span>
                    </TableRow>
                    <TableRow data={`${data?.total_amount} BIZ`} />

                    <TableRow data={data?.phone} />
                    <TableRow data={data?.transaction_count} />
                    <TableRow data={data?.previous_day_minings_count} />
                    <TableRow data={data?.previous_day_purchases_count} />
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

export default PackageMining;
