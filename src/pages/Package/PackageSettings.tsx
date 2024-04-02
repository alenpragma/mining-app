import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useState } from 'react';

type Inputs = {
  package_name: string;
  package_price: string;
  daily_token: string;
  duration: string;
  hashpower: string;
  status: string;
  image: string;
  is_deleted: string;
};



const options = [
  { value: "0", label: 'Active' },
  { value: "1", label: 'Inactive' },
];

const PackageSettings = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    const { status, ...rest } = data;
    const newPackage = { ...rest, status: data.status.value };


    try {
      const token = localStorage.getItem('biztoken');
      const response = await fetch('https://biztoken.fecotrade.com/api/package/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newPackage)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      Swal.fire({
        title: "success",
        text: "Successfully added new package",
        icon: "success"
      });
    } catch (error) {
      console.error('Error occurred while making POST request:', error);
    }
  };


  const customStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#3cb7ed' : '#E2E8F0',
      borderRadius: '10px',
      height: 'full',
      padding: '5px',
      background: 'transparent',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3cb7ed' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: '#2E3A47',
        color: 'white'
      }
    })
  };


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Package" />
      <div className='lg:w-[60%] mx-auto'>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              New
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Package Name
              </label>
              <input
                type="text"
                {...register("package_name", { required: true })}
                placeholder="Package Name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Package Price
              </label>
              <input
                type="text"
                {...register("package_price", { required: true })}
                placeholder="Package Price"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Daily Token
              </label>
              <input
                type="text"
                {...register("daily_token", { required: true })}
                placeholder="Daily Token"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Duration
              </label>
              <input
                type="text"
                {...register("duration", { required: true })}
                placeholder="Duration "
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Hash Power
              </label>
              <input
                type="text"
                {...register("hashpower", { required: true })}
                placeholder="Hash Power"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>


            {/* <div>
              <select
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...register("status")}
              >
                <option className='h-5' value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div> */}

            <div>
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    styles={customStyles}
                    options={options}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        neutral80: "#fff",
                      },
                    })}
                  />
                )}
              />
            </div>
            <button
              className="w-fit mx-auto items-center justify-center  bg-meta-3 py-3 px-10  mb-2 rounded-md text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PackageSettings;