import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { PuffLoader } from 'react-spinners';
import InputField from '../../components/Forms/InputField';
import axiosInstance from '../../utils/axiosConfig';

type Inputs = {
  wallet: any;
  type: any;
  amount: string;
  user_id: string;
};

const WalletUpdateModal = ({ closeModal, updateData }: any) => {
  const [lodaing, setLoading] = useState(false);

  const { register, handleSubmit, control } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const walletData = {
      amount: data?.amount,
      type: data?.type?.value,
      wallet: data?.wallet?.value,
      user_id: updateData.id,
    };

    if (walletData.type == undefined) {
      Swal.fire({
        title: 'warning',
        text: 'Select wallet',
        icon: 'warning',
      });
      return;
    }
    if (walletData.type == undefined) {
      Swal.fire({
        title: 'warning',
        text: 'Select Type',
        icon: 'warning',
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post('/admin/add-money', walletData);
      console.log(response.data);

      if (response.data.success === 200) {
        setLoading(false);
        Swal.fire({
          title: 'success',
          text: `${response.data.messgae}`,
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      setLoading(false);

      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      }).then(() => {
        closeModal();
      });
    }
  };

  const options = [
    { value: 'usdt_wallet', label: 'USDT wallet' },
    { value: 'a2i_wallet', label: 'A2I wallet' },
    { value: 'biz_wallet', label: 'BIZ wallet' },
    { value: 'bizt_wallet', label: 'BIZT wallet' },
  ];

  const typeOptions = [
    { value: 'add', label: 'add' },
    { value: 'deduct', label: 'deduct' },
  ];

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
              <h2 className="text-xl font-bold ">Update</h2>
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
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <div className="lg:w-1/2">
                <SelectOptions
                  name="wallet"
                  control={control}
                  defaultValue={9}
                  label="Wallet"
                  options={options}
                  placeholder="Wallet"
                />

                <SelectOptions
                  name="type"
                  control={control}
                  defaultValue={9}
                  label="Type"
                  options={typeOptions}
                  placeholder="Type"
                />

                <InputField
                  label="Amount"
                  name="amount"
                  register={register}
                  placeholder="Amount"
                  required
                />
              </div>

              {lodaing ? (
                <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
              ) : (
                <button
                  className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletUpdateModal;
