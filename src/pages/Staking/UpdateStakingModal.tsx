import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../utils/axiosConfig';
import { durationOptions } from './StakingSettings';

interface IInput {
  staking_name: string;
  min_staking: string | number;
  max_staking: string | number;
  duration: string | any;
  apy: string | number;
  // monthly_roi: string | number;
  unstake_charge: string | number;
  unstake_status: string | any;
  status: string | any;
}
interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
  packageItem: IInput | any;
  setPackages: any;
}
const options = [
  { value: '0', label: 'Inactive' },
  { value: '1', label: 'Active' },
];

export const UpdateStakingModal = ({
  closeModal,
  packageItem,
  setPackages,
}: IUpdatePackage) => {
  const [lodaing, setLoading] = useState(false);
  const [formState, setFormState] = useState({ ...packageItem });
  const { register, handleSubmit, control } = useForm<IInput>();

  const defatDurationIndex = durationOptions.findIndex(
    (option) => option.value == packageItem.duration,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit: SubmitHandler<IInput> = async (data: IInput) => {
    setLoading(true);
    const newData = {
      ...data,
      id: packageItem.id,
      duration: data?.duration?.value,
      status: data?.status?.value,
      unstake_status: data?.unstake_status?.value,
    };
    try {
      const response = await axiosInstance.post('/staking/update', newData);
      if (response) {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Updated',
          icon: 'success',
        });

        // Update the table data
        setPackages((prevData: any) =>
          prevData.map((item: any) =>
            item.id === packageItem.id ? { ...item, ...newData } : item,
          ),
        );
        setLoading(false);
        closeModal();
      }
    } catch (error) {
      if (error) {
        Swal.fire({
          title: 'Failed',
          text: 'Failed to update',
          icon: 'error',
        });
        setLoading(false);
      }
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
              {/* <div>
                <p>Monthly RIO</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('monthly_roi', { required: true })}
                  value={formState.monthly_roi}
                  onChange={handleChange}
                />
              </div> */}
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
