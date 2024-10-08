import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatToLocalDate } from '../../hooks/formatDate';
import { BizApprovedRejectModal } from './BizApprovedRejectModal';
import ViewWithdrawDetailsModal from './ViewWithdrawDetailsModal';
import Skeleton from 'react-loading-skeleton';
import { IoIosCopy } from 'react-icons/io';
// import { copyToClipboard } from '../../components/copyToClipboard ';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosConfig';

const AllWithdraws = () => {
  const token = localStorage.getItem('biztoken');
  const [withdrawsData, setWithdrawsData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  // edit

  // view
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState('');
  // view

  // view
  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };
  const openViewModal = (data: any) => {
    setIsViewModalOpen(true);
    setUserDetail(data);
  };
  //  view

  const openEditModal = (data: any) => {
    console.log(data);

    setUpdateItem(data);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/biztoken-withdraw-request');
      setWithdrawsData(response?.data[0].reverse());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const copyToClipboard = (textToCopy: any) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success('Copied');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Withdraws" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading == true ? (
            <div>
              <Skeleton height={40} count={3} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    SL NO
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    User-Email
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Date
                  </th>
                  {/* <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    GateWay
                  </th> */}
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Network
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Wallet
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Amount
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Fee
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {withdrawsData?.map((depositsItem: any, key: any) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {depositsItem.name}
                      </h5>
                      <p className="text-sm">{depositsItem.email}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatToLocalDate(depositsItem.created_at)}
                      </p>
                    </td>

                    {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {depositsItem.wallet_name}
                      </p>
                    </td> */}
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {depositsItem.network}
                      </p>
                    </td>
                    <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex gap-2">
                        <p className=" text-black dark:text-white">
                          {`${depositsItem.wallet_address.slice(
                            0,
                            5,
                          )}...${depositsItem.wallet_address.slice(-5)}`}
                        </p>
                        <IoIosCopy
                          onClick={() =>
                            copyToClipboard(depositsItem.wallet_address)
                          }
                          className="text-xl cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {depositsItem.amount} BIZT
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {depositsItem.charge} BIZT
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          depositsItem.status === 'approved'
                            ? 'bg-success text-success'
                            : depositsItem.status === 'rejected'
                            ? 'bg-danger text-danger'
                            : 'bg-warning text-warning'
                        }`}
                      >
                        {depositsItem.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => {
                            openViewModal(depositsItem);
                          }}
                          className="hover:text-primary"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                              fill=""
                            />
                            <path
                              d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                              fill=""
                            />
                          </svg>
                        </button>

                        <button onClick={() => openEditModal(depositsItem)}>
                          <svg
                            className="w-6 h-6 text-gray-800  "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {withdrawsData.length == 0 && !loading && (
        <p className="text-center mt-4">No data found</p>
      )}

      <div>
        {isEditModalOpen && (
          <BizApprovedRejectModal
            closeModal={closeEditModal}
            updateItem={updateItem}
            fetchData={fetchData}
          />
        )}
      </div>
      <div>
        {isViewModalOpen && (
          <ViewWithdrawDetailsModal
            closeModal={closeViewModal}
            details={userDetail}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default AllWithdraws;
