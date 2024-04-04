import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SelectOptions from "../../Ui/SelectOptions";

type status = {
  label: string;
  value: string;
};

type Inputs = {
  id: number;
  package_name: string;
  package_price: string;
  duration: string;
  daily_token: string;
  hashpower: string;
  status: status;

};

export const ViewuserModal = ({ closeModal, userDetail }: any) => {


  console.log(userDetail);




  return (
    <div className="flex justify-center">
      <div
        className="modal-container fixed z-50 flex  mx-auto top-25 bottom-5"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === "modal-container") closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-8 dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[400px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">User Details</h2>

              <strong className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >&times;</strong>
            </div>
            <div className="text-black dark:text-white flex flex-col w-full gap-5.5 p-6.5">


              {/* <img src={userDetail.image} alt="" /> */}
              <p>Name: {userDetail.name}</p>
              <p>Email: {userDetail.email}</p>
              <p>Phone: {userDetail.phone}</p>
              <p>Name: {userDetail.name}</p>
              <p>Referral code: {userDetail.referral_code}</p>
              <p>Sponsor: {userDetail.sponsor}</p>

              <button onClick={() => closeModal()} className="btn w-fit ms-auto flex justify-end rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

