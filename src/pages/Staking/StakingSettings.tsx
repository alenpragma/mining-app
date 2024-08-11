import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { options } from '../options';
import { IPackage } from '../../types/packages';
import RequiredInput from '../../components/RequiredInput';
import axiosInstance from '../../utils/axiosConfig';
import { PuffLoader } from 'react-spinners';
import { useState } from 'react';

type Inputs = {
  package_name: string;
  package_price: string;
  daily_token: string;
  a2i_token: string;
  duration: string;
  hashpower: string;
  status: string;
  image: string;
  is_deleted: string;
};


const optionss = [
  { value: '0', label: 'Inactive' },
  { value: '1', label: 'Active' },
];
const stacOptions = [
  { value: '0', label: 'Yes' },
  { value: '1', label: 'No' },
];

const StakingSettings = () => {
  const [lodaing, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // const onSubmit: SubmitHandler<IPackage> = async (data: IPackage) => {
  //   const { status, ...rest } = data;
  //   const newPackage = { ...rest, status: data?.status?.value };

  //   try {
  //     const response = await axiosInstance.post('/package/store', newPackage);
  //     console.log('Response:', response.data);
  //     Swal.fire({
  //       title: 'Success',
  //       text: 'Successfully added new package',
  //       icon: 'success',
  //     });
  //     // setLoading(false);
  //   } catch (error) {
  //     console.error('Error updating:', error);
  //     Swal.fire({
  //       title: 'Failed',
  //       text: 'Failed to added package',
  //       icon: 'error',
  //     });
  //   }
  // };

  const onSubmit: SubmitHandler<IPackage> = async (data: IPackage) => {
    console.log(data);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Staking" />
      <div className="lg:w-[60%] mx-auto">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <div>
                <p>Name</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('package_name', { required: true })}
                  placeholder={"Enter Packege Name"}
                
                />
              </div>
              <div>
                <p>Minimum BIZT Coin</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('package_price', { required: true })}
                  placeholder={"100"}
                
                />
              </div>
              <div>
                <p>Maximum BIZT Coin</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('daily_token', { required: true })}
                  placeholder={parseFloat("50")}
                
                />
              </div>
              <div>
                <p>Duration Days</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('a2i_token', { required: true })}
                  placeholder={parseFloat("150")}
                
                />
              </div>
              <div>
                <p>APY(%)</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('duration', { required: true })}
                  placeholder={"12"}
                
                />
              </div>
              <div>
                <p>Monthly RIO</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('hashpower', { required: true })}
                  placeholder={"6"}
                
                />
              </div>
              <SelectOptions
                control={control}
                options={stacOptions}
                label="Cancel Stake"
                name="cancel"
                defaultValue={"Select an option"}
                placeholder={'Select...'}
              />
              <div>
                <p>Cancel Charge(%)</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('hashpower', { required: true })}
                  placeholder={"20"}
                
                />
              </div>
              <SelectOptions
                control={control}
                options={optionss}
                label="Status"
                name="status"
                defaultValue={"Select an option"}
                placeholder={'Select...'}
              />

              {/* <div>
                <p>status</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("status", { required: true })}
                  value={formState.status}
                
                />

              </div> */}

              <div className="flex justify-center gap-4">
                <div>
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
                </div>
                {/* <button
                  type="button"
                  onClick={() => closeModal()}
                  className="btn flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Cancel
                </button> */}
              </div>
            </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StakingSettings;
