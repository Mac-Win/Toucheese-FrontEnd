"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { studios } from "@/data/studioData";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // 검색어로 스튜디오 필터링
  const filteredStudios = studios.filter((studio) =>
    studio.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">검색 결과</h1>
      {filteredStudios.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredStudios.map((studio) => (
            <div
              key={studio._id}
              className="flex flex-col gap-4 py-4 bg-white border-b"
            >
              {/* 상단 정보 */}
              <div className="flex items-center gap-4">
                <Image
                  src={studio.profileImage}
                  alt={`${studio.name} profile`}
                  width={64}
                  height={64}
                  className="rounded-full object-cover border border-gray-300"
                />
                <div className="flex-1">
                  <h2 className="text-black text-lg font-bold">
                    {studio.name}
                  </h2>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <span>⭐ {studio.rating}</span>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-600 transition">
                  ❤️
                </button>
              </div>

              {/* Swiper 갤러리 */}
              <div className="w-full max-w-full overflow-hidden">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={16}
                  grabCursor={true}
                  freeMode={true}
                  modules={[Navigation, Pagination, FreeMode]}
                  className="mySwiper w-full"
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
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          검색 결과가 없습니다. 다시 검색해보세요.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
