import useFetch from "@/features/common/hooks/useFetch";
import { StudiosByConceptResponse } from "../types/studioResponse.type";

export function useStudioList(
  conceptId: number,
  pageNumber: number = 1,
  pageSize: number = 10
) {
  const params = new URLSearchParams();
  params.set("page", pageNumber.toString());
  params.set("size", pageSize.toString());

  return useFetch<StudiosByConceptResponse>(
    `/v1/concepts/${conceptId}/studios`,
    params
  );
}
