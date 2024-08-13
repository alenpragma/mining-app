import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosConfig';
import { PuffLoader } from 'react-spinners';
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';

type TCreateStaking = {
  title: string;
  description: string;
};

const Notification = () => {
  const [lodaing, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateStaking>();

  const onSubmit: SubmitHandler<TCreateStaking> = async (
    data: TCreateStaking,
  ) => {
    console.log(data);
    setLoading(true);
    // const { unstake_status, ...rest } = data;
    // const newPackage = { ...rest, unstake_status: data?.unstake_status?.value };
    try {
      const response = await axiosInstance.post('/store-notification', data);
      if (response) {
        Swal.fire({
          title: 'Success',
          text: 'Successfully added new package',
          icon: 'success',
        });
        setLoading(false);
        reset();
      }
    } catch (error) {
      console.error('Error updating:', error);
      Swal.fire({
        title: 'Failed',
        text: 'Failed to added package',
        icon: 'error',
      });
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Notification" />
      {/* <div className="lg:w-[60%] mx-auto">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex  flex-col w-full gap-5.5 p-6.5"
      >
        <div>
          <p>Title</p>
          <input
            className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            {...register('title', {
              required: 'This Field is Required',
            })}
            placeholder="Staking Name"
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <p className="text-red-500 text-[12px]">{message}</p>
            )}
          />
        </div>
        <div>
          <p>Description</p>
          <input
            className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            {...register('description', {
              required: 'This Field is Required',
            })}
            placeholder="Description"
          />
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => (
              <p className="text-red-500 text-[12px]">{message}</p>
            )}
          />
        </div>
        <div className="flex justify-center gap-4">
          <div>
            {lodaing ? (
              <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
            ) : (
              <button
                className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit"
              >
                Add Notification
              </button>
            )}
          </div>
        </div>
      </form>
      {/* </div>
      </div> */}
    </DefaultLayout>
  );
};

export default Notification;
