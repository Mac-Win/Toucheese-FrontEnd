"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  // getDay,
  isSameDay,
} from "date-fns";

interface ReservationCalendarProps {
  businessHours: { start: string; end: string };
  businessDays: number[]; // 영업일 (0 = 일요일, 1 = 월요일, ...)
  onConfirm: (date: string, times: string[]) => void; // 선택 결과 반영
}

const ReservationCalendar = ({
  businessHours,
  // businessDays,
  onConfirm,
}: ReservationCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // 현재 월의 모든 날짜 가져오기
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // 시간 생성 (영업시간 기준)
  // businessHours: { start: "10:00", end: "18:00" }, 이렇게 주어진 영업시간을 split을 통해서 자른후,
  // times에 배열로 반환하여 그 배열을 map을 통해 화면에 구현
  const generateTimeSlots = () => {
    const [startHour] = businessHours.start.split(":").map(Number);
    const [endHour] = businessHours.end.split(":").map(Number);
    const times = [];
    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    times.push(`${endHour.toString().padStart(2, "0")}:00`);
    return times;
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date: Date) => {
    if (date === null) {
      console.error("Invalid date: null value provided.");
      return;
    }
    if (!isDayDisabled(date)) {
      setSelectedDate(date);
      setSelectedTimes([]); // 날짜 변경 시 선택된 시간 초기화
    }
  };

  // 시간 클릭 핸들러
  const handleTimeClick = (time: string) => {
    setSelectedTimes(
      (prev) =>
        prev.includes(time)
          ? prev.filter((t) => t !== time) // 이미 선택된 시간은 제거
          : [...prev, time] // 새로운 시간 추가
    );
  };

  // 예약 확인
  const handleConfirm = () => {
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }
    if (selectedTimes.length === 0) {
      alert("시간을 선택해주세요.");
      return;
    }
    onConfirm(format(selectedDate, "yyyy-MM-dd"), selectedTimes);
  };

  // 날짜 비활성화 로직
  const isDayDisabled = (date: Date | null): boolean => {
    if (!date) {
      return true; // null인 경우 비활성화
    }
    // const day = getDay(date); // 0 = 일요일, 1 = 월요일 ...

    return date < new Date();
    // !businessDays.includes(day) || 이부분을 return문에서 제거 왜냐하면 businessDays를 설정하여 고정휴일을 설정하고자 했으나,
    // 이로인해 다음달로 이동시에 휴일이 바뀌는 이슈가 생김
  };

  // 월 변경
  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) =>
      direction === "prev"
        ? new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        : new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  return (
    <div className="reservation-calendar">
      {/* 헤더 */}
      <div className="calendar-header flex justify-between items-center mb-4">
        <button onClick={() => handleMonthChange("prev")}>◀</button>
        <h3>{format(currentMonth, "yyyy년 MM월")}</h3>
        <button onClick={() => handleMonthChange("next")}>▶</button>
      </div>

      {/* 날짜 */}
      <div className="calendar-grid grid grid-cols-7 gap-2">
        {/* 요일 표시 */}
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 mb-2"
          >
            {day}
          </div>
        ))}

        {/* 날짜 표시 */}
        {daysInMonth.map((date) => (
          <button
            key={date?.toString() || "null"} // null 대비
            className={`p-2 rounded ${
              isDayDisabled(date)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isSameDay(date, selectedDate)
                  ? "bg-yellow-400 text-white"
                  : "bg-custom-bg"
            }`}
            onClick={() => date && handleDateClick(date)} // null 확인
            disabled={isDayDisabled(date)}
          >
            {date ? format(date, "d") : "N/A"}
          </button>
        ))}
      </div>

      {/* 예약 가능한 시간 */}
      {selectedDate && (
        <div className="available-slots mt-4">
          <h4 className="text-lg font-semibold mb-2">
            희망 시간 선택 ({format(selectedDate, "yyyy-MM-dd")})
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {generateTimeSlots().map((time) => (
              <button
                key={time}
                className={`p-2 rounded ${
                  selectedTimes.includes(time)
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200"
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
