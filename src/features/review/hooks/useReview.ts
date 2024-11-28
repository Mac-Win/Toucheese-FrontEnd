import useFetch from "@/features/common/hooks/useFetch";

interface Review {
  id: number;
  firstImage: string;
}

export function useStudioReviews(studioId: number) {
  return useFetch<Review[]>(`/v1/studios/${studioId}/reviews`);
}
