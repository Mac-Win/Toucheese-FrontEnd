"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import PaginationComponent from "@/features/studios/components/pagination";
import { useStudioList } from "../hooks/useStudiosList";
import { useFilters } from "@/features/studios/hooks/useFilters";
import { useEffect, useState } from "react";
import Link from "next/link";

const StudioList = ({
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
  } = useStudioList(conceptId, pageNumber); // 0-based index

  const {
    data: filteredStudiosData,
    loading: filteredStudiosLoading,
    error: filteredStudiosError,
  } = useFilters(conceptId, filters, pageNumber);

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
  }, [isFilterApplied, filteredStudiosData, allStudiosData]);

  if (isFilterApplied && filteredStudiosLoading)
    return <p>로딩 중 (필터 적용)...</p>;
  if (!isFilterApplied && allStudiosLoading)
    return <p>로딩 중 (전체 조회)...</p>;

  if (isFilterApplied && filteredStudiosError)
    return <p>오류 발생: 필터된 데이터를 불러오지 못했습니다.</p>;
  if (!isFilterApplied && allStudiosError)
    return <p>오류 발생: 전체 데이터를 불러오지 못했습니다.</p>;

  const studios = isFilterApplied
    ? filteredStudiosData?.content || []
    : allStudiosData?.content || [];

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <>
      {studios.length > 0 ? (
        <>
          {studios.map((studio) => (
            <Link href={`/studios/${studio.id}`} key={studio.id}>
              <div className="flex flex-col gap-4 border-b py-4 border-gray-100 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="max-h-12 max-w-12 overflow-hidden rounded-full flex items-center">
                    <Image
                      src={studio.profileImage}
                      alt={`${studio.name} profile`}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-800 text-lg font-semibold">
                      {studio.name}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-4 font-medium">
                  <div className=" flex items-center px-2 py-1 bg-gray-50 rounded-lg border">
                    <Image
                      src="/icons/studio/star.svg"
                      alt={`${studio.name}의 평점${studio.rating}`}
                      width={24}
                      height={24}
                    />
                    <span>{studio.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg border">
                    <Image
                      src="/icons/studio/credit_card.svg"
                      alt={`${studio.name}의 평점${studio.rating}`}
                      width={24}
                      height={24}
                    />
                    <span>{studio.price.toLocaleString()}원</span>
                  </div>
                </div>
                <div className="w-full max-w-[600px] overflow-hidden">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    grabCursor={true}
                    freeMode={true}
                    modules={[Navigation, Pagination, FreeMode]}
                  >
                    {studio.imageUrls.map((image: string, idx: number) => (
                      <SwiperSlide
                        key={idx}
                        className="relative aspect-3/4 overflow-hidden max-w-40 rounded-lg"
                      >
                        <Image
                          src={image}
                          alt={`${studio.name} image ${idx + 1}`}
                          fill
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </Link>
          ))}
          <PaginationComponent
            pageNumber={pageNumber}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>필터링된 스튜디오가 없습니다.</p>
      )}
    </>
  );
};

export default StudioList;
