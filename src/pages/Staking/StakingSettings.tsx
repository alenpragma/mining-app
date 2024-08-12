import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import axiosInstance from '../../utils/axiosConfig';
import { PuffLoader } from 'react-spinners';
import { useState } from 'react';

type TCreateStaking = {
  staking_name: string;
  max_staking: string;
  min_staking: string;
  duration: string;
  apy: string;
  monthly_roi: string;
  unstake_charge: string;
  unstake_status: string;
};

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
  } = useForm<TCreateStaking>();

  const onSubmit: SubmitHandler<TCreateStaking> = async (
    data: TCreateStaking,
  ) => {
    const { unstake_status, ...rest } = data;
    const newPackage = { ...rest, unstake_status: data?.unstake_status.value };
    console.log(newPackage);
    try {
      const response = await axiosInstance.post('/staking/store', newPackage);
      // console.log('Response:', response.data);
      Swal.fire({
        title: 'Success',
        text: 'Successfully added new package',
        icon: 'success',
      });
      // setLoading(false);
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
      <Breadcrumb pageName="Add Staking" />
      <div className="lg:w-[60%] mx-auto">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex  flex-col w-full gap-5.5 p-6.5"
          >
            <div>
              <p>Staking Name</p>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                {...register('staking_name', { required: true })}
                placeholder="Staking Name"
              />
            </div>
            <div>
              <p>Min Staking</p>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                {...register('max_staking', { required: true })}
                placeholder="Min Staking"
              />
            </div>
            <div>
              <p>Max Staking</p>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                {...register('min_staking', { required: true })}
                placeholder="Max Staking"
              />
            </div>
            <div>
              <p>Duration Days</p>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                {...register('duration', { required: true })}
                placeholder="Duration Days"
              />
            </div>
            <div>
              <p>APY(%)</p>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                {...register('apy', { required: true })}
                placeholder="APY"
              />
            </div>
            <div>
              <p>Monthly RIO</p>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                {...register('monthly_roi', { required: true })}
                placeholder="Monthly RIO"
              />
            </div>
            <SelectOptions
              control={control}
              options={stacOptions}
              label="Unstake Status"
              name="unstake_status"
              placeholder={'Select An Option'}
            />
            {/* <div>
              <p>Unstake Status</p>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                {...register('unstake_status', { required: true })}
              />
            </div> */}
            <div>
              <p>Cancel Charge(%)</p>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                {...register('unstake_charge', { required: true })}
                placeholder="Cancel Charge"
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
                    Add Staking
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StakingSettings;











// import DefaultLayout from '../../layout/DefaultLayout';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import SelectOptions from '../../Ui/SelectOptions';
// import { options } from '../options';
// import { IPackage } from '../../types/packages';
// import RequiredInput from '../../components/RequiredInput';
// import axiosInstance from '../../utils/axiosConfig';
// import { PuffLoader } from 'react-spinners';
// import { useState } from 'react';
// import { IStaking } from '../../types/Staking';

// type TCreateStaking = {
//   staking_name: string;
//   max_staking: string;
//   min_staking: string;
//   duration: string;
//   apy: string;
//   monthly_roi: string;
//   unstake_charge: string;
//   unstake_status: string;
// };

// const stacOptions = [
//   { value: '0', label: 'Yes' },
//   { value: '1', label: 'No' },
// ];

// const StakingSettings = () => {
//   const [lodaing, setLoading] = useState(false);
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TCreateStaking>();

//   const onSubmit: SubmitHandler<TCreateStaking> = async (
//     data: TCreateStaking,
//   ) => {
//     const { unstake_status, ...rest } = data;
//     const newPackage = { ...rest, unstake_status: data?.unstake_status.value };
//     console.log(newPackage);
//     try {
//       const response = await axiosInstance.post('/staking/store', newPackage);
//       console.log('Response:', response.data);
//       Swal.fire({
//         title: 'Success',
//         text: 'Successfully added new package',
//         icon: 'success',
//       });
//       // setLoading(false);
//     } catch (error) {
//       console.error('Error updating:', error);
//       Swal.fire({
//         title: 'Failed',
//         text: 'Failed to added package',
//         icon: 'error',
//       });
//     }
//   };

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Add Staking" />
//       <div className="lg:w-[60%] mx-auto">
//         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex  flex-col w-full gap-5.5 p-6.5"
//           >
//             <div>
//               <p>Staking Name</p>
//               <input
//                 className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                 {...register('staking_name', { required: true })}
//                 placeholder="Staking Name"
//               />
//             </div>
//             <div>
//               <p>Min Staking</p>
//               <input
//                 className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                 {...register('max_staking', { required: true })}
//                 placeholder="Min Staking"
//               />
//             </div>
//             <div>
//               <p>Max Staking</p>
//               <input
//                 className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                 {...register('min_staking', { required: true })}
//                 placeholder="Max Staking"
//               />
//             </div>
//             <div>
//               <p>Duration Days</p>
//               <input
//                 className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                 {...register('duration', { required: true })}
//                 placeholder="Duration Days"
//               />
//             </div>
//             <div>
//               <p>APY(%)</p>
//               <input
//                 className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                 {...register('apy', { required: true })}
//                 placeholder="APY"
//               />
//             </div>
//             <div>
//               <p>Monthly RIO</p>
//               <input
//                 className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                 {...register('monthly_roi', { required: true })}
//                 placeholder="Monthly RIO"
//               />
//             </div>
//             <SelectOptions
//               control={control}
//               options={stacOptions}
//               label="Unstake Status"
//               name="unstake_status"
//               placeholder={'Select An Option'}
//             />
//             {/* <div>
//               <p>Unstake Status</p>
//               <input
//                 className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                 {...register('unstake_status', { required: true })}
//               />
//             </div> */}
//             <div>
//               <p>Cancel Charge(%)</p>
//               <input
//                 className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                 {...register('unstake_charge', { required: true })}
//                 placeholder="Cancel Charge"
//               />
//             </div>
//             <div className="flex justify-center gap-4">
//               <div>
//                 {lodaing ? (
//                   <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
//                 ) : (
//                   <button
//                     className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
//                     type="submit"
//                   >
//                     Add Staking
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default StakingSettings;
