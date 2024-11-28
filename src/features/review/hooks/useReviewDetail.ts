import useFetch from "@/features/common/hooks/useFetch";

interface ReviewDetail {
  id: number;
  content: string;
  rating: number;
  reviewImages: string[];
}

export function useReviewDetail(studioId: number, reviewId: number) {
  if (isNaN(studioId) || isNaN(reviewId)) {
    throw new Error("Invalid studioId or reviewId");
  }

  return useFetch<ReviewDetail>(`/v1/studios/${studioId}/reviews/${reviewId}`);
}
