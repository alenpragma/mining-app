import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../Ui/Button';
import InputField from '../Forms/InputField';

interface IInput {
  id: string;
  minimum_convert: string;
  maximum_convert: string;
  charge: string;
  duration: string;
  created_at: string;
  updated_at: string;
}

const BizConvert = () => {
  const { register, handleSubmit } = useForm<IInput>();

  const onSubmit: SubmitHandler<IInput> = async (data: IInput) => {
    console.log(data);
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
            name="conversion ratio"
            register={register}
            placeholder="Minimum"
            defaultValue={'100'}
          />

          <Button cs="px-10 w-fit my-5 bg-primary" btnName="Convert BIZ"></Button>
        </form>
      </div>
    </>
  );
};

export default BizConvert;
