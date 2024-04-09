

export const ViewuserModal = ({ closeModal, userDetail }: any) => {

  return (
    <div className="flex justify-center">
      <div
        className="modal-container fixed z-50 flex  mx-auto top-25 bottom-5"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === "modal-container") closeModal();
        }}
      >
        <div className="modal h-fit rounded-sm border border-stroke bg-white shadow-8 dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[400px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">User Details</h2>
              <strong className="text-4xl align-center cursor-pointer"
                onClick={closeModal}
              >&times;</strong>
            </div>

            <hr />
            <div className="text-black dark:text-white flex flex-col w-full gap-5.5 p-6.5">
              {/* <img src={userDetail.image} alt="" /> */}
              <p>Name: {userDetail.name}</p>
              <p>Email: {userDetail.email}</p>
              <p>Phone: {userDetail.phone}</p>
              <p>Name: {userDetail.name}</p>
              <p>Referral code: {userDetail.referral_code}</p>
              <p>Sponsor: {userDetail.sponsor}</p>
            </div>
            <button onClick={() => closeModal()} className="btn w-fit mx-3 ms-auto flex justify-end rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            >
              Close
            </button>
          </div>
        </div>


      </div>
    </div>

  );
};

