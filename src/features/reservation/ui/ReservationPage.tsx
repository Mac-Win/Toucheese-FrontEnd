import { TopBar } from "@/features/common/components/topbar";
import Image from "next/image";

const ReservationItems = [
  {
    studioId: "42",
    reservationId: "1",
    profileImage: "/images/studio1.jpg",
    studioname: "어디스튜디오",
    status: "예약대기",
    createDate: "2024-12-16",
  },
  {
    studioId: "43",
    reservationId: "2",
    profileImage: "/images/studio2.jpg",
    studioname: "여기스튜디오",
    status: "예약확정",
    createDate: "2024-12-16",
  },
  {
    studioId: "44",
    reservationId: "3",
    profileImage: "/images/studio3.jpg",
    studioname: "저기스튜디오",
    status: "예약취소",
    createDate: "2024-12-16",
  },
];

function ReservationPage() {
  if (!ReservationItems || ReservationItems.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        현재 예약된 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-20">
      <TopBar message="예약일정" showShare={false} />
      {ReservationItems.map((reservation) => (
        <div key={reservation.reservationId} className="p-4 bg-blue-50  my-4">
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
              <p className="text-gray-500 font-medium">
                {reservation.createDate}
              </p>
            </div>
            <div>{reservation.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationPage;
