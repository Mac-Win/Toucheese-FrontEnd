"use client";
import Link from "next/link";
import Image from "next/image";
import useReservatedList from "../hooks/useReservatedList";
import { useEffect, useState } from "react";
import { Reservation } from "@/types/Reservated.type";
import CommonPagination from "@/features/common/components/pagination";

function ReservationPage() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    data: ReservationItems,
    loading,
    error,
    refetch,
  } = useReservatedList(currentPage);

  const [reservationItems, setReservationItems] = useState<Reservation[]>([]);

  useEffect(() => {
    if (ReservationItems && ReservationItems.content) {
      setReservationItems(ReservationItems.content);
    }
  }, [ReservationItems]);

  const totalPages = ReservationItems?.totalPages || 1;

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!reservationItems || reservationItems.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        현재 예약된 상품이 없습니다.
      </div>
    );
  }

  return (
    <div>
      {reservationItems.map((reservation) => (
        <div
          key={reservation.reservationId}
          className="p-4 my-4 rounded-lg border bg-white border-gray-200"
        >
          <div className="relative flex items-center justify-betweens gap-3">
            <div className="w-12 h-12 rounded-full relative overflow-hidden">
              <Image
                src={reservation.studioImage}
                alt={`${reservation.studioImage} `}
                fill
              />
            </div>
            <div className="mr-auto">
              <p className="font-semibold ">{reservation.studioName}</p>
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
              className={`self-start px-2 py-1 mt-2 rounded-lg border border-gray-200 bg-gray-200 font-medium ${
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
          {reservation.status === "촬영완료" ? (
            <div className="mt-4 flex justify-between gap-2">
              <Link
                href={`/studios/${reservation.studioId}`}
                className="px-4 py-4 bg-gray-50 w-1/2 text-center rounded-lg border border-gray-200 font-semibold"
              >
                스튜디오 홈
              </Link>
              <Link
                href={`/review/${reservation.reservationId}`}
                className="px-4 py-4 bg-yellow-500 w-1/2 text-center rounded-lg border border-gray-200 font-semibold text-black"
              >
                리뷰 쓰기
              </Link>
            </div>
          ) : reservation.status === "예약취소" ? null : (
            <div className="mt-4 flex justify-between gap-2">
              <Link
                href={`/studios/${reservation.studioId}`}
                className="px-4 py-4 bg-gray-50 w-1/2 text-center rounded-lg border border-gray-200 font-semibold"
              >
                스튜디오 홈
              </Link>
              <Link
                href={`/reservation/${reservation.reservationId}`}
                className="px-4 py-4 bg-gray-50 w-1/2 text-center rounded-lg border border-gray-200 font-semibold"
              >
                예약 수정
              </Link>
            </div>
          )}
        </div>
      ))}

      <CommonPagination
        currentPage={currentPage + 1} // 페이지 인덱스는 0부터 시작하므로 +1
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page - 1); // 페이지 인덱스는 0부터 시작
          refetch(page - 1); // 새 페이지로 데이터 로드
        }}
      />
    </div>
  );
}

export default ReservationPage;
