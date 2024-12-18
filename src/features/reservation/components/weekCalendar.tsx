import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
  isToday, // isToday 함수 추가
} from "date-fns";

interface WeekCalendarGridProps {
  createDate: string | null;
  selectedDate: string | null;
  onDateClick: (date: string) => void;
  isDayDisabled: (date: Date) => boolean;
}

const WeekCalendarGrid = ({
  createDate,
  selectedDate,
  onDateClick,
  isDayDisabled = () => false, // 기본값 설정
}: WeekCalendarGridProps) => {
  const createDateObject = createDate ? parseISO(createDate) : new Date();
  const weekStart = startOfWeek(createDateObject, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(createDateObject, { weekStartsOn: 0 });

  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="grid grid-cols-7 gap-2 justify-between">
      {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
        <div key={day} className="text-center font-semibold text-gray-600">
          {day}
        </div>
      ))}

      {weekDays.map((day) => {
        const dateFormatted = format(day, "yyyy-MM-dd");
        const isSelected = selectedDate === dateFormatted;
        const isDisabled = !isToday(day) && isDayDisabled(day);

        return (
          <button
            key={day.toString()}
            className={`rounded-full w-10 h-10 mx-auto ${
              isSelected
                ? "bg-yellow-300 text-black font-bold"
                : isDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : ""
            }`}
            onClick={() => onDateClick(dateFormatted)}
            disabled={isDisabled}
          >
            {format(day, "d")}
          </button>
        );
      })}
    </div>
  );
};

export default WeekCalendarGrid;
