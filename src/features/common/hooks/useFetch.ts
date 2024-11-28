import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "@/api/apiFetch";

function useFetch<T>(endpoint: string, params?: URLSearchParams) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const memoizedParams = useMemo(() => params, [params?.toString()]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFetch<T>(endpoint, memoizedParams);
        setData(response);
      } catch (err: any) {
        if (err.response?.status === 502) {
          setError("서버가 현재 닫혀 있습니다. 기본 데이터를 표시합니다.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) fetchData();
  }, [endpoint, memoizedParams]);

  return { data, loading, error };
}

export default useFetch;
