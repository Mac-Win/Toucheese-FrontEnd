export interface ReservationCalendarModalProps {
  availableStartTimes: {
    date: string;
    status: boolean;
    times: string[];
  }[]; // 날짜별 예약 가능한 시간 배열
  onConfirm: (selectedDate: string, selectedTime: string) => void; // 날짜와 시간을 함께 전달
}
