import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosConfig';
import { PuffLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import Skeleton from 'react-loading-skeleton';
import { AiTwotoneDelete } from 'react-icons/ai';

type TNotification = {
  title: string;
  description: string;
  id: string | number;
};

const Notification = () => {
  const [lodaing, setLoading] = useState(false);
  const [notifications, setNotification] = useState<TNotification[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNotification>();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/admin/notifications');
      setNotification(response?.data?.notify);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<TNotification> = async (
    data: TNotification,
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
          text: 'Successfully added new Notification',
          icon: 'success',
        });
        setLoading(false);
        reset();
        fetchData();
      }
    } catch (error) {
      console.error('Error updating:', error);
      Swal.fire({
        title: 'Failed',
        text: 'Failed to added notification',
        icon: 'error',
      });
    }
  };
  const handleDelete = async (deleteData: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosInstance.get(
          `/delete-notification/${deleteData}`,
        );

        if (response?.data?.success == 200) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Delete Successfully',
            icon: 'success',
          });
          fetchData();
        } else
          Swal.fire({
            title: 'Error!',
            text: 'There was a problem deleting your file.',
            icon: 'error',
          });
      }
    });
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Notification" />
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
      {notifications.length == 0 ? (
        <div>
          <Skeleton height={40} count={3} />
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className=" text-[18px] bg-slate-300 rounded text-black p-2 flex gap-3 justify-between items-center"
            >
              <div className="">
                <h4 className="font-semibold">
                  Title :{' '}
                  <span className="font-normal">{notification.title}</span>
                </h4>
                <p className="text-[16px]">
                  <span className="font-semibold">Description : </span>
                  <span className="font-normal">
                    {notification.description}
                  </span>
                </p>
              </div>
              <div>
                <AiTwotoneDelete
                  className="size-6 cursor-pointer hover:bg-red-300 rounded-full p-2 w-10 h-10"
                  onClick={() => handleDelete(notification?.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </DefaultLayout>
  );
};

export default Notification;
