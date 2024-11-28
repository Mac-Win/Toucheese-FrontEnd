import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "@/lib/apiFetch";

function useFetch<T>(endpoint: string, params?: URLSearchParams) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // params를 memoization하여 불필요한 변경 방지
  const memoizedParams = useMemo(() => params, [params?.toString()]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFetch<T>(endpoint, memoizedParams);
        setData(response);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) fetchData();
  }, [endpoint, memoizedParams]); // memoizedParams를 의존성으로 추가

  return { data, loading, error };
}

export default useFetch;
