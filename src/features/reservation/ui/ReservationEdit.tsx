"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useReservatedList from "../hooks/useReservatedList";
import useCalendarData from "@/features/product/hooks/useCalendar";
import { handleReservationUpdate } from "../hooks/useUpdateReservation";
import ReservationInfo from "../components/ReservationInfo";
import WeekCalendarGrid from "../components/weekCalendar";
import TimeSelector from "../components/TimeSelector";
import ReservationActions from "../components/ReservationAction";
import ReservationDate from "@/features/product/ui/ReservationDate";
import Image from "next/image";
import { parseISO } from "date-fns";

const ReservationEdit = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    data: reservatedList,
    loading,
    refetch,
  } = useReservatedList(currentPage);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 열기/닫기 상태

  const handleDateTimeSelect = (date: string | null, time: string | null) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { reservationId } = useParams();
  const router = useRouter();
  const today = new Date();

  const reservation = reservatedList?.content.find(
    (item) => item.reservationId === Number(reservationId)
  );
  const reservationDate = reservation?.createDate
    ? parseISO(reservation.createDate)
    : today;

  useEffect(() => {
    if (!reservation) {
      const targetPage = Math.floor((Number(reservationId) - 1) / pageSize);
      setCurrentPage(targetPage);
      refetch(targetPage);
    } else {
      setSelectedDate(reservation.createDate);
    }
  }, [reservationId, reservation, refetch]);
  const { calendarData } = useCalendarData(
    reservation?.studioId || 0,
    reservationDate
  );

  const handleUpdateReservation = async () => {
    if (!selectedDate || !selectedTime || !reservation) {
      alert("날짜와 시간을 선택하세요.");
      return;
    }
    await handleReservationUpdate(
      reservation.reservationId,
      selectedDate,
      selectedTime
    );
    router.push("/reservation");
  };

  const isDayDisabled = (date: Date) => date < today;

  if (loading) {
    return <div className="text-center mt-20">로딩 중...</div>;
  }

  if (!reservation) {
    return (
      <div className="text-center mt-20">예약 정보를 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="mt-20 min-h-screen pb-24 flex flex-col gap-4">
      <div className="p-4 bg-white rounded-lg shadow mb-6 flex flex-col gap-4">
        <ReservationInfo reservation={reservation} />
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className=" flex items-center border border-gray-300 text-gray-500 py-3 px-4 rounded-lg"
          >
            <Image
              src="/icons/event.svg"
              alt="calendar icon"
              width={20}
              height={20}
              className="object-contain mr-2"
            />
            <span>
              {selectedDate && selectedTime
                ? `예약일 ${selectedDate} 예약시간 (${selectedTime})`
                : selectedDate || "날짜를 선택해주세요"}
            </span>
          </button>
        </div>

        <WeekCalendarGrid
          createDate={reservation.createDate}
          selectedDate={selectedDate}
          onDateClick={setSelectedDate}
          isDayDisabled={isDayDisabled}
        />
        <TimeSelector
          calendarData={calendarData}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>

      <ReservationActions
        onCancel={() => router.push("/reservation")}
        onUpdate={handleUpdateReservation}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-custom-bg p-6 rounded-lg w-full max-w-custom">
            <ReservationDate
              studioId={reservation.studioId || 0}
              onDateTimeSelect={handleDateTimeSelect}
              onCloseModal={handleCloseModal}
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-1 px-4 rounded w-full bg-custom-bg border"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationEdit;
