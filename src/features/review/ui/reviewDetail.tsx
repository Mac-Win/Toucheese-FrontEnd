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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedContent = formatContent(review.content);

  const visibleImages = review.reviewImages.slice(0, 3);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const visibleContent = isExpanded
    ? formattedContent
    : formattedContent.slice(0, 2); // 처음 두 문단만 표시

  return (
    <div className="border-b-2 mt-20">
      {/* 유저 정보 섹션 */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-200"></div>
        <div>
          <h3 className="text-lg font-semibold">김레이</h3>
        </div>
      </div>

      {/* 평점 표시 */}
      <div className="mb-4">
        <h2 className="text-yellow-400 text-sm">⭐ {review.rating}</h2>
      </div>

      {/* 리뷰 이미지 섹션 */}
      <div className="grid grid-cols-2 gap-1">
        {visibleImages.map((image, idx) => (
          <div
            key={idx}
            className={`relative ${
              idx === 0 ? "col-span-2 h-64" : "h-48"
            } rounded-sm overflow-hidden`}
          >
            <Image
              src={image}
              alt={`리뷰 이미지 ${idx + 1}`}
              className="object-cover w-full h-full"
              fill
            />
          </div>
        ))}
      </div>
      {/* 전체보기 버튼 */}
      {review.reviewImages.length > 3 && (
        <button
          onClick={openModal}
          className="mt-2 text-blue-500 text-sm font-semibold"
        >
          전체 사진 보기
        </button>
      )}

      {/* 모달창 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-3xl p-4">
            {/* Swiper 슬라이더 */}
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              pagination={{ clickable: true }}
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
              {/* 닫기 버튼 */}
              <button
                onClick={closeModal}
                className="absolute top-1 right-4 z-50 text-white text-2xl font-semibold"
              >
                ✕
              </button>
            </Swiper>
          </div>
        </div>
      )}
      {/* 리뷰 내용 */}
      <div className="mt-4 text-gray-700 leading-relaxed space-y-2">
        {visibleContent.map((paragraph, idx) => (
          <p key={idx}>{paragraph}.</p>
        ))}
        {formattedContent.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-blue-500 text-sm font-semibold"
          >
            {isExpanded ? "간략히 보기" : "자세히 보기"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewDetail;
