import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { SubmitHandler, useForm } from 'react-hook-form';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const WithdrawsSettings = () => {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);


  };

  return (

    <DefaultLayout>
      <Breadcrumb pageName="Withdraws Settings" />



      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">

          <div>
            <p>Select coin</p>
            <select
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              {...register("coin")}
            >
              <option value="1">coin 1</option>
              <option value="1">coin 2</option>
              <option value="1">coin 3</option>

            </select>
          </div>

          <div>
            <p>Select Nework</p>
            <select
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              {...register("coin")}
            >
              <option value="1">Nework 1</option>
              <option value="1">Nework 2</option>
              <option value="1">Nework 3</option>
            </select>
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Withdrow fee
            </label>
            <input
              type="text"
              {...register("Withdrow fee", { required: true })}
              placeholder="Withdrow fee"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Minimum
            </label>
            <input
              type="text"
              {...register("Minimum", { required: true })}
              placeholder="Minimum"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Maximum
            </label>
            <input
              type="text"
              {...register("Maximum", { required: true })}
              placeholder="Maximum"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
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

export default WithdrawsSettings;