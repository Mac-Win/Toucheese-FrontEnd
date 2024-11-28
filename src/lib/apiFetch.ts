import apiClient from "@/lib/apiCient";

/**
 * 공통 API 호출 함수
 * @param endpoint API 경로 (baseURL 이후의 경로)
 * @param params Optional query parameters (URLSearchParams 형태)
 * @returns API 응답 데이터
 */
export async function apiFetch<T>(
  endpoint: string,
  params?: URLSearchParams
): Promise<T> {
  try {
    const url = params ? `${endpoint}?${params.toString()}` : endpoint;
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error: any) {
    console.error(`API 호출 실패: ${endpoint}`, error);
    throw new Error(
      error.response?.data?.message || "데이터를 불러오는 데 실패했습니다."
    );
  }
}
