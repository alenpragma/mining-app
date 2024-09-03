import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Skeleton from 'react-loading-skeleton';
import TableHead from '../../components/TableHead';
import TableRow from '../../components/TableRow';
import ViewIcon from '../../assets/icon/ViewIcon';
import EditIcon from '../../assets/icon/EditIcon';

const PendingKyc = () => {
  const [loading, setLoading] = useState(false);
  const [kyc, setKycs] = useState<any>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState<any>();

  const openModal = (data: any) => {
    setdata(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/user-kycs');
      setLoading(false);
      setKycs(response?.data?.data);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pending kyc" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {kyc?.length == 0 && loading ? (
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
                  <TableHead data="Identification No" />

                  <TableHead data="Status" />
                  <TableHead data="Actions" />
                </tr>
              </thead>
              <tbody>
                {kyc?.map((data: any, key: number) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow data={data?.name} />
                    <TableRow data={data?.email} />
                    <TableRow data={data?.identification_no} />

                    <TableRow data={''}>
                      <img
                        className="w-30 h-32.5"
                        src={data.profile_image}
                        alt=""
                      />
                    </TableRow>

                    <TableRow data={''}>
                      <img className="w-30 h-32.5" src={data.id_front} alt="" />
                    </TableRow>

                    <TableRow data={''}>
                      <img className="w-30 h-32.5" src={data.id_back} alt="" />
                    </TableRow>

                    <TableRow data={data?.type} />

                    <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          // onClick={() => openViewModal(data)}
                          className="hover:text-primary"
                        >
                          <ViewIcon />
                        </button>

                        <button
                          onClick={() => openModal(data)}
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
    </DefaultLayout>
  );
};

export default PendingKyc;
