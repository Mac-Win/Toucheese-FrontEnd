import { CalendarDataItem } from "@/types/CalendarData.type";

interface TimeSelectorProps {
  calendarData: CalendarDataItem[];
  selectedDate: string | null;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

const TimeSelector = ({
  calendarData,
  selectedDate,
  selectedTime,
  setSelectedTime,
}: TimeSelectorProps) => {
  const availableTimes =
    calendarData.find((item) => item.date === selectedDate)?.times || [];

  const morningTimes = availableTimes.filter(
    (time) => parseInt(time.split(":")[0], 10) < 12
  );
  const afternoonTimes = availableTimes.filter(
    (time) => parseInt(time.split(":")[0], 10) >= 12
  );

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-lg">
        예약 가능한 시간대
      </label>

      {/* 오전 */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">오전</h3>
        <div className="flex gap-2 flex-wrap">
          {morningTimes.length > 0 ? (
            morningTimes.map((time) => (
              <span
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`min-w-20 text-center px-4 py-2 rounded-md cursor-pointer ${
                  selectedTime === time
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200"
                }`}
              >
                {time}
              </span>
            ))
          ) : (
            <p className="text-gray-500">예약 가능한 오전 시간이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 오후 */}
      <div>
        <h3 className="font-medium mb-2">오후</h3>
        <div className="flex gap-2 flex-wrap">
          {afternoonTimes.length > 0 ? (
            afternoonTimes.map((time) => (
              <span
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`min-w-20 text-center px-4 py-2 rounded-md cursor-pointer ${
                  selectedTime === time
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200"
                }`}
              >
                {time}
              </span>
            ))
          ) : (
            <p className="text-gray-500">예약 가능한 오후 시간이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
