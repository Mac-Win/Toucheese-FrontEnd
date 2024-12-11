import { useState } from "react";
export function useItemHandler() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (
    method: "PUT" | "DELETE",
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: method === "PUT" ? JSON.stringify(data) : undefined,
        }
      );

      if (!response.ok) {
        throw new Error("요청 실패");
      }
      console.log(`${method} 성공:`, await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return { handleRequest, loading, error };
}
