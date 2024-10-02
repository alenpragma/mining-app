import { Key, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ViewuserModal } from './ViewuserModal';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import SearchInput from '../../components/SearchInput';
import TableRow from '../../components/TableRow';
import axiosInstance from '../../utils/axiosConfig';
import ViewIcon from '../../assets/icon/ViewIcon';
import SearchIcon from '../../assets/icon/SearchIcon';
import EditIcon from '../../assets/icon/EditIcon';
import BlockUnBlockModal from './BlockUnBlockModal';

export type IUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  sponsor: string;
  is_admin: string;

  created_at: string;
  updated_at: string;

  block: number;
  kyc: number;

  is_verified: string;
  activation_status: string;
  referral_code: string | null;
  email_verified_at: null | string;
};

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<IUser>();
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [laoding, setLoading] = useState(false);

  const [data, setData] = useState();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // searching
  // const [search, setSearch] = useState('');

  const openModal = (data: IUser) => {
    setIsModalOpen(true);
    setUserDetail(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleUpdateModal = (status: boolean, data?: any) => {
    setIsUpdateModalOpen(status);
    if (data) {
      setData(data);
    }
  };

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(50);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/user-lists?per_page=${perPage}&page=${
          currentPage + 1
        }&search=${search}`,
      );
      setLoading(false);

      setAllUsers(response?.data?.data);
      setTotal(response?.data?.total);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [currentPage]);

  const searchData = () => {
    fetchData();
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchData();
  }, [search, currentPage]);

  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="All Users" />

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
            {laoding ? (
              <div>
                <Skeleton height={45} count={15} />
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                      SL NO
                    </th>
                    <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
                      User Phone
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Reference
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Sponsor
                    </th>
                    <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                      Email verified
                    </th>
                    <th className="min-w-[130px] py-4 px-4 font-medium text-black dark:text-white">
                      Join date
                    </th>

                    <th className="min-w-[130px] py-4 px-4 font-medium text-black dark:text-white">
                      User Status
                    </th>

                    <th className="min-w-[130px] py-4 px-4 font-medium text-black dark:text-white">
                      KYC Status
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
                  {allUsers?.map((user: IUser, key: Key | null | undefined) => {
                    return (
                      <tr key={key}>
                        <h4 className="pl-6 py-4 px-4">
                          <TableRow
                            data={currentPage * perPage + Number(key) + 1}
                          />
                        </h4>
                        <TableRow data={user.name}>
                          <p className="text-sm">{user.phone}</p>
                        </TableRow>
                        <TableRow data={user.email} />
                        <TableRow data={user.referral_code} />
                        <TableRow data={user.sponsor} />
                        <TableRow data={formatToLocalDate(user?.created_at)} />

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              user?.is_verified == '1'
                                ? 'bg-success text-success'
                                : 'bg-danger text-danger'
                            }`}
                          >
                            {user?.is_verified == '1' ? 'Verified' : ' '}
                          </p>
                        </td>

                        {/* <TableRow data={user.block == '1' ? 'blocked' : ''} /> */}
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              user?.block === 0
                                ? 'bg-success text-success'
                                : 'bg-danger text-danger'
                            }`}
                          >
                            {user?.block === 1 ? 'Blocked' : 'Safe'}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              user?.kyc === 1
                                ? 'bg-success text-success'
                                : 'bg-danger text-danger'
                            }`}
                          >
                            {user?.kyc === 1 ? 'Verified' : 'Unverified'}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              user?.activation_status === '1'
                                ? 'bg-success text-success'
                                : user?.activation_status === '0'
                                ? 'bg-danger text-danger'
                                : 'bg-warning text-warning'
                            }`}
                          >
                            {user?.activation_status == '1'
                              ? 'Active'
                              : 'Inactive'}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark">
                          <span className="flex items-center space-x-3.5">
                            <button onClick={() => openModal(user)}>
                              <ViewIcon />
                            </button>

                            <button
                              onClick={() => toggleUpdateModal(true, user)}
                            >
                              <EditIcon />
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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
      <div className="mx-auto">
        {/* {isModalOpen && (
          <Modal
            closeModal={closeModal}
            onSubmit={handleSubmit}
            defaultValue={{ id: "exampleId", para: "price", criterion: "0", value: "", type: "0" }}
          />
        )} */}
      </div>

      {isModalOpen && (
        <ViewuserModal closeModal={closeModal} userDetail={userDetail} />
      )}
      {isUpdateModalOpen && (
        <BlockUnBlockModal
          toggleUpdateModal={toggleUpdateModal}
          updateData={data}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AllUsers;
