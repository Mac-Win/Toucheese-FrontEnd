"use client";

import Image from "next/image";
import useProductStore from "@/features/product/store/ProductStore";
import { useProductReviews } from "@/features/review/hooks/ProductState";
import ReviewList from "@/features/review/ui/reviewList";

import { useRouter } from "next/navigation";

const ReviewsPage = () => {
  const router = useRouter();

  const productImage = useProductStore((state) => state.productImage);
  const productTitle = useProductStore((state) => state.productTitle);
  const productDescription = useProductStore(
    (state) => state.productDescription
  );

  const { data: reviews, loading, error } = useProductReviews();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

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
        <ReviewList reviews={reviews || []} />
      </div>
    </>
  );
};

export default ReviewsPage;
