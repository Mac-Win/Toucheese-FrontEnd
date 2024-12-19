import { usePaginatedRequest } from "@/features/common/hooks/usePaginationRequest";
import { StudiosByConceptResponse } from "../types/studioResponse.type";

export function useStudioList(conceptId: number, pageNumber: number = 0) {
  const { data, loading, error, refetch } =
    usePaginatedRequest<StudiosByConceptResponse>(
      `/v1/concepts/${conceptId}/studios`,
      pageNumber
    );

  return { data, loading, error, refetch };
}
