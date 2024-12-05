"use client";

import ReservationCalendarModal from "@/features/common/components/ReservationCalendar/ReservationCalendarModal";
import { ReservationCalendarProps } from "@/types/ReservationCalendat.type";
const studioData = {
  OperatingHours: { start: "10:00", end: "18:00" },
  businessDays: [1, 2, 3, 4, 5, 6], // 월~토 영업
};

const ReservationDate = ({ onConfirm }: ReservationCalendarProps) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">촬영 날짜</h3>
    <ReservationCalendarModal
      OperatingHours={studioData.OperatingHours}
      businessDays={studioData.businessDays}
      onConfirm={onConfirm}
    />
  </div>
);

export default ReservationDate;
