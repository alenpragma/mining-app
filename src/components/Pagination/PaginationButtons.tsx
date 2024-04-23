import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const PaginationButtons = ({
  setCurrentPage,
  currentPage,
  totalPages,
}: any) => {
  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };
  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <div>
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          showNextButton ? (
            <span className="w-6 h-6 flex items-center justify-center bg-primary rounded-md">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="w-6 h-6 flex items-center justify-center bg-primary rounded-md mr-4">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border text-sm p-2 border-solid border-primary w-6 h-6 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-purple-500 text-white"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
export default PaginationButtons;
