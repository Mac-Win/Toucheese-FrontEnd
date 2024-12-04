"use client";

import { use } from "react";
import { useReviewDetail } from "@/features/review/hooks/useReviewDetail";
import ReviewDetail from "@/features/review/ui/reviewDetail";
import { TopBar } from "@/features/common/components/topbar";

function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // `params` 언래핑
  const reviewId = parseInt(id, 10);

  const { data: review, error } = useReviewDetail(reviewId);

  if (error)
    return <div>리뷰 데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
  if (!review) return <div></div>;

  return (
    <>
      <TopBar showShare={false} />
      <ReviewDetail review={review} />
    </>
  );
}

export default ReviewDetailPage;
