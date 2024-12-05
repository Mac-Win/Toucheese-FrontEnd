"use client";

import { useState } from "react";
import ReservationCalendar from "./ReservationCalendar";

interface ReservationCalendarModalProps {
  businessHours: { start: string; end: string };
  businessDays: number[];
  onConfirm: (date: string, times: string[]) => void;
}

const ReservationCalendarModal = ({
  businessHours,
  businessDays,
  onConfirm,
}: ReservationCalendarModalProps) => {
  const [isOpen, setIsOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]); // 선택된 시간

  const handleCalendarConfirm = (date: string, times: string[]) => {
    setSelectedDate(date);
    setSelectedTimes(times);
    setIsOpen(false); // 모달 닫기
    onConfirm(date, times); // 부모 컴포넌트로 전달
  };

  return (
    <div>
      <div
        className="w-full flex items-center justify-between border p-2 rounded cursor-pointer bg-gray-100"
        onClick={() => setIsOpen(true)}
      >
        <div>
          {selectedDate
            ? `${selectedDate} (${selectedTimes.join(", ")})`
            : "희망 날짜와 시간을 선택해주세요."}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-custom-bg rounded-lg shadow-lg p-6 w-full max-w-custom">
            <h3 className="text-lg font-semibold mb-4">희망 날짜와 시간</h3>
            <ReservationCalendar
              businessHours={businessHours}
              businessDays={businessDays}
              onConfirm={handleCalendarConfirm}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCalendarModal;
