import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosConfig';
import SelectOptions from '../../Ui/SelectOptions';
import { PuffLoader } from 'react-spinners';

type IBlock = {
  id: string;
  user_id: string;
  type: any;
};

const BlockUnBlockModal = ({
  toggleUpdateModal,
  updateData,
  fetchData,
}: any) => {
  const [lodaing, setLoading] = useState(false);
  const { handleSubmit, control } = useForm<IBlock>();
  const onSubmit: SubmitHandler<IBlock> = async (data: IBlock) => {
    const updatedData = {
      user_id: updateData.id,
      type: data?.type?.value,
    };
    if (updatedData.type == undefined) {
      Swal.fire({
        title: 'warning',
        text: 'Select wallet',
        icon: 'warning',
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        '/admin/user-block-unblock',
        updatedData,
      );

      if (response.data.success === 200) {
        setLoading(false);
        fetchData();
        Swal.fire({
          title: 'success',
          text: `${response?.data?.message}`,
          icon: 'success',
        }).then(() => {
          toggleUpdateModal(false);
        });
      }
    } catch (error) {
      setLoading(false);

      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      }).then(() => {
        toggleUpdateModal(false);
      });
    }
  };

  const options = [
    { value: 'block', label: 'Block' },
    { value: 'unblock', label: 'Unblock' },
  ];

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') toggleUpdateModal(false);
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className=" w-[350px] md:w-[420px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold ">Update User Validity</h2>
              <strong
                className="text-4xl align-cente cursor-pointer hover:text-black dark:hover:text-white "
                onClick={() => toggleUpdateModal(false)}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <div className="">
                <div>
                  <img
                    className="w-52"
                    src={updateData?.profile_image}
                    alt=""
                  />
                  <img className="w-52" src={updateData?.id_front} alt="" />
                  <img className="w-52" src={updateData?.id_back} alt="" />
                </div>

                <SelectOptions
                  name="type"
                  control={control}
                  defaultValue={9}
                  label="Type"
                  options={options}
                  placeholder="Type"
                />
              </div>

              {lodaing ? (
                <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
              ) : (
                <button
                  className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockUnBlockModal;
