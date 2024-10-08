import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApprovedRejectModal } from './ApprovedRejectModal';
import ViewDepositDetailsModal from './ViewDepositDetailsModal';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';
import { IDeposit } from '../../types/deposit';
import SearchInput from '../../components/SearchInput';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import TableRow from '../../components/TableRow';
import TableRowCopy from '../../components/TableRowCopy';
import { PiCopyDuotone } from 'react-icons/pi';
import { copyToClipboard } from '../../components/copyToClipboard ';
import { sliceHash } from '../../common/Loader/slicehash';

const AllDeposits = () => {
  const token = localStorage.getItem('biztoken');
  const [depositsData, setDepositData] = useState<IDeposit[]>([]);
  const [search, setSearch] = useState('');

  // view
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<IDeposit>();
  // view

  // edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState<IDeposit>();
  // edit

  const openEditModal = (data: IDeposit) => {
    setUpdateItem(data);
    setIsEditModalOpen(true);
    setIsViewModalOpen(false); // close view modal
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // view start
  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };
  const openViewModal = (data: IDeposit) => {
    setIsViewModalOpen(true);
    setUserDetail(data);
    closeEditModal(); // close edit modal
  };
  //  view end

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://mining.bizex.io/api/usdt-add-request',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setDepositData(response?.data[0].reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDeposits = depositsData?.filter(
    (deposit) =>
      deposit?.name?.toLowerCase().includes(search.toLowerCase()) ||
      deposit?.txn_id?.toLowerCase().includes(search.toLowerCase()) ||
      deposit?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);

  const from = currentPage * perPage;
  const to = from + perPage;
  //  pagination end

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Deposits" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full w-100 mb-4">
          <SearchInput placeholder="Search..." setSearch={setSearch} />
        </div>

        <div className="max-w-full overflow-x-auto">
          {depositsData.length == 0 ? (
            <div>
              <Skeleton height={40} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                    SL NO
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    Date
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    User
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Network
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    GateWay
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Trx ID
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Wallet No
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Amount
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
                {filteredDeposits
                  ?.slice(from, to)
                  ?.sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime(),
                  )
                  .map((depositsItem: IDeposit, key: any) => (
                    <tr key={key}>
                      <div className="pl-5">
                        <TableRow data={key + 1} />
                      </div>
                      <TableRow
                        data={formatToLocalDate(depositsItem?.created_at)}
                      />
                      <TableRow data={depositsItem?.name}>
                        <p>{depositsItem.email}</p>
                      </TableRow>

                      <TableRow data={depositsItem?.network} />
                      <TableRow data={depositsItem?.wallet_name} />

                      {/* <TableRow data={depositsItem?.txn_id} /> */}

                      <TableRowCopy data={sliceHash(depositsItem.txn_id)}>
                        <PiCopyDuotone
                          className="text-xl cursor-pointer"
                          onClick={() => copyToClipboard(depositsItem.txn_id)}
                        />
                      </TableRowCopy>

                      <TableRowCopy data={sliceHash(depositsItem.wallet_no)}>
                        <PiCopyDuotone
                          className="text-xl cursor-pointer"
                          onClick={() =>
                            copyToClipboard(depositsItem.wallet_no)
                          }
                        />
                      </TableRowCopy>

                      <TableRow data={depositsItem?.amount} />

                      <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                            depositsItem.status == 'approved'
                              ? 'bg-success text-success'
                              : depositsItem.status === 'rejected'
                              ? 'bg-danger text-danger'
                              : 'bg-warning text-warning'
                          }`}
                        >
                          {depositsItem.status}
                        </p>
                      </td>
                      <td className="border-b text-black dark:text-white  border-[#eee] py-5 px-3 dark:border-strokedark">
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

                          <button
                            disabled={depositsItem.status != 'pending'}
                            onClick={() => openEditModal(depositsItem)}
                            className={`${
                              depositsItem.status != 'pending'
                                ? 'text-zinc-400'
                                : ' text-black dark:text-white'
                            }`}
                          >
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
        <div className="my-4">
          <PaginationButtons
            totalPages={Math.ceil(filteredDeposits.length / perPage)}
            currentPage={2}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div>
        {isEditModalOpen && (
          <ApprovedRejectModal
            closeModal={closeEditModal}
            updateItem={updateItem}
            fetchData={fetchData}
          />
        )}
      </div>
      <div>
        {isViewModalOpen && (
          <ViewDepositDetailsModal
            closeModal={closeViewModal}
            details={userDetail}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default AllDeposits;
