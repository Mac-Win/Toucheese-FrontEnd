import useFetch from "@/features/common/hooks/useFetch";
import useStudioStore from "@/features/studios/store/StudioStore";

interface ReviewDetail {
  id: number;
  content: string;
  rating: number;
  reviewImages: string[];
}

export function useReviewDetail(reviewId: number) {
  const studioId = useStudioStore((state) => state.studioId);

  console.log("studioId from store:", studioId); // 디버깅 로그

  return useFetch<ReviewDetail>(`/v1/studios/${studioId}/reviews/${reviewId}`);
}
