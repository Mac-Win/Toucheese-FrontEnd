import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { StudioDetail } from "@/types/StudioDetail.type";

export function useStudioDetail(studioId: number) {
  const { data, loading, error, request } = useRequest<StudioDetail>();

  useEffect(() => {
    if (studioId) {
      request("GET", `/v1/studios/${studioId}`);
    }
  }, [studioId, request]);

  return { data, loading, error };
}
