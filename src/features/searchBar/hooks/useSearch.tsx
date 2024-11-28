import useFetch from "@/features/common/hooks/useFetch";
import { Search } from "@/features/searchBar/types/search.type";

export function useSearch(keyword: string) {
  const params = new URLSearchParams({ keyword });
  return useFetch<Search[]>(`/v1/studios`, params);
}
