"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import PaginationComponent from "@/features/pagination/pagination";
import {
  useStudiosByConcept,
  useStudiosWithFilters,
} from "@/hooks/useCustomAxios";
import { useEffect, useState } from "react";

const StudioDisplay = ({
  conceptId,
  filters,
}: {
  conceptId: number;
  filters: { price?: number; rating?: number; locations?: string[] };
}) => {
  const [pageNumber, setPageNumber] = useState(0); // 1-based index
  const [totalPages, setTotalPages] = useState(0); // 초기 totalPages

  const {
    data: allStudiosData,
    loading: allStudiosLoading,
    error: allStudiosError,
  } = useStudiosByConcept(conceptId, pageNumber); // 0-based index

  const {
    data: filteredStudiosData,
    loading: filteredStudiosLoading,
    error: filteredStudiosError,
  } = useStudiosWithFilters(conceptId, filters, pageNumber);

  const isFilterApplied =
    filters.price !== undefined ||
    filters.rating !== undefined ||
    (filters.locations && filters.locations.length > 0);

  useEffect(() => {
    // `totalPages` 업데이트
    const data = isFilterApplied ? filteredStudiosData : allStudiosData;
    if (data) {
      setTotalPages(data.totalPages || 1);
    }
  }, [filteredStudiosData, allStudiosData]);

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

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage); // 페이지 번호 상태 업데이트
  };

  return (
    <>
      {studios.length > 0 ? (
        <>
          {studios.map((studio) => (
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
                  <h2 className="text-black text-lg font-bold">
                    {studio.name}
                  </h2>
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
          ))}
          <PaginationComponent
            pageNumber={pageNumber}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </>
  );
};

export default StudioDisplay;
