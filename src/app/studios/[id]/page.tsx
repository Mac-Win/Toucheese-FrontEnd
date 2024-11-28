"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation"; // useRouter 가져오기
import { studioData } from "@/api/data/studioDetailTestData";

const StudioDetailPage = () => {
  const [activeTab, setActiveTab] = useState("가격");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter(); // useRouter 훅 초기화

  // 상품 리뷰 총합 계산
  const totalReviews = studioData.product.reduce(
    (sum, product) => sum + product.reviews,
    0
  );

  return (
    <div>
      <div className="fixed z-10 flex items-center justify-between max-w-[calc(var(--max-width)-2rem)] w-full p-2">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center -ml-2"
          >
            <Image src="/icons/back.svg" alt="back" width={36} height={36} />
          </button>
        </div>
        <div>
          <Image src="/icons/share.svg" alt="share" width={36} height={36} />
        </div>
      </div>

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
          {studioData.imageUrls.map((image: string, idx: number) => (
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

      <div className="my-4">
        <p>리뷰 {totalReviews}개</p>
        <p>{studioData.description}</p>
        <p>주소 {studioData.address}</p>
      </div>

      <div className="my-4 bg-gray-200 p-4 rounded-lg flex items-start gap-2">
        {/* 아이콘 섹션 */}
        {/* <div className="flex-shrink-0 text-black text-xl">
            <HiSpeakerphone />
          </div> */}

        {/* 텍스트 섹션 */}
        <div className="flex-grow text-sm text-gray-700">
          <p
            className={`${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            } overflow-hidden transition-all`}
          >
            {studioData.notice}
          </p>
        </div>

        {/* 펼치기/접기 버튼 */}
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
            className={`flex-1 text=cemter py-2 outline-none rounded-t-2xl font-semibold transition-all bg-gray-200 ${
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
            {studioData.product.map((product, index) => (
              <Link href={`/product/${product.id}`} key={index}>
                <div className="my-4 flex gap-4 items-center p-4 border-b hover:rounded-lg  hover:shadow-lg transition-shadow">
                  {/* 이미지 섹션 */}
                  <div className="flex-shrink-0">
                    <div className="relative aspect-[3/4] w-28 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={studioData.profileImage}
                        alt={`${studioData.name} Product`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* 텍스트 섹션 */}
                  <div className="flex flex-col flex-grow">
                    {/* 상단: 상품 이름과 가격 */}
                    <div className="flex items-baseline mb-2">
                      <div className="font-semibold text-lg">
                        {product.value}
                      </div>
                      <span className="ml-1 text-md text-gray-500">
                        최대{product.person}인
                      </span>
                    </div>

                    {/* 상품 설명 */}
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </div>

                    {/* 리뷰 */}
                    <div className="text-sm text-gray-500 mt-2">
                      리뷰 {product.reviews}개
                    </div>

                    {/* 가격 */}
                    <div className="flex-shrink-0 text-right font-bold text-xl text-black">
                      {product.price.toLocaleString("ko-KR")}원
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {activeTab === "리뷰" && (
          <div>
            <div className="grid grid-cols-3 gap-1">
              {studioData.reviews.map((review) => (
                <Link href={`/review/${review.id}`} key={review.id}>
                  <div className="relative w-full overflow-hidden aspect-square cursor-pointer hover:shadow-md bg-black ">
                    <Image
                      src={review.images[0]} // 리뷰 이미지의 첫 번째 사진 표시
                      alt={`Review ${review.id}`}
                      className="object-cover w-full h-full"
                      fill
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioDetailPage;
