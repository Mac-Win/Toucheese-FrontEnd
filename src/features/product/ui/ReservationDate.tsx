import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  isBefore,
  parse,
  startOfDay,
} from "date-fns";
import useCalendarData from "../hooks/useCalendar";
import CalendarHeader from "@/features/common/components/calendar/CalendarHeader";
import CalendarGrid from "@/features/common/components/calendar/CalendarGrid";
import TimeSelector from "@/features/common/components/calendar/TimeSelector";
import ConfirmButton from "@/features/common/components/calendar/ConfirmButton";

interface ReservationDateProps {
  studioId: number;
  onDateTimeSelect: (date: string | null, time: string | null) => void;
  onCloseModal: () => void;
}

const ReservationDate = ({
  studioId,
  onDateTimeSelect,
  onCloseModal,
}: ReservationDateProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { calendarData, loading, error } = useCalendarData(
    studioId,
    currentMonth
  );

  const isDayDisabled = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const calendarItem = calendarData.find(
      (item) => item.date === formattedDate
    );

    // 오늘의 시작 시간으로 기준 변경
    const todayStart = startOfDay(today);

    return isBefore(date, todayStart) || calendarItem?.status === false;
  };

  const isTimeDisabled = (time: string) => {
    if (!selectedDate) return true; // 날짜가 선택되지 않으면 모든 시간 비활성화

    const selectedDateTime = parse(selectedDate, "yyyy-MM-dd", today);
    const [hour, minute] = time.split(":").map(Number);
    const selectedTime = new Date(selectedDateTime);
    selectedTime.setHours(hour, minute, 0);

    // 금일의 경우 현재시간보다 이전 시간 비활성화
    if (
      format(selectedDateTime, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
    ) {
      return isBefore(selectedTime, today);
    }

    return false; // 다른 날짜의 시간은 모두 활성화
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }
    onDateTimeSelect(selectedDate, selectedTime);
    onCloseModal();
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevious={() => setCurrentMonth(subMonths(currentMonth, 1))}
        onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        today={today}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
        isDayDisabled={isDayDisabled}
      />
      {selectedDate && (
        <TimeSelector
          selectedDate={selectedDate}
          calendarData={calendarData}
          selectedTime={selectedTime}
          onTimeClick={setSelectedTime}
          isTimeDisabled={isTimeDisabled} // 시간 비활성화 전달
        />
      )}
      <ConfirmButton onConfirm={handleConfirm} />
    </div>
  );
};

export default ReservationDate;
