import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        "Authorization 헤더에 설정된 토큰:",
        config.headers.Authorization
      );
    } else {
      console.warn("로컬 스토리지에 토큰이 없습니다.");
    }
  } else {
    console.warn("서버 환경에서 localStorage를 사용할 수 없습니다.");
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      const { status } = response;
      if (status === 403) {
        console.error("403 오류: 인증 또는 권한 문제가 발생했습니다.");
      } else if (status === 401) {
        console.error("401 오류: 인증이 필요합니다.");
        // 로그아웃 처리 등 추가 로직 가능
      } else if (status >= 500) {
        console.error("서버 오류가 발생했습니다.");
      }
    } else {
      console.error("응답이 없습니다. 네트워크 문제일 수 있습니다.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
