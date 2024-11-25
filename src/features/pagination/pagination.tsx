const PaginationComponent = ({
  pageNumber,
  totalPages,
  onPageChange,
}: {
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-center items-center gap-4 my-4">
    <button
      disabled={pageNumber === 0}
      onClick={() => onPageChange(pageNumber - 1)}
      className="px-4 py-2 bg-yellow-200 rounded disabled:opacity-50"
    >
      이전
    </button>
    <span>
      {pageNumber + 1} / {totalPages}
    </span>
    <button
      disabled={pageNumber === totalPages - 1}
      onClick={() => onPageChange(pageNumber + 1)}
      className="px-4 py-2 bg-yellow-200 rounded disabled:opacity-50"
    >
      다음
    </button>
  </div>
);

export default PaginationComponent;
