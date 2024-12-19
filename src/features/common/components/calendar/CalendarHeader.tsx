import { format } from "date-fns";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevious: () => void;
  onNext: () => void;
}

const CalendarHeader = ({
  currentMonth,
  onPrevious,
  onNext,
}: CalendarHeaderProps) => {
  return (
    <div className="flex justify-center gap-4 items-center mb-4">
      <button onClick={onPrevious} className="px-2 py-2" aria-label="이전 달">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#BFBFBF"
        >
          <path
            fillRule="evenodd"
            d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <h2 className="text-lg font-bold">{format(currentMonth, "yyyy-MM")}</h2>
      <button onClick={onNext} className="px-2 py-2" aria-label="다음 달">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#BFBFBF"
        >
          <path
            fillRule="evenodd"
            d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L9.586 10 7.293 7.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default CalendarHeader;
