import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UpdatePackageModal, UpdateStakingModal } from './UpdateStakingModal';
import Skeleton from 'react-loading-skeleton';
import ViewpackageModal from './ViewpackageModal';
import { IPackage } from '../../types/packages';
import { userToken } from '../../hooks/getTokenFromstorage';
import TableRow from '../../components/TableRow';
import ViewIcon from '../../assets/icon/ViewIcon';
import EditIcon from '../../assets/icon/EditIcon';
import TableHead from '../../components/TableHead';
import axiosInstance from '../../utils/axiosConfig';
import { IStaking } from '../../types/Staking';

const StakingList = () => {
  const [packages, setPackages] = useState<IStaking[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageItem, setPackageItem] = useState<IStaking>();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<IStaking>();

  const openModal = (packageItem: IStaking) => {
    setPackageItem(packageItem);
    setIsModalOpen(true);
    setIsViewModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openViewModal = (data: IStaking) => {
    setIsViewModalOpen(true);
    setUserDetail(data);
    closeModal();
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/stakings');
      setPackages(response?.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Staking List" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {packages.length == 0 ? (
            <div>
              <Skeleton height={40} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <TableHead data="SL NO" />
                  <TableHead data="Package Name" />
                  <TableHead data="Minimum" />
                  <TableHead data="Maximum" />
                  <TableHead data="Monthly Duration" />
                  <TableHead data="APY(%)" />
                  <TableHead data="Cancel Stake" />
                  <TableHead data="Charge" />
                  <TableHead data="Status" />
                  <TableHead data="Actions" />
                </tr>
              </thead>
              <tbody>
                {packages?.map((packageItem: IStaking, key: number) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow data={packageItem?.staking_name} />
                    <TableRow data={packageItem?.min_staking} />
                    <TableRow data={packageItem?.max_staking} />
                    <TableRow data={packageItem?.duration} />
                    <TableRow data={packageItem?.apy} />
                    <TableRow data={packageItem?.status ? 'Yes' : 'No'} />
                    <TableRow data={packageItem?.unstake_charge} />
                    <TableRow
                      data={packageItem?.status == '1' ? 'Active' : 'Inactive'}
                    />

                    <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        {/* details btn */}
                        <button
                          onClick={() => openViewModal(packageItem)}
                          className="hover:text-primary"
                        >
                          <ViewIcon />
                        </button>

                        {/* edit btn */}
                        <button
                          onClick={() => openModal(packageItem)}
                          className="hover:text-primary"
                        >
                          <EditIcon />
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
      <div>
        {isModalOpen && (
          <UpdateStakingModal
            closeModal={closeModal}
            packageItem={packageItem}
            fetchData={fetchData}
          />
        )}
      </div>

      {/*  details view modal */}
      <div>
        {isViewModalOpen && (
          <ViewpackageModal closeModal={closeViewModal} details={userDetail} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default StakingList;
