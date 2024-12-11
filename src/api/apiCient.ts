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
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response) {
      const { status } = response;

      if (status === 403 || status === 401) {
        if (typeof window !== "undefined") {
          // 클라이언트 환경에서만 동작
          // alert("인증 문제가 발생했습니다. 로그인 페이지로 이동합니다.");
          // window.location.href = status === 403 ? "/members/login" : "/login";
        } else {
          console.warn("서버 사이드에서 인증 오류 발생.");
        }
      } else if (status >= 500) {
        console.error("서버 오류가 발생했습니다.");
        alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } else {
      console.error("응답이 없습니다. 네트워크 문제일 수 있습니다.");
      alert("네트워크 연결 상태를 확인해주세요.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
