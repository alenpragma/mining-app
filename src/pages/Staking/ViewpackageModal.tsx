import { formatToLocalDate } from '../../hooks/formatDate';
import { IPackageDetails } from '../../types/packages';

const ViewpackageModal = ({ closeModal, details }: IPackageDetails) => {
  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-8 dark:border-strokedark dark:bg-boxdark h-fit">
          <div className="min-w-full max-w-full lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Package Details
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <div className="text-black dark:text-white flex flex-col w-full gap-5.5 p-6.5">
              {/* <img src={details.image} alt="" /> */}
              <p>
                {' '}
                <span className="font-semibold">Name:</span>{' '}
                {details?.staking_name}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Min Staking:</span>{' '}
                {details?.min_staking}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Max Staking:</span>{' '}
                {details?.max_staking}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Duration: </span>{' '}
                {details?.duration}
              </p>
              <p>
                {' '}
                <span className="font-semibold">APY:</span> {details?.apy}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Monthly RIO:</span>{' '}
                {details?.monthly_roi}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Cancel Status:</span>{' '}
                {details?.status === 1 ? 'Yes' : 'No'}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Charge:</span>{' '}
                {details?.unstake_charge}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Status:</span>{' '}
                {details.status == '0' ? 'Inactive' : 'Active'}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Create Status:</span>{' '}
                {formatToLocalDate(details?.created_at)}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Updated Status:</span>{' '}
                {formatToLocalDate(details?.updated_at)}
              </p>
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
