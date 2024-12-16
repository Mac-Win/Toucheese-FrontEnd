import { TopBar } from "@/features/common/components/topbar";
import Image from "next/image";

const ReservationItems = [
  {
    studioId: "42",
    reservationId: "1",
    profileImage: "/images/studio1.jpg",
    studioname: "어디스튜디오",
    status: true,
    createDate: "2024-12-16",
  },
  {
    studioId: "43",
    reservationId: "2",
    profileImage: "/images/studio2.jpg",
    studioname: "여기스튜디오",
    status: true,
    createDate: "2024-12-16",
  },
  {
    studioId: "44",
    reservationId: "3",
    profileImage: "/images/studio3.jpg",
    studioname: "저기스튜디오",
    status: true,
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
    <div>
      <TopBar message="예약일정" showShare={false} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {ReservationItems.map((reservation) => (
          <div
            key={reservation.reservationId}
            className="relative w-full overflow-hidden aspect-square cursor-pointer"
          >
            <Image
              src={reservation.profileImage}
              alt={`${reservation.studioname} 예약 이미지`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
              fill
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
              {reservation.studioname}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationPage;
