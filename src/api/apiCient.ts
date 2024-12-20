import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response) {
      const { status } = response;

      if ((status === 401 || status === 403) && !config._retry) {
        config._retry = true;

        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/tokens/reissue`,
            {},
            { withCredentials: true }
          );

          document.cookie = `authToken=${data.authToken}; path=/; secure=${
            process.env.NODE_ENV === "production"
          }; samesite=strict; max-age=3600`;

          apiClient.defaults.headers.common["Authorization"] =
            `Bearer ${data.authToken}`;

          return apiClient(config);
        } catch (refreshError) {
          console.error("토큰 재발급 실패:", refreshError);

          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/members/login";
          return Promise.reject(refreshError);
        }
      } else if (status >= 500) {
        alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } else {
      alert("네트워크 연결 상태를 확인해주세요.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
