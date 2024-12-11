export interface CalendarDataItem {
  date: string; // "yyyy-MM-dd" 형식의 날짜
  status: boolean; // 예약 가능 여부
  times: string[]; // 예약 가능한 시간 목록
}

export interface CalendarProps {
  availableStartTimes: CalendarDataItem[]; // 날짜별 예약 가능한 시간 배열
  onConfirm: (selectedDate: string, selectedTime: string) => void; // 날짜와 시간을 함께 전달
}
