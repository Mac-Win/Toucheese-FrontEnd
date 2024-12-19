import { useEffect, useCallback } from "react";
import useRequest from "@/features/common/hooks/useRequest";

export function usePaginatedRequest<T>(
  endpoint: string,
  initialPage: number = 0,
  initialPageSize: number = 10,
  additionalParams?: Record<string, string | number>
) {
  const { data, loading, error, request } = useRequest<T>();

  const refetch = useCallback(
    (page: number, pageSize: number = initialPageSize) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...Object.fromEntries(
          Object.entries(additionalParams || {}).map(([key, value]) => [
            key,
            value.toString(),
          ])
        ),
      });
      request("GET", endpoint, undefined, params);
    },
    [endpoint, initialPageSize, additionalParams, request]
  );

  useEffect(() => {
    refetch(initialPage, initialPageSize);
  }, [initialPage, initialPageSize, refetch]);

  return { data, loading, error, refetch };
}
