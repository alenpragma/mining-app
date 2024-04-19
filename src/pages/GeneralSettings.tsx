import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Button from '../Ui/Button';
import SelectOptions from '../Ui/SelectOptions';
import { useForm } from 'react-hook-form';
import { InputProps } from 'react-select';

const GeneralSettings = () => {

  const {
    register,
    handleSubmit, control
  } = useForm<InputProps>();

  const options = [
    { value: "0", label: 'Enable' },
    { value: "1", label: 'Disable' },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="General Settings" />
      <div className=''>
        <div>
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              App Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              App Logo
            </label>
            <input
              type="file"
              placeholder="Enter your last name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <Button classes="px-10 my-5" btnName='Update'></Button>
        </div>

        <div className='mt-10'>
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            {'Transaction to USDT'}
          </h2>
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Min. transfare
            </label>
            <input
              type="text"
              placeholder="Min transfare"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Max. transfare
            </label>
            <input
              type="text"
              placeholder="Max transfare"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className='w-full xl:w-1/2'>
            <SelectOptions
              control={control}
              options={options}
              label='Status'
              name="status"
              // defaultValue={formState.status}
              defaultValue={'active'}
              // value={'1'}
              placeholder={'Select...'}
            />
          </div>
          <Button classes="px-10 my-5" btnName='Update'></Button>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default GeneralSettings;