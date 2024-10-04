import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { IPurchaseHistory } from '../../types/purchesHistory';
import SearchInput from '../../components/SearchInput';
import Skeleton from 'react-loading-skeleton';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { getPasDay } from './dateToDay';
import TableRow from '../../components/TableRow';
import TableHead from '../../components/TableHead';
import axiosInstance from '../../utils/axiosConfig';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISearchField } from '../../types';
import { formatToLocalDate } from '../../hooks/formatDate';
import TableRowCopy from '../../components/TableRowCopy';
import { PiCopyDuotone } from 'react-icons/pi';
import { copyToClipboard } from '../../components/copyToClipboard ';
import { sliceHash } from '../../common/Loader/slicehash';

const PurchaseHistory = () => {
  const [search, setSearch] = useState('');
  const [laoding, setLoading] = useState(false);
  const [purchaseHistorys, setPurchaseHistorys] = useState<IPurchaseHistory[]>(
    [],
  );
  const [total, setTotal] = useState(0);
  const { register, handleSubmit } = useForm<ISearchField>();

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(25);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/admin/package-purchase-history?per_page=${perPage}&page=${
          currentPage + 1
        }&search=${search}`,
      );
      setLoading(false);
      setPurchaseHistorys(response?.data?.purchase_history?.data);
      setTotal(response?.data?.purchase_history?.total);
    } catch (error) {
      setLoading(false);

      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search === '']);

  const onSubmit: SubmitHandler<ISearchField> = async () => {
    if (search.trim() === '') return;
    fetchData();
    setCurrentPage(0);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Package Purchase History" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-full w-100  relative"
          >
            <SearchInput
              placeholder="Search..."
              search={search}
              setSearch={setSearch}
              name="search"
              register={register}
            />
            <div>
              <button
                type="submit"
                className="absolute top-0 right-0 py-2 px-3 cursor-pointer rounded-lg border border-primary bg-primary   text-white transition hover:bg-opacity-90"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-full overflow-x-auto">
          {laoding ? (
            <div>
              <Skeleton height={40} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <TableHead data="Sl NO" cN="min-w-[80px]" />
                  <TableHead data="Date" cN="min-w-[120px]" />
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
                    <TableRow data={formatToLocalDate(purchaseHistory?.date)} />
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
        {purchaseHistorys.length == 0 && !laoding && (
          <p className="text-center">Data not Found</p>
        )}

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
