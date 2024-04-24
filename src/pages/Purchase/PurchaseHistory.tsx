import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IPackage } from '../../types/packages';
import { formatToLocalDate } from '../../hooks/formatDate';
import { IPurchaseHistory } from '../../types/purchesHistory';
import SearchInput from '../../components/SearchInput';

const PurchaseHistory = () => {
  const [purchaseHistorys, setPurchaseHistorys] = useState<IPurchaseHistory[]>(
    [],
  );
  const token = localStorage.getItem('biztoken');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseHistory, setpurchaseHistory] = useState<IPackage>();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<IPackage>();

  const [search, setSearch] = useState('');

  const openModal = (purchaseHistory: IPackage) => {
    setpurchaseHistory(purchaseHistory);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openViewModal = (data: IPackage) => {
    setIsViewModalOpen(true);
    setUserDetail(data);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://biztoken.fecotrade.com/api/admin/package-purchase-history',
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const getPasDay = (givenDate: string): number => {
    // Parse the given date
    const parsedGivenDate = new Date(givenDate);

    // Check if the parsed date is valid
    if (isNaN(parsedGivenDate.getTime())) {
      // If the given date is not valid, return an error or handle it as needed
      console.error('Invalid date format for givenDate');
      return 0; // Or handle the error in a different way
    }

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceMs = currentDate.getTime() - parsedGivenDate.getTime();

    // Convert milliseconds to days
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
  };

  // Example usage
  console.log(getPasDay('2024-04-01T05:44:59.000000Z')); // Output should be the number of days since the given date

  const filteredPurchaseHistorys = purchaseHistorys?.filter(
    (purchaseHistory) =>
      purchaseHistory?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Purchase History" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full w-100 mb-4">
          <SearchInput placeholder="Search..." setSearch={setSearch} />
        </div>
        <div className="max-w-full overflow-x-auto">
          {
            // packages.length == 0 ?
            //   <div>
            //     <Skeleton height={40} count={6} />
            //   </div>
            //   :
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
                    package name
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
                {filteredPurchaseHistorys?.map(
                  (purchaseHistory: any, key: any) => (
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
                          {getPasDay(purchaseHistory?.created_at)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {purchaseHistory?.duration -
                            getPasDay(purchaseHistory?.created_at)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {purchaseHistory.status == 1 ? 'Running' : 'Expired'}
                        </p>
                      </td>

                      {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${purchaseHistory.status === 'Paid'
                          ? 'bg-success text-success'
                          : purchaseHistory.status === 'Unpaid'
                            ? 'bg-danger text-danger'
                            : 'bg-warning text-warning'
                          }`}
                      >
                        {purchaseHistory.status}
                      </p>
                    </td> */}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          }
        </div>
      </div>
      {/* <div>
        {
          isModalOpen && (
            <UpdatePackageModal
              closeModal={closeModal}
              purchaseHistory={purchaseHistory}
              fetchData={fetchData}
            />
          )}

      </div> */}

      {/*  details view modal */}
      {/* <div>
        {
          isViewModalOpen && (
            <ViewpackageModal
              closeModal={closeViewModal}
              details={userDetail}
            />
          )}
      </div> */}
    </DefaultLayout>
  );
};

export default PurchaseHistory;
