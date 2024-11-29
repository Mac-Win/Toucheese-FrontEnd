import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "@/api/apiFetch";

function useFetch<T>(endpoint: string, params?: URLSearchParams) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize params as a string
  const memoizedParams = useMemo(() => params?.toString() || "", [params]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Convert memoizedParams back to URLSearchParams for the request
        const response = await apiFetch<T>(
          endpoint,
          new URLSearchParams(memoizedParams)
        );
        setData(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    // Fetch data only when endpoint is valid
    if (endpoint) {
      fetchData();
    }
  }, [endpoint, memoizedParams]); // Memoized params prevent unnecessary re-fetch

  return { data, loading, error };
}

export default useFetch;
