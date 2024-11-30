"use client";

import { useReviewDetail } from "@/features/review/hooks/useReviewDetail";
import { TopBar } from "@/features/common/components/topbar";
import { use } from "react";
import ReviewDetail from "@/features/review/components/reviewDetail";

function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
      <TopBar />
      <ReviewDetail review={review} />
    </>
  );
}

export default ReviewDetailPage;
