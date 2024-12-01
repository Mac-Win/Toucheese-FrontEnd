"use client";

import { use } from "react";
import { useReviewDetail } from "@/features/review/hooks/useReviewDetail";
import ReviewDetail from "@/features/review/components/reviewDetail";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // `params` 언래핑
  const reviewId = parseInt(id, 10);

  const { data: review, loading, error } = useReviewDetail(reviewId);
  if (isNaN(reviewId) || reviewId === 0) {
    return <div>유효하지 않은 리뷰 ID입니다.</div>;
  }

  if (loading) return <div>리뷰 데이터를 로딩 중입니다...</div>;
  if (error)
    return <div>리뷰 데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
  if (!review) return <div>리뷰가 존재하지 않습니다.</div>;

  return (
    <>
      <div className="fixed z-10 flex items-center justify-between max-w-[calc(var(--max-width)-2rem)] w-full p-2">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center -ml-2"
          >
            <Image src="/icons/back.svg" alt="back" width={36} height={36} />
          </button>
        </div>
      </div>
      <ReviewDetail review={review} />
    </>
  );
}

export default ReviewDetailPage;
