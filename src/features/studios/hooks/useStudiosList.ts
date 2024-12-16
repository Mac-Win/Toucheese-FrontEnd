import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { StudiosByConceptResponse } from "../types/studioResponse.type";

export function useStudioList(
  conceptId: number,
  pageNumber: number = 1,
  pageSize: number = 10
) {
  const { data, loading, error, request } =
    useRequest<StudiosByConceptResponse>();

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    params.set("size", pageSize.toString());

    if (conceptId) {
      request("GET", `/v1/concepts/${conceptId}/studios`, undefined, params);
    }
  }, [conceptId, pageNumber, pageSize, request]);

  return { data, loading, error };
}
