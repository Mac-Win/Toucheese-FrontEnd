import { useEffect, useCallback, useState } from "react";
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
  initialPageNumber: number = 1,
  initialPageSize: number = 10
) {
  const { data, loading, error, request } =
    useRequest<StudiosByConceptResponse>();

  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const fetchFilteredStudios = useCallback(
    (page: number = pageNumber, size: number = pageSize) => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("size", size.toString());

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
    },
    [conceptId, filters, pageNumber, pageSize, request]
  );

  useEffect(() => {
    fetchFilteredStudios(pageNumber, pageSize);
  }, [fetchFilteredStudios, pageNumber, pageSize]);

  const goToPage = (page: number) => {
    setPageNumber(page);
    fetchFilteredStudios(page, pageSize);
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    fetchFilteredStudios(pageNumber, size);
  };

  return {
    data,
    loading,
    error,
    refetch: fetchFilteredStudios,
    pageNumber,
    pageSize,
    goToPage,
    changePageSize,
  };
}
