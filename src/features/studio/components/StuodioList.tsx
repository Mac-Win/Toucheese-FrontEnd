"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { studios as initialStudios } from "@/data/studioData";

const StudioList = () => {
  // 스튜디오 상태 관리
  const [studios, setStudios] = useState(initialStudios);

  // 북마크 상태 변경 함수
  const toggleBookmark = (id: string) => {
    setStudios((prevStudios) =>
      prevStudios.map((studio) =>
        studio._id === id ? { ...studio, bookmark: !studio.bookmark } : studio
      )
    );
  };

  return (
    <>
      {studios.map((studio) => (
        <div
          key={studio._id}
          className="flex flex-col gap-4 py-4 w-full border-b border-gray-100"
        >
          <div className="flex items-center gap-4">
            <Image
              src={studio.profileImage}
              alt={`${studio.name} profile`}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-black text-lg font-bold">{studio.name}</h2>
              <div className="flex items-center text-yellow-500 text-sm">
                <span>⭐ {studio.rating}</span>
              </div>
            </div>
            <div>
              <span>{studio.price}</span>
            </div>

            {/* 북마크 버튼 */}
            <button
              onClick={() => toggleBookmark(studio._id)}
              className="text-2xl transition"
            >
              {studio.bookmark ? (
                <Image
                  src={"/icons/bookmarkfull.svg"}
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={"/icons/bookmark.svg"}
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>

          <div className="w-full max-w-[600px] overflow-hidden">
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              grabCursor={true}
              freeMode={true}
              modules={[Navigation, Pagination, FreeMode]}
              className="mySwiper"
            >
              {studio.galleryImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`${studio.name} gallery ${index + 1}`}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </>
  );
};

export default StudioList;
