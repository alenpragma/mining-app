import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Skeleton from 'react-loading-skeleton';
import TableHead from '../../components/TableHead';
import TableRow from '../../components/TableRow';
import EditIcon from '../../assets/icon/EditIcon';
import ApproveKycModal from './ApproveKycModal';

const AllKyc = () => {
  const [loading, setLoading] = useState(false);
  const [kyc, setKycs] = useState<any>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState<any>();

  const toggleUpdateModal = (status: boolean, data?: any) => {
    setIsModalOpen(status);
    setdata(data);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All KYC Users" />
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

                  <th className="py-4 px-4 min-w-40 font-medium text-black dark:text-white">
                    Profile
                  </th>
                  <th className="py-4 px-4 min-w-40 font-medium text-black dark:text-white">
                    NID Front
                  </th>
                  <th className="py-4 px-4 min-w-40 font-medium text-black dark:text-white">
                    NID Back
                  </th>

                  {/* <TableHead data="Profile" />
                  
                  */}
                  {/* <TableHead data="" />

                  <TableHead data="" /> */}

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
                        className="w-25 h-28"
                        src={data.profile_image}
                        alt=""
                      />
                    </TableRow>

                    <TableRow data={''}>
                      <img className="w-25 h-28" src={data.id_front} alt="" />
                    </TableRow>

                    <TableRow data={''}>
                      <img className="w-25 h-28" src={data.id_back} alt="" />
                    </TableRow>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          data?.status === 'approved'
                            ? 'bg-success text-success'
                            : 'bg-warning text-warning'
                        }`}
                      >
                        {data?.status}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          disabled={data?.status != 'pending'}
                          onClick={() => toggleUpdateModal(true, data)}
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
      {isModalOpen && (
        <ApproveKycModal
          toggleUpdateModal={toggleUpdateModal}
          updateData={data}
          fetchData={fetchData}
        />
      )}
    </DefaultLayout>
  );
};

export default AllKyc;
