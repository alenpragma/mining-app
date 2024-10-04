import { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import { userToken } from '../hooks/getTokenFromstorage';
import InputField from '../components/Forms/InputField';

type IPopUp = {
  id: number;
  title: string;
  description: string;
  link: string;
  status: string;
  app_version: string;
};

const PopUp = () => {
  const [lodaing, setLoading] = useState(false);
  const [updateLodaing, setUpdateLodaing] = useState(false);
  const [popup, setPopup] = useState<IPopUp>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPopUp>();

  const fetchData = async () => {
    const userToken = localStorage.getItem('biztoken');

    if (!userToken) {
      console.error('No token found');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        'https://mining.bizex.io/api/popup-details',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);

      if (response?.data) {
        setPopup(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<IPopUp> = async (data: IPopUp) => {
    setUpdateLodaing(true);
    // Replace empty fields in data with values from popup
    const updatedData: IPopUp = { ...data };
    if (popup && updatedData) {
      for (const key in updatedData) {
        if (updatedData.hasOwnProperty(key)) {
          const value = updatedData[key as keyof IPopUp];
          if (typeof value === 'string' || typeof value === 'number') {
            updatedData[key as keyof IPopUp] =
              value === ''
                ? (popup[key as keyof IPopUp] as typeof value) || ''
                : value;
          }
        }
      }
    }
    const newData = { ...updatedData, id: popup?.id! };
    console.log('Updated data:', newData);

    try {
      const response = await fetch(
        'https://mining.bizex.io/api/popup-setting/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(newData),
        },
      );

      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setUpdateLodaing(false);
      if (response) {
        fetchData();
        Swal.fire({
          title: 'success',
          text: 'Successfully Update Pop Up Settings',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Faield',
        text: 'Failed to update settings',
        icon: 'error',
      });
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pop Up Settings" />
      <div>
        {
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5.5 p-6.5"
          >
            <InputField
              label="title"
              name="title"
              register={register}
              placeholder="title"
              defaultValue={popup?.title}
            />
            <InputField
              label="Description"
              name="description"
              register={register}
              placeholder="Description"
              defaultValue={popup?.description}
            />
            <InputField
              label="Link"
              name="link"
              register={register}
              placeholder="Link"
              defaultValue={popup?.link}
            />

            <InputField
              label="Status"
              name="status"
              register={register}
              placeholder="Status"
              defaultValue={popup?.status}
            />

            <InputField
              label="App Version"
              name="app_version"
              register={register}
              placeholder="App Version"
              defaultValue={popup?.app_version}
            />

            {lodaing ? (
              <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
            ) : (
              <button className="w-fit mx-auto items-center justify-center bg-meta-3 py-3 px-10 mb-2 rounded-md text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Update
              </button>
            )}
          </form>
        }
      </div>
    </DefaultLayout>
  );
};

export default PopUp;
