import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import AddNewPromo from './AddPromo';
import EditModal from './EditModal';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/TableRow';
import UpdateIcon from '../../components/Table/UpdateIcon';
import { formatToLocalDate } from '../../hooks/formatDate';
import DeleteIcon from '../../components/Table/DeleteIcon';
import Swal from 'sweetalert2';

export type IVoucher = {
  name: 'string';
  price: 'string';
  validity: 'string';
  charge: 'string';
  status: 'string' | any;
  is_deleted: 'string';
};

const ShoppingCart = () => {
  const [isModalOpenAddMethod, setIsModalOpenAddMethod] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateData, setUpdateDate] = useState('');

  const openModalAddNew = () => {
    setIsModalOpenAddMethod(true);
  };
  const closeModalAddNew = () => {
    setIsModalOpenAddMethod(false);
  };

  const openEditModal = (updateItem: any) => {
    setIsEditModalOpen(true);
    setUpdateDate(updateItem);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [vouchers, setVouchers] = useState<IVoucher[]>();

  const fetchData = async () => {
    const response = await axiosInstance.get('/vouchers');
    setVouchers(response?.data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (formData: any) => {
    console.log('Form submitted with data:', formData);
  };

  const deleteData = async (id: number) => {
    console.log(id);

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        // Show loading
        Swal.fire({
          title: 'Deleting...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await axiosInstance.get(`/voucher/delete/${id}`);

        fetchData();

        // Hide loading
        Swal.close();

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem deleting your file.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Shopping Cart" />
      <div>
        <div className="py-3">
          <button
            onClick={() => openModalAddNew()}
            className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            type="submit"
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {vouchers?.length == 0 ? (
            <div>
              <Skeleton height={40} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto ">
              <thead className="">
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    SL NO
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Price
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Validity
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Admin Charge
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Updated At
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
                {vouchers?.map((voucher: any, key: number) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow data={voucher?.name} />
                    <TableRow data={voucher?.price} />
                    <TableRow data={voucher?.validity} />
                    <TableRow data={voucher?.charge} />
                    <TableRow data={formatToLocalDate(voucher.updated_at)} />

                    <TableRow
                      data={voucher?.status == 1 ? 'Active' : 'Inactive'}
                    />

                    <TableRow data={''}>
                      <div className="flex items-center space-x-3.5">
                        <div onClick={() => openEditModal(voucher)}>
                          <UpdateIcon />
                        </div>
                        {/*  delete item */}
                        <div onClick={() => deleteData(voucher?.id)}>
                          <DeleteIcon />
                        </div>
                      </div>
                    </TableRow>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className=" ">
        {isModalOpenAddMethod && (
          <AddNewPromo
            fetchData={fetchData}
            closeModal={closeModalAddNew}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      <div className=" ">
        {isEditModalOpen && (
          <EditModal
            closeModal={closeEditModal}
            updateData={updateData}
            fetchData={fetchData}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ShoppingCart;
