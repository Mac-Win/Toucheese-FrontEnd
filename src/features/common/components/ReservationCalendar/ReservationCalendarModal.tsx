import { useState } from "react";
import { ReservationCalendarModalProps } from "@/types/ReservationCalendat.type";
import ReservationCalendar from "./ReservationCalendar";

const ReservationCalendarModal = ({
  availableStartTimes,
  onConfirm,
}: ReservationCalendarModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleCalendarConfirm = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsOpen(false);
    onConfirm(date, time);
  };

  return (
    <div>
      {/* 선택된 날짜 및 시간 표시 */}
      <div
        className="w-full flex items-center justify-between border p-2 rounded cursor-pointer bg-gray-100"
        onClick={() => setIsOpen(true)}
      >
        <div>
          {selectedDate && selectedTime
            ? `${selectedDate} (${selectedTime})`
            : "희망 날짜와 시간을 선택해주세요."}
        </div>
      </div>

      {/* 모달 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">희망 날짜와 시간</h3>
            {/* 캘린더 컴포넌트 */}
            <ReservationCalendar
              availableStartTimes={availableStartTimes} // 필터링된 시간 전달
              onConfirm={handleCalendarConfirm}
            />
            {/* 닫기 버튼 */}
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
