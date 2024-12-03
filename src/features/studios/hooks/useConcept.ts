import useFetch from "@/features/common/hooks/useFetch";
import { defaultConcept } from "../../../types/Concept.type";

export function useConcept() {
  const { data, loading, error } = useFetch<defaultConcept[]>("/v1/concepts");
  return {
    data: data || [], // 빈 배열로 초기화
    loading,
    error,
  };
}
