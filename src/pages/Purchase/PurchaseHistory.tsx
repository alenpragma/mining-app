import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { IPackage } from '../../types/packages';


const PurchaseHistory = () => {

  const [packages, setPackages] = useState<IPackage[]>([]);
  const token = localStorage.getItem('biztoken');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageItem, setPackageItem] = useState<IPackage>();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<IPackage>();

  const openModal = (packageItem: IPackage) => {
    setPackageItem(packageItem);
    setIsModalOpen(true);
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
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://biztoken.fecotrade.com/api/packages', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setPackages(response?.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  // delete data

  // const deletePackage = async (id: string) => {
  //   Swal.fire({
  //     title: "Do you want to Delete?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       const response = await axios.get(`https://biztoken.fecotrade.com/api/package/delete/${id}`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       fetchData();
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success"
  //       });
  //     }
  //   });
  // };


  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {

    console.log("Form submitted with data:", data);
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Purchase History" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {
            // packages.length == 0 ?
            //   <div>
            //     <Skeleton height={40} count={6} />
            //   </div>
            //   :
            <table className="w-full table-auto">
              <thead>

                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    SL NO
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Date
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Email
                  </th>

                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    package name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Price
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Daily Token
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Received
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Remaining
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages?.map((packageItem: any, key: any) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        4/16/2024, 9:44:55 PM
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        example@gmail.com
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.package_name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.duration}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.hashpower}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        8
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        Remaining
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.status == 1 ? "Expired" : 'Running'}
                      </p>
                    </td>

                    {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.status === 'Paid'
                          ? 'bg-success text-success'
                          : packageItem.status === 'Unpaid'
                            ? 'bg-danger text-danger'
                            : 'bg-warning text-warning'
                          }`}
                      >
                        {packageItem.status}
                      </p>
                    </td> */}

                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
      {/* <div>
        {
          isModalOpen && (
            <UpdatePackageModal
              closeModal={closeModal}
              packageItem={packageItem}
              fetchData={fetchData}
            />
          )}

      </div> */}

      {/*  details view modal */}
      {/* <div>
        {
          isViewModalOpen && (
            <ViewpackageModal
              closeModal={closeViewModal}
              details={userDetail}
            />
          )}
      </div> */}

    </DefaultLayout>
  );
};

export default PurchaseHistory;