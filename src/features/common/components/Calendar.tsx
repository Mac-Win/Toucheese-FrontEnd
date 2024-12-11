import { FC } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isToday,
} from "date-fns";

// CalendarProps 정의
interface CalendarProps {
  currentDate: Date;
  onMonthChange: (direction: "prev" | "next") => void;
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

const Calendar: FC<CalendarProps> = ({
  currentDate,
  onMonthChange,
  onDateSelect,
  selectedDate,
}) => {
  // 현재 월의 시작일과 마지막일을 구함
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  // 해당 월의 날짜 리스트 생성
  const monthDays = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  return (
    <div>
      {/* 달력 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => onMonthChange("prev")} className="px-4 py-2">
          이전 달
        </button>
        <h2 className="text-lg font-bold">{format(currentDate, "yyyy-MM")}</h2>
        <button onClick={() => onMonthChange("next")} className="px-4 py-2">
          다음 달
        </button>
      </div>

      {/* 달력 UI */}
      <div className="grid grid-cols-7 gap-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {/* 날짜 표시 */}
        {monthDays.map((day) => (
          <button
            key={day.toString()} // 날짜별로 key 설정
            className={`p-2 rounded ${
              selectedDate === format(day, "yyyy-MM-dd")
                ? "bg-blue-500 text-white"
                : isToday(day)
                  ? "bg-green-100"
                  : "bg-gray-100"
            }`}
            onClick={() => onDateSelect(format(day, "yyyy-MM-dd"))}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
