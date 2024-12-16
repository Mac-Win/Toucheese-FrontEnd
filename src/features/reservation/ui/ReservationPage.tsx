import Link from "next/link";
import Image from "next/image";
import { ReservationItems } from "@/api/test/ReservationItem";

function ReservationPage() {
  if (!ReservationItems || ReservationItems.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        현재 예약된 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-20 bg-gray-100 -mx-4 min-h-screen p-4 pb-24">
      {ReservationItems.map((reservation) => (
        <div
          key={reservation.reservationId}
          className="p-4 bg-white my-4 rounded-md"
        >
          <div className="relative flex items-center justify-between gap-4">
            <div className="w-10 h-10 rounded-full bg-black relative overflow-hidden">
              <Image
                src={reservation.profileImage}
                alt={`${reservation.studioname} `}
                fill
              />
            </div>
            <div className="mr-auto">
              <p className="font-semibold ">{reservation.studioname}</p>
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
          {reservation.status === "예약취소" ||
          reservation.status === "촬영완료" ? null : (
            <div className="mt-4 flex justify-between gap-2">
              <Link
                href={`/studios/${reservation.studioId}`}
                className="px-4 py-4 bg-gray-50 w-1/2 text-center rounded-md font-semibold"
              >
                스튜디오 홈
              </Link>
              <Link
                href={`/reservation/${reservation.reservationId}`}
                className="px-4 py-4 bg-gray-50 w-1/2 text-center rounded-md font-semibold"
              >
                옵션 변경
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReservationPage;
