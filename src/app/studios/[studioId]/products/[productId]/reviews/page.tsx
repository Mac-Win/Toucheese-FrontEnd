"use client";

import useProductStore from "@/features/product/store/ProductStore";
import { ProductState } from "@/features/review/hooks/ProductState";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

const ReviewsPage = () => {
  const router = useRouter();

  const productImage = useProductStore((state) => state.productImage);
  const productTitle = useProductStore((state) => state.productTitle);
  const productDescription = useProductStore(
    (state) => state.productDescription
  );

  const { data: reviews } = ProductState();
  // 리뷰 데이터 가져오기

  return (
    <>
      <button onClick={() => router.back()} className="-ml-2 fixed">
        <Image src="/icons/back.svg" alt="back" width={36} height={36} />
      </button>
      <div className="flex flex-col items-center bg-custom-bg -m-4 p-4 pt-20">
        <div className="relative aspect-[3/4] w-1/2 bg-gray-200 rounded-md overflow-hidden">
          <Image
            src={productImage}
            alt={productTitle}
            className="object-cover"
            fill
          />
        </div>
        <h2 className="text-xl font-bold mt-4">
          {productTitle || "상품 제목"}
        </h2>
        <p className="text-gray-700">{productDescription || "상품 설명"}</p>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-3 gap-1">
          {(reviews || []).map((review) => (
            <Link href={`/review/${review.id}`} key={review.id}>
              <div className="relative w-full overflow-hidden aspect-square cursor-pointer">
                <Image
                  src={review.firstImage}
                  alt={`Review ${review.id}`}
                  className="object-cover w-full h-full hover:scale-105 transition-all duration-200"
                  fill
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
