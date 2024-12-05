"use client";

import { useState } from "react";
import { ReservationCalendarProps } from "@/types/ReservationCalendat.type";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";

const ReservationCalendar = ({
  OperatingHours,
  onConfirm,
}: ReservationCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const generateTimeSlots = () => {
    const [startHour] = OperatingHours.start.split(":").map(Number);
    const [endHour] = OperatingHours.end.split(":").map(Number);
    const times = [];
    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    times.push(`${endHour.toString().padStart(2, "0")}:00`);
    return times;
  };

  const handleDateClick = (date: Date) => {
    if (!isDayDisabled(date)) {
      setSelectedDate(date);
      setSelectedTime(null); // 날짜 변경 시 선택된 시간 초기화
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

  const isDayDisabled = (date: Date | null): boolean => {
    if (!date) return true;
    return date < new Date();
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
      <div className="calendar-header flex justify-between items-center mb-4">
        <button onClick={() => handleMonthChange("prev")}>◀</button>
        <h3>{format(currentMonth, "yyyy년 MM월")}</h3>
        <button onClick={() => handleMonthChange("next")}>▶</button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 mb-2"
          >
            {day}
          </div>
        ))}
        {daysInMonth.map((date) => (
          <button
            key={date.toISOString()} // toISOString()은 null 가능성을 제거
            className={`p-2 rounded ${
              isDayDisabled(date)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : selectedDate && isSameDay(date, selectedDate) // selectedDate 확인
                  ? "bg-cheese-bg text-white"
                  : "bg-custom-bg"
            }`}
            onClick={() => handleDateClick(date)}
            disabled={isDayDisabled(date)}
          >
            {format(date, "d")}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="available-slots mt-4">
          <h4 className="text-lg font-semibold mb-2">
            희망 시간 선택 (
            {selectedDate
              ? format(selectedDate, "yyyy-MM-dd")
              : "날짜를 선택하세요"}
            )
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {generateTimeSlots().map((time) => (
              <button
                key={time}
                className={`p-2 rounded-full text-black ${
                  selectedTime === time
                    ? "bg-btn-color shadow-inner"
                    : "bg-btn-color shadow-none"
                }`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-8">
        <button
          className="w-full bg-cheese-bg text-white py-2 rounded font-bold"
          onClick={handleConfirm}
        >
          예약 확인
        </button>
      </div>
    </div>
  );
};

export default ReservationCalendar;
