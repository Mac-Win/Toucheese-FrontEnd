"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useStudiosByConcept } from "@/hooks/useCustomAxios";
import { Studio } from "@/types/studio.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FilterGroup from "@/features/filter/filterGroup";
import PaginationComponent from "@/features/pagination/pagination"; // 추가된 Pagination 컴포넌트
import "./Carousel.css";

type SelectedFilters = Record<string, string[]>;

const StudioList = ({ conceptId }: { conceptId: number }) => {
  const [pageNumber, setPageNumber] = useState(0); // 페이지 번호 상태
  const [pageSize] = useState(10); // 한 페이지에 표시할 데이터 개수
  const [filters, setFilters] = useState<SelectedFilters>({
    region: [],
    popularity: [],
    price: [],
  });

  const { data, loading, error } = useStudiosByConcept(
    conceptId,
    pageNumber,
    pageSize
  );

  const studios: Studio[] = data?.content || [];
  const totalPages = data?.totalPages || 1;

  const toggleBookmark = (id: number | string) => {
    const studioIndex = studios.findIndex((studio) => studio.id === String(id));
    if (studioIndex !== -1) {
      studios[studioIndex].bookmark = !studios[studioIndex].bookmark;
    }
  };

  const filteredStudios = useMemo(() => {
    return studios.filter((studio: Studio) => {
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
        filters.price.some((priceRange) => {
          const [min, max] = priceRange.split("-").map(Number);
          return studio.price >= min && studio.price <= max;
        });

      return regionMatch && popularityMatch && priceMatch;
    });
  }, [studios, filters]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        {/* 필터 그룹 */}
        <FilterGroup filters={filters} onFilterChange={setFilters} />

        {/* 필터링된 스튜디오 리스트 */}
        {filteredStudios.map((studio: Studio) => (
          <div
            key={studio.id}
            className="flex flex-col gap-4 py-4 w-full border-b border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="max-h-16 max-w-16 overflow-hidden rounded-full flex items-center">
                <Image
                  src={studio.profileImage}
                  alt={`${studio.name} profile`}
                  width={64}
                  height={64}
                />
              </div>

              <div className="flex-1">
                <h2 className="text-black text-lg font-bold">{studio.name}</h2>
                <div className="flex items-center text-yellow-500 text-sm">
                  <span>⭐ {studio.rating}</span>
                </div>
              </div>
              <div>
                <span>{studio.price.toLocaleString()}원</span>
              </div>
              <button
                onClick={() => toggleBookmark(studio.id)}
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
              >
                {studio.images.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image}
                      alt={`${studio.name} gallery ${index + 1}`}
                      sizes="fill"
                      width={200}
                      height={200}
                      className="cursor-pointer"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}

        {/* 페이지네이션 컴포넌트 */}
        <PaginationComponent
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        />
      </div>
    </>
  );
};

export default StudioList;
