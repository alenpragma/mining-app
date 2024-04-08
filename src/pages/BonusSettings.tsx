import React, { ChangeEvent, useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';

interface IInput {
  refer_comission: string;
  level_comission_1: string;
  level_commission_2: string;
  level_comission_3: string;
}
const BonusSettings = () => {


  const token = localStorage.getItem('biztoken');
  const [bonusData, setBonusData] = useState<any>('');


  const fetchData = async () => {
    try {
      const response = await axios.get('https://biztoken.fecotrade.com/api/comission-setting', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setBonusData(response?.data[0] || {}); // Assuming your data is an object
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(bonusData.length);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInput>();




  const onSubmit: SubmitHandler<IInput> = async (data: IInput) => {
    console.log(data);
    return;
    try {
      const response = await fetch('  https://biztoken.fecotrade.com/api/comission-setting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      Swal.fire({
        title: "success",
        text: "Successfully Add Bonus Settings",
        icon: "success"
      });
    } catch (error) {
      console.error('Error occurred while making POST request:', error);
    }
  };
  console.log(bonusData[0]);


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bonus Settings" />
      <div>
        {
          bonusData.length < 1 ? ''
            :
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">

              {/* <div>
                <label className="mb-3 block text-black dark:text-white">
                  Free Mining Rewards
                </label>
                <input
                  type="text"
                  {...register("refer_comission", { required: true })}
                  placeholder="Free Mining Rewards"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div> */}

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Refer Commission (%)
                </label>
                <input
                  type="text"
                  {...register("refer_comission", { required: true })}
                  placeholder="Refer Commission"
                  defaultValue={bonusData[0]?.refer_comission} // Assuming refer_comission is a field in bonusData
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

                      {...register("level_comission_1", { required: true })}
                      placeholder="Level-1"
                      defaultValue={bonusData[0]?.level_comission_1}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mt-3 block text-black dark:text-white">
                      Level 2 (%)
                    </label>
                    <input
                      type="text"
                      {...register("level_commission_2", { required: true })}
                      placeholder="Level-2"
                      defaultValue={bonusData[0]?.level_commission_2}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mt-3 block text-black dark:text-white">
                      Level 3 (%)
                    </label>
                    <input
                      type="text"
                      {...register("level_comission_3", { required: true })}
                      placeholder="Level-3"
                      defaultValue={bonusData[0]?.level_comission_3}
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
        }

      </div>
    </DefaultLayout>
  );
};

export default BonusSettings;


