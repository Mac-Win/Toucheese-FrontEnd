import useFetch from "./useFetch";
import { Search } from "@/types/search.type";

export function useSearch(keyword: string) {
  const params = new URLSearchParams({ keyword });
  return useFetch<Search[]>(`/studios/search`, params);
}
