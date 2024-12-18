import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { Search } from "@/features/searchBar/types/search.type";

export function useSearch(keyword: string) {
  const { data, loading, error, request } = useRequest<Search[]>();

  useEffect(() => {
    if (keyword.trim()) {
      const params = new URLSearchParams({ keyword });
      request("GET", `/v1/studios?${params.toString()}`);
    }
  }, [keyword, request]);

  return { data, loading, error };
}
