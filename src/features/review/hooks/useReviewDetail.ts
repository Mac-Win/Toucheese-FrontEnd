import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import useStudioStore from "@/features/studios/store/StudioStore";

interface ReviewDetail {
  id: number;
  content: string;
  rating: number;
  reviewImages: string[];
}

export function useReviewDetail(reviewId: number) {
  const studioId = useStudioStore((state) => state.studioId);
  const { data, loading, error, request } = useRequest<ReviewDetail>();

  useEffect(() => {
    if (studioId && reviewId) {
      request("GET", `/v1/studios/${studioId}/reviews/${reviewId}`);
    }
  }, [studioId, reviewId, request]);

  return { data, loading, error };
}
