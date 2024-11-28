import useFetch from "@/features/common/hooks/useFetch";
import { StudiosByConceptResponse } from "../types/studioResponse.type";

export function useFilters(
  conceptId: number,
  filters: {
    price?: number;
    rating?: number;
    locations?: string[];
  },
  pageNumber: number = 1
) {
  const params = new URLSearchParams();
  params.set("page", pageNumber.toString());

  if (filters.price) params.set("price", filters.price.toString());
  if (filters.rating) params.set("rating", filters.rating.toString());
  if (filters.locations) {
    filters.locations.forEach((location) =>
      params.append("locations", location)
    );
  }

  return useFetch<StudiosByConceptResponse>(
    `/v1/concepts/${conceptId}/studios`,
    params
  );
}
