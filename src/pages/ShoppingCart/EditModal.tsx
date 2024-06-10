import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { options } from '../options';
import { PuffLoader } from 'react-spinners';

type Inputs = {
  wallet_name: string;
  network: string;
  wallet_no: string;
  min_token: string;
  max_token: string;
  status: {
    value: string;
    lavel: string;
  };
};

const EditModal = ({ fetchData, closeModal, updateData }: any) => {
  console.log(updateData);

  const [lodaing, setLoading] = useState(false);
  const [formState, setFormState] = useState({ ...updateData });

  const { register, handleSubmit, control } = useForm<Inputs>();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const newData = { ...data, id: updateData.id, status: data.status.value }; // Make a copy of the data object

    // console.log(newData);

    try {
      setLoading(true);

      const token = localStorage.getItem('biztoken');
      const response = await fetch(
        'https://biztoken.fecotrade.com/api/admin-wallet/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        },
      );
      setLoading(false);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      console.log(response);

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success) {
        await fetchData();
        Swal.fire({
          title: 'success',
          text: 'Successfully updated package',
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'error',
        text: 'Something wrong',
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
              <h2 className="text-xl font-bold ">Update Cart Item</h2>
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
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Name
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('wallet_name', { required: true })}
                  value={formState.wallet_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Amount
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('network', { required: true })}
                  value={formState.network}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Validity
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('wallet_no', { required: true })}
                  value={formState.wallet_no}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Admin Charge
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('min_token', { required: true })}
                  value={formState.min_token}
                  onChange={handleChange}
                />
              </div>

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
