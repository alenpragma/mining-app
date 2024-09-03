import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import SelectOptions from '../../Ui/SelectOptions';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosConfig';
import { SubmitHandler, useForm } from 'react-hook-form';

type IKyc = {
  id: string;
  user_id: string;
  type: any;
};

const ApproveKycModal = ({ toggleUpdateModal, updateData }: any) => {
  const [lodaing, setLoading] = useState(false);
  const { handleSubmit, control } = useForm<IKyc>();

  const onSubmit: SubmitHandler<IKyc> = async (data: IKyc) => {
    const kycData = {
      id: updateData.id,
      user_id: updateData.user_id,
      type: data?.type?.value,
    };

    if (kycData.type == undefined) {
      Swal.fire({
        title: 'warning',
        text: 'Select wallet',
        icon: 'warning',
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post('/admin/kyc-check', kycData);
      // console.log(response.data);

      if (response.data.success === 200) {
        setLoading(false);
        Swal.fire({
          title: 'success',
          text: `${response?.data?.messgae}`,
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
    { value: 'approve', label: 'approve' },
    { value: 'reject', label: 'reject' },
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
              <h2 className="text-xl font-bold ">KYC Update</h2>
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
                <div className="flex gap-3 flex-wrap">
                  <div className="">
                    <p>Profile Image</p>
                    <img
                      className="w-52"
                      src={updateData?.profile_image}
                      alt=""
                    />
                  </div>

                  <div className="">
                    <p>Front Page</p>
                    <img className="w-52" src={updateData?.id_front} alt=" " />
                  </div>

                  <div className="">
                    <p>Back Page</p>
                    <img className="w-52" src={updateData?.id_back} alt="" />
                  </div>
                </div>

                <SelectOptions
                  name="type"
                  control={control}
                  defaultValue={99}
                  label="Type"
                  options={options}
                  placeholder="Type"
                  rules={{ required: 'This field is required' }} // Add a validation rule
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

export default ApproveKycModal;
