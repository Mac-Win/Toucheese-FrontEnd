import useFetch from "@/features/common/hooks/useFetch";
import useStudioStore from "@/features/studios/store/useStudioStore";

export interface ProductReview {
  id: number;
  firstImage: string;
}

export function useProductReviews<T>() {
  const studioId = useStudioStore((state) => state.studioId);
  const productId = useStudioStore((state) => state.productId);

  if (!studioId || !productId) {
    throw new Error("Studio ID 또는 Product ID가 설정되지 않았습니다.");
  }

  return useFetch<T[]>(`/v1/studios/${studioId}/products/${productId}/reviews`);
}
