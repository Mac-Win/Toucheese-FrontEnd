import { useEffect } from "react";
import { defaultConcept } from "@/types/Concept.type";
import useRequest from "@/features/common/hooks/useRequest";

export function useConcept() {
  const { data, loading, error, request } = useRequest<defaultConcept[]>();

  useEffect(() => {
    request("GET", `/v1/concepts`);
  }, [request]);

  return {
    data: data || [],
    loading,
    error,
  };
}
