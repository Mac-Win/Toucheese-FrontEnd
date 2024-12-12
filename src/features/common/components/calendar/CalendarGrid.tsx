import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday, // Make sure this is included
} from "date-fns";

interface CalendarGridProps {
  currentMonth: Date;
  today: Date;
  selectedDate: string | null;
  onDateClick: (date: string) => void;
  isDayDisabled: (date: Date) => boolean;
}

const CalendarGrid = ({
  currentMonth,
  selectedDate,
  onDateClick,
  isDayDisabled,
}: CalendarGridProps) => {
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const monthDays = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const firstDayWeekday = getDay(firstDayOfMonth);
  const paddedDays = Array.from({ length: firstDayWeekday }).map(() => null);

  return (
    <div className="grid grid-cols-7 gap-2 justify-center">
      {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
        <div key={day} className="text-center font-semibold text-gray-600">
          {day}
        </div>
      ))}

      {[...paddedDays, ...monthDays].map((day, index) =>
        day ? (
          <button
            key={day.toString()}
            className={`rounded-full w-10 h-10 mx-auto border ${
              selectedDate === format(day, "yyyy-MM-dd")
                ? "bg-cheese-bg"
                : isToday(day)
                  ? "border-yellow-400 border-4 bg-custom-bg"
                  : isDayDisabled(day)
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-custom-bg"
            }`}
            onClick={() => onDateClick(format(day, "yyyy-MM-dd"))}
            disabled={isDayDisabled(day)}
          >
            {format(day, "d")}
          </button>
        ) : (
          <div key={index} className="w-10 h-10 mx-auto"></div>
        )
      )}
    </div>
  );
};

export default CalendarGrid;
