"use client";

import Image from "next/image";
import { useReviewDetail } from "@/features/review/hooks/useReviewDetail";
import { TopBar } from "@/features/common/components/topbar";

function ReviewDetailPage({
  params,
}: {
  params: { studioId: string; reviewId: string };
}) {
  const studioId = parseInt(params.studioId || "1", 10);
  const reviewId = parseInt(params.reviewId || "1", 10);

  const { data: review, loading, error } = useReviewDetail(studioId, reviewId);

  if (loading) return <div>리뷰 데이터를 로딩 중입니다...</div>;
  if (error)
    return <div>리뷰 데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
  if (!review) return <div>리뷰가 존재하지 않습니다.</div>;

  return (
    <>
      <TopBar />
      <div className="p-4 mt-20">
        <div className="border-b pb-4">
          <div className="grid grid-cols-2 gap-4 my-4">
            {review.reviewImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full h-48 rounded-lg overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`리뷰 이미지 ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <h1 className="text-lg font-bold mb-2">리뷰 상세</h1>
          <p className="text-gray-700 text-sm">{review.content}</p>
        </div>
        <div className="my-4">
          <h2 className="text-md font-semibold">평점: {review.rating} / 5</h2>
        </div>
      </div>
    </>
  );
}

export default ReviewDetailPage;
