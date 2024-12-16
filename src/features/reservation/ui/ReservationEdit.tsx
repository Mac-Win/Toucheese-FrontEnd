"use client";

import { useState } from "react";
import Image from "next/image";
import { ReservationItems } from "@/api/test/ReservationItem";

interface ReservationEditProps {
  reservationId: string;
}
function ReservationEdit({ reservationId }: ReservationEditProps) {
  const reservation = ReservationItems[0];
  const [selectedDate, setSelectedDate] = useState("2024-12-28");
  const [selectedTime, setSelectedTime] = useState("14:30");

  const availableTimes = {
    morning: ["10:00", "11:00"],
    afternoon: ["12:00", "14:30", "15:30", "17:00", "17:30", "18:00"],
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className="mt-20 bg-gray-100 -mx-4 min-h-screen p-4 pb-24 flex flex-col">
      <div className="p-4 bg-white rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={reservation.profileImage}
              alt="스튜디오 이미지"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{reservation.studioname}</h2>
            <p className="text-gray-500 text-sm">{reservation.createDate}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm rounded ${
              reservation.status === "예약확정"
                ? "bg-yellow-500 text-black"
                : reservation.status === "촬영완료"
                  ? "text-blue-500"
                  : "text-red-500"
            }`}
          >
            {reservation.status}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">날짜 선택</label>
        <div className="flex items-center gap-2">
          {["2024-12-27", "2024-12-28", "2024-12-29"].map((date) => (
            <button
              key={date}
              onClick={() => handleDateChange(date)}
              className={`px-3 py-2 rounded ${
                selectedDate === date
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-200"
              }`}
            >
              {date.slice(5).replace("-", "월 ") + "일"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">예약 가능한 시간대</label>
        <div>
          <p className="mb-2">오전</p>
          <div className="flex gap-2 mb-4">
            {availableTimes.morning.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeChange(time)}
                className={`px-3 py-2 rounded ${
                  selectedTime === time
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          <p className="mb-2">오후</p>
          <div className="flex gap-2">
            {availableTimes.afternoon.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeChange(time)}
                className={`px-3 py-2 rounded ${
                  selectedTime === time
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex gap-2">
        <button className="px-4 py-2 w-1/2 bg-gray-700 text-white rounded">
          예약 취소
        </button>
        <button className="px-4 py-2 w-1/2 bg-yellow-500 text-black rounded">
          예약 변경
        </button>
      </div>
    </div>
  );
}

export default ReservationEdit;
