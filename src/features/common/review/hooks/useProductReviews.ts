import useFetch from "@/features/common/hooks/useFetch";

export interface Review {
  id: number;
  firstImage: string;
}

export function useProductReviews(studioId: string, productId: string) {
  if (!studioId || !productId) {
    throw new Error("Studio ID 또는 Product ID가 설정되지 않았습니다.");
  }

  return useFetch<Review[]>(
    `/v1/studios/${studioId}/products/${productId}/reviews`
  );
}
