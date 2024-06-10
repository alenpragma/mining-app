import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Button from '../../Ui/Button';
import InputField from '../../components/Forms/InputField';
import axiosInstance from '../../utils/axiosConfig';
import { IVoucher } from './ShoppingCart';

const AddNewPromo = ({ fetchData, closeModal }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IVoucher>();

  const onSubmit: SubmitHandler<IVoucher> = async (data: IVoucher) => {
    const newData = { ...data, status: 1 };
    console.log(newData);

    try {
      const response = await axiosInstance.post('/voucher/store', newData);
      console.log('Response:', response.data);
      fetchData();
      Swal.fire({
        title: 'Success',
        text: 'Successfully added voucher',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error updating:', error);
      Swal.fire({
        title: 'Failed',
        text: 'Failed to added voucher',
        icon: 'error',
      });
    }
  };

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[350px] md-w-[420px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-white">Add New Voucher</h2>
              <strong
                className="text-3xl align-center text-white  cursor-pointer hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <InputField
                name="name"
                label="Name"
                placeholder="Name"
                register={register}
                required={true}
              />
              <InputField
                name="price"
                label="price"
                placeholder="price"
                register={register}
                required={true}
              />
              <InputField
                name="validity"
                label="validity"
                placeholder="validity"
                register={register}
                required={true}
              />
              <InputField
                name="charge"
                label="charge"
                placeholder="charge"
                register={register}
                required={true}
              />
              <Button btnName="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPromo;
