import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { PuffLoader } from 'react-spinners';
import Button from '../../Ui/Button';
import { IStaking } from '../../types/Staking';

interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
  packageItem: IStaking | any;
}

export const UpdateStakingModal = ({
  fetchData,
  closeModal,
  packageItem,
}: IUpdatePackage) => {
  const [lodaing, setLoading] = useState(false);
  const [formState, setFormState] = useState({ ...packageItem });
  const { register, handleSubmit, control } = useForm<IStaking>();
  console.log(packageItem);

  const options = [
    { value: '0', label: 'Inactive' },
    { value: '1', label: 'Active' },
  ];
  const durationOptions = [
    { value: '1', label: '1 month' },
    { value: '3', label: '3 month' },
    { value: '6', label: '6 month' },
    { value: '8', label: '8 month' },
    { value: '12', label: '12 month' },
    { value: '18', label: '18 month' },
    { value: '24', label: '24 month' },
  ];

  const defatDurationIndex = durationOptions.findIndex(
    (option) => option.value == packageItem.duration,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const onSubmit: SubmitHandler<IStaking> = async (data: IStaking) => {
    setLoading(true);

    const newData = {
      ...data,
      id: packageItem?.id,
      status: data?.status?.value,
    };

    console.log(newData);

    try {
      const token = localStorage.getItem('biztoken');
      const response = await fetch(
        'https://mining.bizex.io/api/staking/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        setLoading(false);
        fetchData();
        Swal.fire({
          title: 'success',
          text: 'Successfully updated package',
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      console.log(error);
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
        className="overflow-auto hide-scrollbar max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Update Staking
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
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
                <p>Staking Name</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('staking_name', { required: true })}
                  value={formState.staking_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Min Staking</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('min_staking', { required: true })}
                  value={formState.min_staking}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Max Staking</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('max_staking', { required: true })}
                  value={parseFloat(formState.max_staking)}
                  onChange={handleChange}
                />
              </div>
              <div>
                <SelectOptions
                  control={control}
                  options={durationOptions}
                  label="Monthly Duration"
                  name="duration"
                  defaultValue={defatDurationIndex}
                  placeholder={'Select...'}
                />
              </div>
              <div>
                <p>APY(%)</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('apy', { required: true })}
                  value={formState.apy}
                  onChange={handleChange}
                />
              </div>
              <SelectOptions
                control={control}
                options={options}
                label="Unstake Status"
                name="unstake_status"
                defaultValue={formState.status}
                placeholder={'Select...'}
              />
              <div>
                <p>Cancel Charge(%)</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('unstake_charge', { required: true })}
                  value={formState.unstake_charge}
                  onChange={handleChange}
                />
              </div>
              <SelectOptions
                control={control}
                options={options}
                label="Staking Status"
                name="status"
                defaultValue={formState.status}
                placeholder={'Select...'}
              />
              <div className="flex justify-center gap-4">
                <div>
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
                </div>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="btn flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
