import useFetch from "@/features/common/hooks/useFetch";
import useStudioStore from "@/features/studios/store/useStudioStore";

interface ReviewDetail {
  id: number;
  content: string;
  rating: number;
  reviewImages: string[];
}

export function useReviewDetail(reviewId: number) {
  const studioId = useStudioStore((state) => state.studioId);
  // zustand 활용 studioID를 저장하여 반영

  console.log("studioId from store:", studioId); // 디버깅 로그
  console.log("reviewId:", reviewId); // 디버깅 로그

  if (studioId === null) {
    console.error("Invalid studioId: studioId is null");
    throw new Error("Invalid studioId");
  }

  if (isNaN(reviewId)) {
    console.error("Invalid reviewId: reviewId is NaN");
    throw new Error("Invalid reviewId");
  }

  return useFetch<ReviewDetail>(`/v1/studios/${studioId}/reviews/${reviewId}`);
}
