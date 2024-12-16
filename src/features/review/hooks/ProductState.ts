import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import useProductStore from "@/features/product/store/ProductStore";
import useStudioStore from "@/features/studios/store/StudioStore";

export interface Review {
  id: number;
  firstImage: string;
}

export function useProductReviews() {
  const studioId = useStudioStore((state) => state.studioId);
  const productId = useProductStore((state) => state.productId);

  const { data, loading, error, request } = useRequest<Review[]>();

  useEffect(() => {
    if (studioId && productId) {
      request("GET", `/v1/studios/${studioId}/products/${productId}/reviews`);
    }
  }, [studioId, productId, request]);

  return { data, loading, error };
}
