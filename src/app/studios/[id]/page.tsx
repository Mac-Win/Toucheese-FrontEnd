"use client";

import Image from "next/image";
import Link from "next/link";
import { useStudioDetail } from "@/features/studios/hooks/useStudioDetail";
import { use, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { TopBar } from "@/features/common/components/topbar";
import ReviewList from "@/features/review/components/reviewList";
import useStudioStore from "@/features/studios/store/useStudioStore";

function formatContent(content: string): string[] {
  // 마침표(`.`) 기준으로 텍스트 분리하여 배열로 반환
  return content
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function StudioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState("가격");
  const [isExpanded, setIsExpanded] = useState(false);

  const { id } = use(params); // `params` 언래핑
  const studioId = parseInt(id, 10);
  const { data: studioData, loading, error } = useStudioDetail(studioId);
  const setStudioId = useStudioStore((state) => state.setStudioId);

  if (!isNaN(studioId)) {
    setStudioId(studioId); // 상태에 studioId 저장
  }

  if (isNaN(studioId) || studioId <= 0) {
    return <div>유효하지 않은 스튜디오 ID입니다.</div>;
  }

  if (!studioData) {
    return <div>스튜디오 정보를 불러올 수 없습니다.</div>;
  }

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  // 상품 리뷰 총합 계산
  const totalReviews = studioData.products.reduce(
    (sum, product) => sum + product.reviewCount,
    0
  );

  const formattedContent = formatContent(studioData.description); // 리뷰 내용을 문단 배열로 변환

  // 내용 숨기기와 펼치기 제어
  const visibleContent = isExpanded
    ? formattedContent
    : formattedContent.slice(0, 2); // 처음 두 문단만 표시

  return (
    <div>
      <TopBar />
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          grabCursor={true}
          pagination={{
            type: "fraction",
          }}
          modules={[Pagination]}
          className="relative"
        >
          {studioData.facilityImageUrls.map((image: string, idx: number) => (
            <SwiperSlide key={idx} className="aspect-video">
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`${studioData.name} image ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-xl bg-red-200"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center gap-4 my-4">
        <div className="max-h-12 max-w-12 overflow-hidden rounded-full flex items-center bg-blue-50">
          <Image
            src={studioData.profileImage}
            alt={`${studioData.name} profile`}
            width={48}
            height={48}
          />
        </div>
        <h2 className="text-black text-lg font-bold">{studioData.name}</h2>
      </div>

      <div className="my-4 space-y-2">
        <p>❤️리뷰 {totalReviews}개</p>
        <div>
          {visibleContent.map((paragraph, idx) => (
            <p className="leading-relaxed" key={idx}>
              {paragraph}.
            </p>
          ))}
          {formattedContent.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 text-sm font-semibold"
            >
              {isExpanded ? "간략히 보기" : "자세히 보기"}
            </button>
          )}
        </div>
        <p>🗺️주소 {studioData.address}</p>
        <p>🕒영업시간 {studioData.operationHour}</p>
      </div>

      <div className="my-4 bg-gray-200 p-4 rounded-lg flex items-start gap-2">
        <div className="flex-grow text-sm text-gray-700">
          <p
            className={`${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            } overflow-hidden transition-all`}
          >
            {studioData.notice}
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 text-xs flex-shrink-0"
        >
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      <div className="flex">
        {["가격", "리뷰"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 text-center py-2 outline-none rounded-t-2xl font-semibold transition-all bg-gray-200 ${
              activeTab === tab ? "bg-yellow-200" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "가격" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">촬영 상품</h2>
            {studioData.products.map((product, index) => (
              <Link href={`/product/${product.id}`} key={index}>
                <div className="my-4 flex gap-4 items-center p-4 border-b hover:rounded-lg hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="relative aspect-[3/4] w-28 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={product.productImage}
                        alt={`${studioData.name} Product`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-baseline mb-2">
                      <div className="font-semibold text-lg">
                        {product.name}
                      </div>
                      <span className="ml-1 text-md text-gray-500">
                        최대 {product.standard}인
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      <span>❤️리뷰 {product.reviewCount}개</span>
                    </div>
                    <div className="flex-shrink-0 text-right font-bold text-xl text-black">
                      {product.price.toLocaleString("ko-KR")}원
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {activeTab === "리뷰" && <ReviewList studioId={studioId} />}
      </div>
    </div>
  );
}

export default StudioDetailPage;
