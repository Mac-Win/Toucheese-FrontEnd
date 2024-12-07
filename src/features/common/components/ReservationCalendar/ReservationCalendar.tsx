import { useState } from "react";
import { ReservationCalendarModalProps } from "@/types/ReservationCalendat.type";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";

const ReservationCalendar = ({
  availableStartTimes,
  onConfirm,
}: ReservationCalendarModalProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleDateClick = (date: Date) => {
    if (!isDayDisabled(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime((prev) => (prev === time ? null : time));
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }
    if (!selectedTime) {
      alert("시간을 선택해주세요.");
      return;
    }
    onConfirm(format(selectedDate, "yyyy-MM-dd"), selectedTime);
  };

  const isDayDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) =>
      direction === "prev"
        ? new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        : new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  return (
    <div className="reservation-calendar">
      {/* 달력 헤더 */}
      <div className="calendar-header flex justify-between items-center mb-4">
        <button onClick={() => handleMonthChange("prev")}>◀</button>
        <h3>{format(currentMonth, "yyyy년 MM월")}</h3>
        <button onClick={() => handleMonthChange("next")}>▶</button>
      </div>

      {/* 날짜 선택 */}
      <div className="grid grid-cols-7 gap-2 justify-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
        {daysInMonth.map((date) => (
          <button
            key={date.toISOString()}
            className={`rounded-full w-10 h-10 mx-auto border ${
              isDayDisabled(date)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : selectedDate && isSameDay(date, selectedDate)
                  ? "border-yellow-400"
                  : "border-gray-300"
            }`}
            onClick={() => handleDateClick(date)}
            disabled={isDayDisabled(date)}
          >
            {format(date, "d")}
          </button>
        ))}
      </div>

      {/* 시간 선택 */}
      {selectedDate && (
        <div className="available-slots mt-4">
          <h4 className="text-lg font-semibold mb-2">
            희망 시간 선택 ({format(selectedDate, "yyyy-MM-dd")})
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {availableStartTimes.map((item, index) => (
              <button
                key={`${item.time}-${index}`}
                onClick={() => handleTimeClick(item.time)}
                className={`p-2 rounded-full ${
                  item.available
                    ? selectedTime === item.time
                      ? "shadow-inner bg-custom-bg"
                      : "bg-gray-100 border"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!item.available}
              >
                {item.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 확인 버튼 */}
      <div className="mt-8">
        <button
          className="w-full bg-yellow-500 text-white py-2 rounded font-bold"
          onClick={handleConfirm}
        >
          예약 확인
        </button>
      </div>
    </div>
  );
};

export default ReservationCalendar;
