import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { options } from '../options';
import { PuffLoader } from 'react-spinners';
import { IVoucher } from './ShoppingCart';
import InputField from '../../components/Forms/InputField';
import axiosInstance from '../../utils/axiosConfig';

const EditModal = ({ fetchData, closeModal, updateData }: any) => {
  console.log(updateData);

  const [lodaing, setLoading] = useState(false);
  const [formState] = useState({ ...updateData });

  const { register, handleSubmit, control } = useForm<IVoucher>();

  const onSubmit: SubmitHandler<IVoucher> = async (data: IVoucher) => {
    const newData = { ...data, id: updateData.id, status: data.status.value };
    try {
      const response = await axiosInstance.post('/voucher/update', newData);
      await fetchData();
      Swal.fire({
        title: 'Success',
        text: 'Successfully Updated',
        icon: 'success',
      }).then(() => {
        closeModal();
      });
    } catch (error) {
      console.error('Error updating:', error);
      Swal.fire({
        title: 'Failed',
        text: 'Failed to update',
        icon: 'error',
      });
    }
  };

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className=" w-[350px] md:w-[420px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold ">Update Voucher</h2>
              <strong
                className="text-4xl align-cente cursor-pointer hover:text-black dark:hover:text-white "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-4 p-6.5"
            >
              <InputField
                label="Name"
                name="name"
                register={register}
                placeholder="Name"
                defaultValue={formState && (formState?.name as string)}
              />
              <InputField
                name="price"
                label="Price"
                placeholder="Price"
                register={register}
                defaultValue={formState && (formState?.price as string)}
              />

              <InputField
                name="validity"
                label="Validity"
                placeholder="Validity"
                register={register}
                defaultValue={formState && (formState?.validity as string)}
              />

              <InputField
                name="charge"
                label="charge"
                placeholder="charge"
                register={register}
                defaultValue={formState && (formState?.charge as string)}
              />

              <SelectOptions
                name="status"
                control={control}
                defaultValue={Number(formState.status)}
                label="status"
                options={options}
                placeholder="status"
              />

              {lodaing ? (
                <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
              ) : (
                <button
                  className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
