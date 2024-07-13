import { Key, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axiosInstance from '../../utils/axiosConfig';
import { IUser } from './AllUsers';
import TableRow from '../../components/TableRow';
import { formatToLocalDate } from '../../hooks/formatDate';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import ViewIcon from '../../assets/icon/ViewIcon';

const InacticeUser = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<IUser>();
  const [total, setTotal] = useState(0);

  // searching
  // const [search, setSearch] = useState('');

  const openModal = (data: IUser) => {
    setIsModalOpen(true);
    setUserDetail(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setParePage] = useState(50);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/user-lists?&activation_status=0&per_page=${perPage}&page=${
          currentPage + 1
        }`,
      );

      setAllUsers(response?.data?.data);
      setTotal(response?.data?.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inactive User" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                  SL NO
                </th>
                <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
                  User-Phone
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Refarence
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Sponsor
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  verified
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medium text-black dark:text-white">
                  Join date
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
                    <div className="pl-6 py-4 px-4">
                      <TableRow
                        data={currentPage * perPage + Number(key) + 1}
                      />
                    </div>
                    <TableRow data={user.name}>
                      <p className="text-sm">{user.phone}</p>
                    </TableRow>
                    <TableRow data={user.email} />
                    <TableRow data={user.referral_code} />
                    <TableRow data={user.sponsor} />
                    <TableRow
                      data={user.is_verified == '1' ? 'verified' : ''}
                    />
                    <TableRow data={formatToLocalDate(user?.created_at)} />

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
                        {user?.activation_status == '1' ? 'Active' : 'Inactive'}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <div onClick={() => openModal(user)}>
                          <ViewIcon />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default InacticeUser;
