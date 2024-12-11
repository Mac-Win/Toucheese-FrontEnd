import { CalendarDataItem } from "@/types/CalendarData.type";

interface TimeSelectorProps {
  selectedDate: string;
  calendarData: CalendarDataItem[];
  selectedTime: string | null;
  onTimeClick: (time: string) => void;
  isTimeDisabled: (time: string) => boolean;
}

const TimeSelector = ({
  selectedDate,
  calendarData,
  selectedTime,
  onTimeClick,
  isTimeDisabled,
}: TimeSelectorProps) => {
  // 현재 날짜에 대한 times 가져오기
  const availableTimes =
    calendarData.find((item) => item.date === selectedDate)?.times || [];

  return (
    <div className="mt-4 aspect-video">
      <h4 className="text-lg font-semibold mb-2">
        희망 시간 선택 ({selectedDate})
      </h4>
      {availableTimes.length === 0 ? (
        <p className="text-gray-500">날짜를 먼저 선택해주세요.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {availableTimes.map((time) => (
            <button
              key={time}
              className={`p-2 rounded-full ${
                selectedTime === time
                  ? "shadow-inner bg-custom-bg"
                  : "bg-gray-100 border"
              } ${
                isTimeDisabled(time)
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : ""
              }`}
              onClick={() => !isTimeDisabled(time) && onTimeClick(time)}
              disabled={isTimeDisabled(time)} // 버튼 비활성화
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSelector;
