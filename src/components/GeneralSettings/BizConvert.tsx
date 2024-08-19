import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../Ui/Button';
import InputField from '../Forms/InputField';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';

interface IInput {
  conversion_ratio: string | number;
}

const BizConvert = () => {
  const { register, handleSubmit } = useForm<IInput>();
  const [lodaing, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IInput> = async (data: IInput) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/convert-biz-to-bizt', data);
      if (response) {
        Swal.fire({
          title: 'Successfully Convert',
          text: 'Successfully convert BIZ to BIZT',
          icon: 'success',
        });
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        console.error('Error updating:', error);
        Swal.fire({
          title: 'Failed',
          text: 'Failed to added package',
          icon: 'error',
        });
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="mt-10">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {'BIZ Convert'}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5.5 lg:w-1/2"
        >
          <InputField
            label="Conversion Ratio (%)"
            name="conversion_ratio"
            register={register}
            placeholder="Conversion Ratio"
            defaultValue=""
          />
          <div>
            {lodaing ? (
              <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
            ) : (
              <button
                className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit"
              >
                Convert Biz
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default BizConvert;
