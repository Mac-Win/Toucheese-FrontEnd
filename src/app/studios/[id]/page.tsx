"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { usePathname } from "next/navigation";
import { studioData } from "@/app/constants/studioDetailTest";

const StudioDetailPage = () => {
  const [activeTab, setActiveTab] = useState("가격");
  const pathname = usePathname();

  // 상품 리뷰 총합 계산
  const totalReviews = studioData.product.reduce(
    (sum, product) => sum + product.reviews,
    0
  );

  return (
    <div className="my-6 relative">
      <div className="max-w-4xl mx-auto ">
        <div className="min-h-16 fixed z-10 flex items-center top-2">
          <div className="flex items-center gap-4 ">
            {pathname !== "/" && (
              <Link className="" href="../">
                <Image
                  src="/icons/back.svg"
                  alt="back"
                  width={36}
                  height={36}
                />
              </Link>
            )}
          </div>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          grabCursor={true}
          pagination={{
            el: ".custom-pagination",
            type: "custom",
            renderCustom: (swiper, current, total) => {
              return `${current} / ${total}`;
            },
          }}
          modules={[Pagination]}
        >
          {studioData.imageUrls.map((image: string, idx: number) => (
            <SwiperSlide key={idx} className="aspect-video">
              <Image
                src={image}
                alt={`${studioData.name} image ${idx + 1}`}
                className="w-full object-cover rounded-lg mb-4 shadow-xl  bg-red-200 "
                width={800}
                height={600}
              />
            </SwiperSlide>
          ))}
          <div className="custom-pagination mt-4 text-center text-lg font-bold z-50" />
        </Swiper>
        <div className="flex items-center gap-4 my-4">
          <div className="max-h-12 max-w-12 overflow-hidden rounded-full flex items-center bg-blue-50">
            <Image
              src={studioData.profileImage}
              alt={`${studioData.name} profile`}
              width={48}
              height={48}
            />
          </div>
          <div>
            <h2 className="text-black text-lg font-bold">{studioData.name}</h2>
          </div>
        </div>

        {/* 리뷰 총합 표시 */}
        <p className="text-gray-600">리뷰 {totalReviews}개</p>
        <p className="text-gray-700 ">{studioData.description}</p>
        <p className="text-gray-600">주소 {studioData.address}</p>

        <div className="bg-gray-200 p-4 rounded-lg my-4 ">
          <p className="">{studioData.notice}</p>
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
              <h2 className="text-lg font-semibold mb-2">촬영 상품</h2>
              {studioData.product.map((product, index) => (
                <Link href={`/product`} key={index}>
                  <div className="text-gray-700 flex gap-4 my-4">
                    <div>
                      <Image
                        src={studioData.profileImage}
                        alt={`${studioData.name} Profile`}
                        width={140}
                        height={200}
                        className="w-full h-64 object-cover shadow-xl bg-red-200"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="font-semibold text-lg">
                        {product.value}
                      </div>
                      <div>{product.description}</div>
                      <div className="text-gray-500">{product.reviews}개</div>
                      <div className="mt-auto ml-auto font-bold text-xl">
                        {product.price}원
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {activeTab === "리뷰" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">리뷰</h2>
              <div className="text-gray-700 grid grid-flow-row grid-cols-3 gap-1">
                <div className="aspect-square bg-yellow-50">1</div>
                <div className="aspect-square bg-yellow-50">2</div>
                <div className="aspect-square bg-yellow-50">3</div>
                <div className="aspect-square bg-yellow-50">4</div>
                <div className="aspect-square bg-yellow-50">5</div>
                <div className="aspect-square bg-yellow-50">6</div>
                <div className="aspect-square bg-yellow-50">7</div>
                <div className="aspect-square bg-yellow-50">8</div>
                <div className="aspect-square bg-yellow-50">9</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioDetailPage;
