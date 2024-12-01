"use client";

import Image from "next/image";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useProductReviews,
  ProductReview,
} from "@/features/review/hooks/useProductReviews";
import useStudioStore from "@/features/studios/store/useStudioStore";
import ReviewList from "@/features/review/components/reviewList";

function ProductReviewsPage({
  params,
}: {
  params: Promise<{ studioId: string; productId: string }>;
}) {
  const router = useRouter();

  // Zustand 상태 및 메서드 가져오기
  const productTitle = useStudioStore((state) => state.productTitle);
  const productDescription = useStudioStore(
    (state) => state.productDescription
  );
  const productImage = useStudioStore((state) => state.productImage);
  const setProductTitle = useStudioStore((state) => state.setProductTitle);
  const setStudioId = useStudioStore((state) => state.setStudioId);
  const setProductId = useStudioStore((state) => state.setProductId);
  const setProductDescription = useStudioStore(
    (state) => state.setProductDescription
  );
  const setProductImage = useStudioStore((state) => state.setProductImage);
  const { studioId, productId } = use(params); // Promise 언래핑
  // 파라미터 파싱
  const parsedStudioId = parseInt(studioId, 10);
  const parsedProductId = parseInt(productId, 10);

  // Zustand에 studioId 및 productId 설정
  useEffect(() => {
    if (!isNaN(parsedStudioId)) {
      setStudioId(parsedStudioId);
    }
    if (!isNaN(parsedProductId)) {
      setProductId(parsedProductId);

      // 샘플 데이터를 Zustand에 설정
      setProductTitle("샘플 상품 제목"); // 실제 API 데이터로 교체 가능
      setProductDescription("샘플 상품 설명입니다.");
      setProductImage("https://via.placeholder.com/300");
    }
  }, [
    parsedStudioId,
    parsedProductId,
    setStudioId,
    setProductId,
    setProductTitle,
    setProductDescription,
    setProductImage,
  ]);

  // 리뷰 데이터 가져오기
  const { data: reviews, loading, error } = useProductReviews<ProductReview>();

  if (loading) {
    return <div>리뷰 데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>리뷰 데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div>리뷰가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <button onClick={() => router.back()} className="-ml-2 fixed">
        <Image src="/icons/back.svg" alt="back" width={36} height={36} />
      </button>
      <div className="flex flex-col items-center bg-custom-bg -m-4 p-4 pt-20">
        <div className="relative aspect-[3/4] w-1/2 bg-gray-200 rounded-md overflow-hidden">
          <Image
            src={productImage || "/default-image.jpg"}
            alt={productTitle || "상품 이미지"}
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
        <ReviewList reviews={reviews} />
      </div>
    </>
  );
}

export default ProductReviewsPage;
