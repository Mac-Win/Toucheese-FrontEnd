import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";

export interface Review {
  id: number;
  firstImage: string;
}

export function useProductReviews(studioId: string, productId: string) {
  const { data, loading, error, request } = useRequest<Review[]>();

  useEffect(() => {
    request("GET", `/v1/studios/${studioId}/products/${productId}/reviews`);
  }, [studioId, productId, request]);

  return { data, loading, error };
}
