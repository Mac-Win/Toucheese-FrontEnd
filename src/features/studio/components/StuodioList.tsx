"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { studios as initialStudios } from "@/data/studioData";
import FilterGroup from "@/features/filter/filterGroup";

type SelectedFilters = Record<string, string[]>;

const StudioList = () => {
  const [filters, setFilters] = useState<SelectedFilters>({
    region: [],
    popularity: [],
    price: [],
  });

  const [studios, setStudios] = useState(initialStudios);

  const toggleBookmark = (id: string) => {
    setStudios((prevStudios) =>
      prevStudios.map((studio) =>
        studio._id === id ? { ...studio, bookmark: !studio.bookmark } : studio
      )
    );
  };

  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      const regionMatch =
        filters.region.length === 0 || filters.region.includes(studio.region);
      const popularityMatch =
        filters.popularity.length === 0 ||
        filters.popularity.some((pop) => {
          const rating = parseFloat(pop.split(" ")[0]);
          return studio.rating >= rating;
        });
      const priceMatch =
        filters.price.length === 0 ||
        filters.price.includes(studio.priceCategory);

      return regionMatch && popularityMatch && priceMatch;
    });
  }, [studios, filters]);

  return (
    <div>
      {/* 필터 그룹 */}
      <FilterGroup filters={filters} onFilterChange={setFilters} />

      {/* 필터링된 스튜디오 리스트 */}
      {filteredStudios.map((studio) => (
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
    </div>
  );
};

export default StudioList;
