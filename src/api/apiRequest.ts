import axios from "axios";
import apiClient from "./apiCient";

export async function apiRequest<T, D = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE", // HTTP 요청 메서드
  endpoint: string, // API 경로
  data?: D, // 요청 본문 데이터
  params?: URLSearchParams, // 쿼리 파라미터
  options?: { headers?: Record<string, string> } // 추가 옵션
): Promise<T> {
  try {
    // URL에 쿼리 파라미터가 있으면 추가
    const url = params ? `${endpoint}?${params.toString()}` : endpoint;

    // 로컬스토리지에서 토큰 가져오기
    const token = localStorage.getItem("authToken");

    // 기본 헤더 설정
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json", // 기본 Content-Type 설정
    };

    // 토큰이 있는 경우 Authorization 헤더 추가
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Axios 요청 전송
    const response = await apiClient.request<T>({
      method, // HTTP 메서드
      url, // 요청 URL
      data, // 요청 본문 데이터
      headers: {
        ...defaultHeaders, // 기본 헤더
        ...options?.headers, // 사용자 지정 헤더 (덮어쓰기)
      },
    });

    // 성공적으로 응답이 왔을 때 데이터 반환
    return response.data;
  } catch (error: unknown) {
    console.error(`API 호출 실패: ${method} ${endpoint}`, error);

    // Axios 에러 처리
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    // 일반 Error 객체의 메시지를 처리
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }

    // 알 수 없는 오류 처리
    throw new Error("요청 처리 중 알 수 없는 오류가 발생했습니다.");
  }
}
