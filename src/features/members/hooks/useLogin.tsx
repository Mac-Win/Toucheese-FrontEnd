import { useState } from "react";
import axios from "axios";
import useAuthStore from "@/features/common/store/useAuthStore";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useAuthStore();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/members`,
        {
          email,
          password,
        }
      );

      const authorization = response.headers["authorization"];
      if (!authorization) {
        throw new Error("서버로부터 유효한 토큰을 받지 못했습니다.");
      }

      const token = authorization.split(" ")[1];
      if (!token) {
        throw new Error("토큰 형식이 올바르지 않습니다.");
      }
      setToken(token);
      localStorage.setItem("authToken", token);

      window.location.href = "/";
    } catch (error) {
      console.error("로그인 실패:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("잘못된 이메일 또는 비밀번호입니다.");
        } else {
          setError(
            error.response?.data?.message || "서버 오류가 발생했습니다."
          );
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useLogin;
