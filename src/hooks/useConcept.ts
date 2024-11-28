import useFetch from "@/hooks/useFetch";
import { StudiosByConceptResponse } from "@/types/studioResponse.type";

export function useConcept(
  conceptId: number,
  pageNumber: number = 1,
  pageSize: number = 10
) {
  const params = new URLSearchParams();
  params.set("page", pageNumber.toString());
  params.set("size", pageSize.toString());

  return useFetch<StudiosByConceptResponse>(
    `/concepts/${conceptId}/studios`,
    params
  );
}
