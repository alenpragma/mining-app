import { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';

interface IInput {
  free_mining_rewards: string;
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInput>();



  const onSubmit: SubmitHandler<IInput> = async (data: IInput) => {

    const newData = { ...data, id: bonusData[0]?.id };

    try {
      const response = await fetch('https://biztoken.fecotrade.com/api/comission-setting/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success) {
        reset();
        fetchData();
        Swal.fire({
          title: "success",
          text: "Successfully Update Bonus Settings",
          icon: "success"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Faield",
        text: "Failed to update settings",
        icon: "error"
      });
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bonus Settings" />
      <div>
        {
          // bonusData.length < 1 ? ''
          //   :
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Free Mining Rewards
              </label>
              <input
                type="text"
                {...register("free_mining_rewards", { required: true })}
                placeholder="Free Mining Rewards"
                defaultValue={bonusData[0]?.free_mining_rewards}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Refer Commission (%)
              </label>
              <input
                type="text"
                {...register("refer_comission", { required: true })}
                placeholder="Refer Commission"
                defaultValue={bonusData[0]?.refer_comission}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <h2 className='text-2xl font-bold pb-3 text-white'>Level Commission</h2>

              <div>
                <div>
                  <label className="mt-3 block text-black dark:text-white">
                    Level one (%)
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
                    Level two (%)
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
                    Level three (%)
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
              Update
            </button>
          </form>
        }

      </div>
    </DefaultLayout>
  );
};

export default BonusSettings;


