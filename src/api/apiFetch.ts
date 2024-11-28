import apiClient from "@/api/apiCient";

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
  } catch (error: unknown) {
    console.error(`API 호출 실패: ${endpoint}`, error);

    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }

    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
}
