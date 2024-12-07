export interface ReservationCalendarModalProps {
  availableStartTimes: { time: string; available: boolean }[];
  onConfirm: (selectedDate: string, selectedTime: string) => void; // 날짜와 시간을 함께 전달
}
