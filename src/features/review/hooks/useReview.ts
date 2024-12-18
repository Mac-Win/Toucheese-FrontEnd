import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";

export interface Review {
  id: number;
  firstImage: string;
}

export function useStudioReviews(studioId: number) {
  const { data, loading, error, request } = useRequest<Review[]>();

  useEffect(() => {
    if (studioId) {
      request("GET", `/v1/studios/${studioId}/reviews`);
    }
  }, [studioId, request]);

  return { data, loading, error };
}
