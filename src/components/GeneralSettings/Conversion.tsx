import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../Ui/Button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import InputField from '../Forms/InputField';
import axiosInstance from '../../utils/axiosConfig';

interface IInput {
  id: string;
  minimum_convert: string;
  maximum_convert: string;
  charge: string;
  duration: string;
  created_at: string;
  updated_at: string;
}

const Conversion = () => {
  // const [lodaing, setLoading] = useState(false);
  const [conversion, setConversion] = useState<any>([]);
  const { register, handleSubmit } = useForm<IInput>();

  const fetchData = async () => {
    const response = await axiosInstance.get('/convert-setting');
    setConversion(response?.data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<IInput> = async (data: IInput) => {
    for (const key in data) {
      if (data[key as keyof IInput] === '') {
        data[key as keyof IInput] = conversion[0][key];
      }
    }

    const newData = {
      ...data,
      id: conversion[0]?.id,
    };

    try {
      const response = await axiosInstance.post(
        '/convert-setting/update',
        newData,
      );
      console.log('Response:', response.data);

      Swal.fire({
        title: 'Success',
        text: 'Successfully Updated',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error updating:', error);
      Swal.fire({
        title: 'Failed',
        text: 'Failed to update',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <div className="mt-10">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {'Conversion Setting'}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5.5 lg:w-1/2"
        >
          <InputField
            label="Minimum Convert (BIZ)"
            name="minimum_convert"
            register={register}
            placeholder="Minimum"
            defaultValue={
              conversion && (conversion[0]?.minimum_convert as string)
            }
          />

          <InputField
            label="Maximum Convert (BIZ)"
            name="maximum_convert"
            register={register}
            placeholder="Max"
            defaultValue={conversion && conversion[0]?.maximum_convert}
          />

          <InputField
            label="charge %"
            name="charge"
            register={register}
            placeholder="charge"
            defaultValue={conversion && conversion[0]?.charge}
          />

          <InputField
            label="Convert Day"
            name="duration"
            register={register}
            placeholder="duration"
            defaultValue={conversion && conversion[0]?.duration}
          />

          <Button cs="px-10 w-fit my-5 bg-primary" btnName="Update"></Button>
        </form>
      </div>
    </>
  );
};

export default Conversion;
