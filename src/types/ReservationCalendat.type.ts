export interface ReservationCalendarProps {
  OperatingHours: { start: string; end: string };
  businessDays: number[]; // 영업일 (0 = 일요일, 1 = 월요일, ...)
  onConfirm: (date: string, time: string) => void; // 단일 시간으로 수정
}
