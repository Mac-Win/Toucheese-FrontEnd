type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const CommonPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-4 cursor-not-allowed"
            : "bg-primary-4 text-white"
        }`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        이전
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded-md ${
            currentPage === index + 1
              ? "bg-primary-5 text-white"
              : "bg-gray-2 hover:bg-gray-3"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-4 cursor-not-allowed"
            : "bg-primary-4 text-black"
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};

export default CommonPagination;
