import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { IPackage } from '../../types/packages';

interface IUpdatePackage {
  fetchData: () => void;
  closeModal: () => void;
  packageItem: IPackage | any;
}

export const UpdatePackageModal = ({
  fetchData,
  closeModal,
  packageItem,
}: IUpdatePackage) => {
  const options = [
    { value: '0', label: 'Inactive' },
    { value: '1', label: 'Active' },
  ];

  const [formState, setFormState] = useState({ ...packageItem });
  const { register, handleSubmit, control } = useForm<IPackage>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit: SubmitHandler<IPackage> = async (data: IPackage) => {
    const newData = { ...data, id: packageItem.id, status: data.status.value };

    try {
      const token = localStorage.getItem('biztoken');
      const response = await fetch(
        'https://biztoken.fecotrade.com/api/package/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        Swal.fire({
          title: 'success',
          text: 'Successfully updated package',
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className="modal-container  fixed z-50 flex  mx-auto top-25 bottom-5"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[400px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Update Package
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <div>
                <p>Package name</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('package_name', { required: true })}
                  value={formState.package_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Package price</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('package_price', { required: true })}
                  value={formState.package_price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Daily token</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('daily_token', { required: true })}
                  value={parseFloat(formState.daily_token)}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>A2i token</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('a2i_token', { required: true })}
                  value={parseFloat(formState.a2i_token)}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Duration</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('duration', { required: true })}
                  value={formState.duration}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Hashpower</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('hashpower', { required: true })}
                  value={formState.hashpower}
                  onChange={handleChange}
                />
              </div>

              {/* <div>
                <p>status</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("status", { required: true })}
                  value={formState.status}
                  onChange={handleChange}
                />

              </div> */}
              <div>
                <SelectOptions
                  control={control}
                  options={options}
                  label="Status"
                  name="status"
                  defaultValue={formState.status}
                  // value={'1'}
                  placeholder={'Select...'}
                />
              </div>
              <button
                className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
