import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UpdatePackageModal } from './UpdatePackageModal';
import Skeleton from 'react-loading-skeleton';
import ViewpackageModal from './ViewpackageModal';
import { IPackage } from '../../types/packages';
import { userToken } from '../../hooks/getTokenFromstorage';
import TableRow from '../../components/TableRow';
import ViewIcon from '../../assets/icon/ViewIcon';
import EditIcon from '../../assets/icon/EditIcon';
import TableHead from '../../components/TableHead';
import axiosInstance from '../../utils/axiosConfig';

const PackageList = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageItem, setPackageItem] = useState<IPackage>();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<IPackage>();

  const openModal = (packageItem: IPackage) => {
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

  const openViewModal = (data: IPackage) => {
    setIsViewModalOpen(true);
    setUserDetail(data);
    closeModal();
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/packages');

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
      <Breadcrumb pageName="Package List" />
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
                  <TableHead data="Price" />
                  <TableHead data="Daily Token" />
                  <TableHead data="A2i Token" />
                  <TableHead data="Duration" />
                  <TableHead data="Hash Power" />
                  <TableHead data="Status" />
                  <TableHead data="Actions" />
                </tr>
              </thead>
              <tbody>
                {packages?.map((packageItem: IPackage, key: number) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow data={packageItem?.package_name} />
                    <TableRow data={packageItem?.package_price} />
                    <TableRow data={packageItem?.daily_token} />
                    <TableRow data={packageItem?.a2i_token} />
                    <TableRow data={packageItem?.duration + ' ' + 'd'} />
                    <TableRow data={packageItem?.hashpower + ' ' + 'hz'} />
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
          <UpdatePackageModal
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

export default PackageList;
