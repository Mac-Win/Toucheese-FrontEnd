import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isBefore,
} from "date-fns"; // date-fns 사용
import useCalendarData from "../hooks/useCalendar";

interface ReservationDateProps {
  studioId: number;
  onDateTimeSelect: (date: string | null, time: string | null) => void;
  onCloseModal: () => void; // 모달 닫기 함수 추가
}

const ReservationDate = ({
  studioId,
  onDateTimeSelect,
  onCloseModal,
}: ReservationDateProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Custom hook 사용
  const { calendarData, loading, error } = useCalendarData(
    studioId,
    currentDate
  );

  const changeMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) =>
      direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  const monthDays = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  // 오늘 이전 날짜 또는 status가 false인 날짜 비활성화
  const isDayDisabled = (date: Date): boolean => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const calendarItem = calendarData.find(
      (item) => item.date === formattedDate
    );
    return isBefore(date, today) || calendarItem?.status === false;
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }
    onDateTimeSelect(selectedDate, selectedTime); // 부모로 날짜, 시간 전달
    onCloseModal(); // 모달 닫기
  };

  return (
    <div className="w-full">
      {/* 달력 헤더 */}
      <div className="calendar-header flex justify-between items-center mb-4">
        <button onClick={() => changeMonth("prev")} className="px-4 py-2">
          이전 달
        </button>
        <h2 className="text-lg font-bold">{format(currentDate, "yyyy-MM")}</h2>
        <button onClick={() => changeMonth("next")} className="px-4 py-2">
          다음 달
        </button>
      </div>

      {/* 달력 UI */}
      <div className="grid grid-cols-7 gap-2 justify-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {/* 날짜 표시 */}
        {monthDays.map((day) => (
          <button
            key={day.toString()} // 날짜별로 key 설정
            className={`rounded-full w-10 h-10 mx-auto border ${
              selectedDate === format(day, "yyyy-MM-dd")
                ? "border-yellow-400 "
                : isToday(day)
                  ? "bg-cheese-bg"
                  : isDayDisabled(day)
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-custom-bg"
            }`}
            onClick={() => handleDateClick(format(day, "yyyy-MM-dd"))}
            disabled={isDayDisabled(day)} // 오늘 이전 날짜 비활성화
          >
            {format(day, "d")}
          </button>
        ))}
      </div>

      {/* 예약 가능한 시간 UI */}
      {selectedDate && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">
            희망 시간 선택 ({selectedDate})
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {/* 선택된 날짜의 예약 가능한 시간만 표시 */}
            {calendarData
              .find((calendarItem) => calendarItem.date === selectedDate)
              ?.times.map((time) => (
                <button
                  key={time}
                  className={`p-2 rounded-full ${
                    selectedTime === time
                      ? "shadow-inner bg-custom-bg"
                      : "bg-gray-100 border"
                  }`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* 예약 확인 버튼 */}
      <div className="mt-8">
        <button
          className="w-full bg-yellow-500 text-white py-2 rounded font-bold"
          onClick={handleConfirm}
        >
          예약 확인
        </button>
      </div>

      {/* 로딩 및 오류 처리 */}
      {loading && <div>로딩 중...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ReservationDate;
