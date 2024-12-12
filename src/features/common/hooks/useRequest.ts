import { useState, useCallback } from "react";
import { apiRequest } from "@/api/apiRequest";

function useRequest<T, D = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      method: "GET" | "POST" | "PUT" | "DELETE",
      endpoint: string,
      body?: D,
      params?: URLSearchParams
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiRequest<T, D>(method, endpoint, body, params);
        setData(response);
        return response;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 에러가 발생했습니다.");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, request };
}

export default useRequest;
