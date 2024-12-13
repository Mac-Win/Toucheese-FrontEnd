import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "@/api/apiFetch";

function useFetch<T>(endpoint: string | null, params?: URLSearchParams) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const memoizedUrl = useMemo(() => {
    if (!endpoint || !baseUrl) return null;

    const url = new URL(endpoint, baseUrl);
    if (params) {
      params.forEach((value, key) => url.searchParams.set(key, value));
    }

    return url.toString();
  }, [endpoint, params, baseUrl]);

  useEffect(() => {
    const fetchData = async () => {
      if (!memoizedUrl) return;

      setLoading(true);
      setError(null);
      setData(undefined);

      try {
        const response = await apiFetch<T>(memoizedUrl);
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

    fetchData();
  }, [memoizedUrl]);

  return { data, loading, error };
}

export default useFetch;
