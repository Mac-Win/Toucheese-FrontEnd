import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { StudiosByConceptResponse } from "../types/studioResponse.type";

interface Filters {
  price?: number;
  rating?: number;
  locations?: string[];
}

export function useFilters(
  conceptId: number,
  filters: Filters,
  pageNumber: number = 1
) {
  const { data, loading, error, request } =
    useRequest<StudiosByConceptResponse>();

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());

    if (filters.price) params.set("price", filters.price.toString());
    if (filters.rating) params.set("rating", filters.rating.toString());
    if (filters.locations) {
      filters.locations.forEach((location) =>
        params.append("locations", location)
      );
    }

    if (conceptId) {
      request(
        "GET",
        `/v1/concepts/${conceptId}/studios/filters`,
        undefined,
        params
      );
    }
  }, [conceptId, filters, pageNumber, request]);

  return { data, loading, error };
}
