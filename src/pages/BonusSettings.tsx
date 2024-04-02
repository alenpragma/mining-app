import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { SubmitHandler, useForm } from 'react-hook-form';

const BonusSettings = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);

  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bonus Settings" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Free Mining Rewards
            </label>
            <input
              type="text"
              {...register("Free-Mining-Rewards", { required: true })}
              placeholder="Free Mining Rewards"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Refer Commission (%)
            </label>
            <input
              type="text"
              {...register("Refer Commission", { required: true })}
              placeholder="Refer Commission"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <h2 className='text-2xl font-bold pb-3 text-white'>Level Commission</h2>

            <div>
              <div>
                <label className="mt-3 block text-black dark:text-white">
                  Level 1 (%)
                </label>
                <input
                  type="text"
                  {...register("Level-1", { required: true })}
                  placeholder="Level-1"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mt-3 block text-black dark:text-white">
                  Level 2 (%)
                </label>
                <input
                  type="text"
                  {...register("Level-2", { required: true })}
                  placeholder="Level-2"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mt-3 block text-black dark:text-white">
                  Level 3 (%)
                </label>
                <input
                  type="text"
                  {...register("Level-3", { required: true })}
                  placeholder="Level-3"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          <button
            className="w-fit mx-auto items-center justify-center  bg-meta-3 py-3 px-10  mb-2 rounded-md text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Submit
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default BonusSettings;