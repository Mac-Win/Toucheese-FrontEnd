"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface ReviewDetailProps {
  review: {
    content: string; // 리뷰 내용
    reviewImages: string[]; // 리뷰 이미지 배열
    rating: number; // 평점
  };
}

function formatContent(content: string): string[] {
  // 마침표(`.`) 기준으로 텍스트 분리하여 배열로 반환
  return content
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function ReviewDetail({ review }: ReviewDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedContent = formatContent(review.content);

  const visibleContent = isExpanded
    ? formattedContent
    : formattedContent.slice(0, 2); // 처음 두 문단만 표시

  return (
    <div>
      {/* 유저 정보 섹션 */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-200"></div>
        <div>
          <h3 className="text-lg font-semibold">김레이</h3>
        </div>
      </div>

      {/* <div className="mb-4">
        <h2 className="text-yellow-400 text-sm">⭐ {review.rating}</h2>
      </div> */}

      <div className="-mx-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            type: "fraction",
          }}
          className="relative"
          grabCursor={true}
          modules={[Pagination]}
        >
          {review.reviewImages.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[500px]">
                <Image
                  src={image}
                  alt={`리뷰 이미지 ${idx + 1}`}
                  className="object-cover w-full h-full "
                  fill
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="-mx-4 p-4 text-gray-700 leading-relaxed border-b ">
        <span className="text-gray-500 mt-2">작성일 : 2024년 12월 27일</span>
        {visibleContent.map((paragraph, idx) => (
          <p className="mt-2" key={idx}>
            {paragraph}.
          </p>
        ))}
        {formattedContent.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-btn-color text-sm font-semibold"
          >
            {isExpanded ? "간략히 보기" : "자세히 보기"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewDetail;
