"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function StudioImages({
  facilityImageUrls,
}: {
  facilityImageUrls: string[];
}) {
  return (
    <div className="relative w-full h-[300px]">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        grabCursor={true}
        pagination={{
          type: "fraction",
        }}
        modules={[Pagination]}
        className="w-full h-full" // Swiper에 height 100% 적용
      >
        {facilityImageUrls.map((image, idx) => (
          <SwiperSlide key={idx} className="h-full">
            {" "}
            {/* SwiperSlide에도 height 설정 */}
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Facility image ${idx + 1}`}
                className="object-cover rounded-lg shadow-xl bg-red-200"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
