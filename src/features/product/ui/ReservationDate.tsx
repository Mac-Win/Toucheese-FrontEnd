import { AvailableStartTimes } from "@/api/data/availableTime";
import ReservationCalendarModal from "@/features/common/components/ReservationCalendar/ReservationCalendarModal";

const studioData = AvailableStartTimes;

const ReservationDate = () => {
  const handleConfirm = (date: string, time: string) => {
    console.log(`Confirmed: ${date} at ${time}`);
  };

  return (
    <ReservationCalendarModal
      availableStartTimes={studioData.availableStartTimes}
      onConfirm={handleConfirm}
    />
  );
};

export default ReservationDate;
