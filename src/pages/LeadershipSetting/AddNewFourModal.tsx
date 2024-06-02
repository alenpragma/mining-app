import { useState } from 'react';
import { PuffLoader } from 'react-spinners';

const AddNewFourModal = ({ closeModal }: any) => {
  const [lodaing] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className=" w-[350px] md:w-[420px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold ">Add New</h2>
              <strong
                className="text-4xl align-cente cursor-pointer hover:text-black dark:hover:text-white "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Paid Team Member (QTY){' '}
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  // {...register('wallet_no', { required: true })}
                  // value={formState.wallet_no}
                  // onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Bonus (USDT)
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  // {...register('min_token', { required: true })}
                  // value={formState.min_token}
                  // onChange={handleChange}
                />
              </div>

              {/* <SelectOptions
              name="status"
              control={control}
              defaultValue={Number(formState.status)}
              label="status"
              options={options}
              placeholder="status"
            /> */}

              {lodaing ? (
                <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
              ) : (
                <button
                  className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewFourModal;
