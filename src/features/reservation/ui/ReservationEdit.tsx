"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ReservationItems } from "@/api/test/ReservationItem";
import Link from "next/link";

interface ReservationEditProps {
  reservationId: string;
}

function ReservationEdit({ reservationId }: ReservationEditProps) {
  const [reservation, setReservation] = useState(
    ReservationItems.find((item) => item.reservationId === reservationId) ||
      null
  );

  const [selectedDate, setSelectedDate] = useState("2024-12-28");
  const [selectedTime, setSelectedTime] = useState("14:30");

  const availableTimes = {
    morning: ["10:00", "11:00"],
    afternoon: ["12:00", "14:30", "15:30", "17:00", "17:30", "18:00"],
  };

  useEffect(() => {
    if (reservationId) {
      const foundReservation = ReservationItems.find(
        (item) => item.reservationId === reservationId
      );
      setReservation(foundReservation || null);
    }
  }, [reservationId]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  if (!reservation) {
    return (
      <div className="text-center mt-20">예약 정보를 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="mt-20 bg-gray-100 -mx-4 min-h-screen p-4 pb-24 flex flex-col">
      <div className="p-4 bg-white rounded-lg shadow mb-6">
        <div className="relative flex items-center justify-between gap-4 py-4 px-2 border-b border-b-gray-100">
          <div className="w-10 h-10 rounded-full bg-black relative overflow-hidden">
            <Image
              src={reservation.profileImage}
              alt={`${reservation.studioname} `}
              fill
            />
          </div>
          <div className="mr-auto">
            <p className="font-semibold">{reservation.studioname}</p>
            <p className="text-gray-500 font-medium flex gap-1 items-center">
              <Image
                src="/icons/event.svg"
                alt="back"
                width={20}
                height={20}
                className="object-cover"
              />
              {reservation.createDate}
            </p>
          </div>
          <div
            className={`self-start px-2 py-1 mt-2 rounded-md bg-gray-200 font-medium ${
              reservation.status === "예약확정"
                ? "bg-yellow-500 text-black"
                : reservation.status === "촬영완료"
                  ? "text-blue-500"
                  : reservation.status === "예약취소"
                    ? "text-red-500"
                    : "text-black"
            }`}
          >
            {reservation.status}
          </div>
        </div>

        <div className="my-6">
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
      </div>

      <div className="mt-auto flex gap-2">
        <Link
          href={`/reservation`}
          className="px-4 py-2 w-1/2 bg-gray-700 text-white rounded text-center"
        >
          예약 취소
        </Link>
        <button className="px-4 py-2 w-1/2 bg-yellow-500 text-black rounded">
          예약 변경
        </button>
      </div>
    </div>
  );
}

export default ReservationEdit;
