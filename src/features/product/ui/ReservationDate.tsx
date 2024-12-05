"use client";

import ReservationCalendarModal from "@/features/common/components/ReservationCalendar/ReservationCalendarModal";

const studioData = {
  businessHours: { start: "10:00", end: "18:00" },
  businessDays: [1, 2, 3, 4, 5, 6], // 월~토 영업
};

interface ReservationDateProps {
  onConfirm: (date: string, times: string[]) => void;
}

const ReservationDate = ({ onConfirm }: ReservationDateProps) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">촬영 날짜</h3>
    <ReservationCalendarModal
      businessHours={studioData.businessHours}
      businessDays={studioData.businessDays}
      onConfirm={onConfirm}
    />
  </div>
);

export default ReservationDate;
