"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/features/header/header";
import FilterGroup from "@/features/filter/filterGroup";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import {
  useStudiosByConcept,
  useStudiosWithFilters,
} from "@/hooks/useCustomAxios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const StudiosPage = () => {
  const searchParams = useSearchParams();
  const conceptIdParam = searchParams?.get("conceptId");
  const conceptId =
    conceptIdParam && !isNaN(parseInt(conceptIdParam, 10))
      ? parseInt(conceptIdParam, 10)
      : null;

  const [filters, setFilters] = useState<{
    price?: number;
    rating?: number;
    locations: string[];
  }>({
    price: undefined,
    rating: undefined,
    locations: [],
  });

  const handleApplyFilters = (newFilters: {
    price?: string[];
    rating?: string[];
    locations?: string[];
  }) => {
    setFilters({
      price: newFilters.price?.length
        ? parseInt(newFilters.price[0], 10)
        : undefined,
      rating: newFilters.rating?.length
        ? parseFloat(newFilters.rating[0])
        : undefined,
      locations: newFilters.locations?.includes("전체")
        ? [] // "전체"가 선택된 경우 비워줌
        : newFilters.locations || [],
    });
  };

  if (!conceptId) {
    return (
      <div>
        <Header />
        <div className="text-center mt-10 text-red-500">
          conceptId가 유효하지 않습니다.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <FilterGroup
        filters={{
          price: filters.price ? [filters.price.toString()] : [],
          rating: filters.rating ? [filters.rating.toString()] : [],
          locations: filters.locations || [],
        }}
        onApplyFilters={handleApplyFilters}
      />
      <StudioDisplay conceptId={conceptId} filters={filters} />
    </div>
  );
};

const StudioDisplay = ({
  conceptId,
  filters,
}: {
  conceptId: number;
  filters: { price?: number; rating?: number; locations: string[] };
}) => {
  const {
    data: allStudiosData,
    loading: allStudiosLoading,
    error: allStudiosError,
  } = useStudiosByConcept(conceptId, 0);

  const {
    data: filteredStudiosData,
    loading: filteredStudiosLoading,
    error: filteredStudiosError,
  } = useStudiosWithFilters(conceptId, filters, 0);

  const isFilterApplied =
    filters.price !== undefined ||
    filters.rating !== undefined ||
    (filters.locations && filters.locations.length > 0);

  // 로딩 상태 처리
  if (isFilterApplied && filteredStudiosLoading)
    return <p>로딩 중 (필터 적용)...</p>;
  if (!isFilterApplied && allStudiosLoading)
    return <p>로딩 중 (전체 조회)...</p>;

  // 오류 상태 처리
  if (isFilterApplied && filteredStudiosError)
    return <p>오류 발생: 필터된 데이터를 불러오지 못했습니다.</p>;
  if (!isFilterApplied && allStudiosError)
    return <p>오류 발생: 전체 데이터를 불러오지 못했습니다.</p>;

  // 데이터 선택
  const studios = isFilterApplied
    ? filteredStudiosData?.content || []
    : allStudiosData?.content || [];

  return (
    <>
      {studios.length > 0 ? (
        studios.map((studio) => (
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
            </div>
            <div className="w-full max-w-[600px] overflow-hidden">
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                grabCursor={true}
                freeMode={true}
                modules={[Navigation, Pagination, FreeMode]}
              >
                {studio.imageUrls.map((image: string, idx: number) => (
                  <SwiperSlide
                    key={idx}
                    className="aspect-square overflow-hidden max-w-40 rounded-lg"
                  >
                    <Image
                      src={image}
                      alt={`${studio.name} image ${idx + 1}`}
                      width={200}
                      height={200}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </>
  );
};

export default StudiosPage;
