import { Key, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import TableRow from '../../components/TableRow';
import { IUser } from '../Users/AllUsers';
import EditIcon from '../../assets/icon/EditIcon';
import WalletUpdateModal from './WalletUpdateModal';

export type Isearch = {
  email: string;
};

const Wallets = () => {
  const [lodaing, setLoading] = useState(false);
  const [users, setUsers] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<IUser>();

  const { register, handleSubmit } = useForm<Isearch>();

  const onSubmitEmail: SubmitHandler<Isearch> = async (data: Isearch) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/user-lists?search=${data.email}`,
      );
      setUsers(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const openModal = (data: IUser) => {
    setIsModalOpen(true);
    setUserDetail(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Deposit Wallet" />
      <form
        onSubmit={handleSubmit(onSubmitEmail)}
        className="flex w-1/2 flex-col   gap-5.5 p-6.5"
      >
        <InputField
          label="Email"
          name="email"
          register={register}
          placeholder="Email"
          type="email"
          required
        />
        <div>
          {lodaing ? (
            <button className="btn flex mt-3 w-fit justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1">
              Loading...
            </button>
          ) : (
            <button
              className="btn flex mt-3 w-fit justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <div className="max-w-full overflow-x-auto">
        {users?.length >= 1 && (
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
              {users?.map((user: IUser, key: Key | null | undefined) => {
                return (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {key}
                      </h5>
                    </td>
                    <TableRow data={user.name}>
                      <p className="text-sm">{user.phone}</p>
                    </TableRow>
                    <TableRow data={user.email} />
                    <TableRow data={user.referral_code} />
                    <TableRow data={user.sponsor} />
                    <TableRow
                      data={user.is_verified == '1' ? 'verified' : ''}
                    />

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
                      <span className="flex items-center space-x-3.5">
                        <button onClick={() => openModal(user)}>
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

      {isModalOpen && (
        <WalletUpdateModal closeModal={closeModal} updateData={userDetail} />
      )}
    </DefaultLayout>
  );
};

export default Wallets;
