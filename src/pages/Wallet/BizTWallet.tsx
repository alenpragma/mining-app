import DefaultLayout from '../../layout/DefaultLayout';
import ViewIcon from '../../assets/icon/ViewIcon';
import EditIcon from '../../assets/icon/EditIcon';
import TableRow from '../../components/TableRow';
import TableHead from '../../components/TableHead';
import Skeleton from 'react-loading-skeleton';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import { useEffect, useState } from 'react';

const BizTWallet = () => {
  const [bizt, setBizt] = useState<any>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageItem, setPackageItem] = useState<any>();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<any>();

  const openModal = (packageItem: any) => {
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
  const openViewModal = (data: any) => {
    setIsViewModalOpen(true);
    setUserDetail(data);
    closeModal();
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/bizt-wallet/history');
      console.log(response);

      setBizt(response?.data?.bizt_wallet_history);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(bizt);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="BizT History" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {bizt?.data?.length == 0 ? (
            <div>
              <Skeleton height={40} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Sl No
                  </th>
                  <TableHead data="Name" />
                  <TableHead data="Email" />
                  <TableHead data="Phone" />
                  <TableHead data="Received By" />
                  <TableHead data="Received From" />
                  <TableHead data="Amount" />
                  <TableHead data="Type" />
                  <TableHead data="Txn Id" />
                  <TableHead data="Method" />
                  <TableHead data="Description" />
                  <TableHead data="Status" />
                  {/* <TableHead data="Actions" /> */}
                </tr>
              </thead>
              <tbody>
                {bizt?.data?.map((packageItem: any, key: number) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow data={packageItem?.name} />
                    <TableRow data={packageItem?.email} />
                    <TableRow data={packageItem?.phone} />
                    <TableRow data={packageItem?.received_by} />
                    <TableRow data={packageItem?.received_from} />
                    <TableRow data={packageItem?.amount} />
                    <TableRow data={packageItem?.type} />
                    <TableRow data={packageItem?.txn_id} />
                    <TableRow data={packageItem?.method} />
                    <TableRow data={packageItem?.description} />
                    <TableRow data={packageItem?.status} />

                    {/* <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => openViewModal(packageItem)}
                          className="hover:text-primary"
                        >
                          <ViewIcon />
                        </button>

                        <button
                          onClick={() => openModal(packageItem)}
                          className="hover:text-primary"
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* <div>
      {isModalOpen && (
        <UpdateStakingModal
          closeModal={closeModal}
          packageItem={packageItem}
          setPackages={setPackages}
          fetchData={fetchData}
        />
      )}
    </div> */}

      {/*  details view modal */}
      {/* <div>
      {isViewModalOpen && (
        <ViewpackageModal closeModal={closeViewModal} details={userDetail} />
      )}
    </div> */}
    </DefaultLayout>
  );
};

export default BizTWallet;
