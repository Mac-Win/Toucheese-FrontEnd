"use client";

import ReviewList from "@/features/review/ui/reviewList";
import { Review } from "@/types/Review.type";

export function StudioReviews({ reviews }: { reviews: Review[] | null }) {
  if (!reviews || reviews.length === 0) {
    return <div>리뷰가 없습니다.</div>;
  }

  return <ReviewList reviews={reviews} />;
}
