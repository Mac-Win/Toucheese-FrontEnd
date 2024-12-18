import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";

export interface Review {
  id: number;
  firstImage: string;
}

export function useProductReviews(studioId: string, productId: string) {
  const { data, loading, error, request } = useRequest<Review[]>();

  useEffect(() => {
    if (!studioId || !productId) {
      console.error("Studio ID 또는 Product ID가 설정되지 않았습니다.");
      return;
    }

    request("GET", `/v1/studios/${studioId}/products/${productId}/reviews`);
  }, [studioId, productId, request]);

  return { reviews: data || [], loading, error };
}
