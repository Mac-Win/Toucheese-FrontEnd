import useFetch from "@/features/common/hooks/useFetch";
import { Search } from "@/features/searchBar/types/search.type";

export function useSearch(keyword: string) {
  const params = keyword.trim() ? new URLSearchParams({ keyword }) : undefined;

  return useFetch<Search[]>(
    params ? `/v1/studios?${params.toString()}` : null,
    params
  );
}
