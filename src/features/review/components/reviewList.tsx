"use client";

import Image from "next/image";
import Link from "next/link";
import { useStudioReviews } from "../hooks/useReview";

function ReviewList({ studioId }: { studioId: number }) {
  const { data: reviews, loading, error } = useStudioReviews(studioId);

  if (loading) return <div>리뷰 데이터를 로딩 중입니다...</div>;
  if (error) return <div>리뷰 데이터를 불러오는 중 에러가 발생했습니다.</div>;
  if (!reviews || reviews.length === 0) {
    return <div>현재 리뷰가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {reviews.map((review) => (
        <Link href={`/review/${review.id}`} key={review.id}>
          <div className="relative w-full overflow-hidden aspect-square cursor-pointer hover:shadow-md bg-black">
            <Image
              src={review.firstImage}
              alt={`Review ${review.id}`}
              className="object-cover w-full h-full"
              fill
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ReviewList;
