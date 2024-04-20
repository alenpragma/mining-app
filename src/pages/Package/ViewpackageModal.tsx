import { formatToLocalDate } from '../../hooks/formatDate';
import { IPackageDetails } from '../../types/packages';

const ViewpackageModal = ({ closeModal, details }: IPackageDetails) => {
  return (
    <div className="flex h-full  justify-center place-items-center">
      <div
        className="modal-container fixed z-50 flex mx-auto overflow-auto"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-8 dark:border-strokedark dark:bg-boxdark h-fit">
          <div className="min-w-full w-[400px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Package Details
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <div className="text-black dark:text-white flex flex-col w-full gap-5.5 p-6.5">
              {/* <img src={details.image} alt="" /> */}
              <p>Name: {details?.package_name}</p>
              <p>Package_price: {details?.package_price}</p>
              <p>Daily_token: {details?.daily_token}</p>
              <p>A2i token: {details?.a2i_token}</p>
              <p>Duration: {details?.duration}</p>
              <p>Hashpower: {details?.hashpower}</p>
              <p>Last Updated: {formatToLocalDate(details?.updated_at)}</p>
              <p>Status: {details.status == '0' ? 'Inactive' : 'Active'}</p>
              <button
                onClick={() => closeModal()}
                className="btn w-fit ms-auto flex justify-end rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
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

export default ViewpackageModal;
