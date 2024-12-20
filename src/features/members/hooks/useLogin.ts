import { useState } from "react";
import useRequest from "@/features/common/hooks/useRequest";
interface LoginResponse {
  refreshToken: string;
  deviceId: string;
  memberId: number;
  name: string;
}

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, request } = useRequest<LoginResponse>();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await request("POST", "/v1/members", {
        email,
        password,
      });

      const { refreshToken, deviceId, memberId, name } = response;

      document.cookie = `refreshToken=${refreshToken}; path=/; secure=${
        process.env.NODE_ENV === "production"
      }; samesite=strict; max-age=604800`;
      document.cookie = `deviceId=${deviceId}; path=/; secure=${
        process.env.NODE_ENV === "production"
      }; samesite=strict; max-age=604800`;

      localStorage.setItem(
        "user",
        JSON.stringify({ memberId, name, deviceId })
      );

      window.location.href = "/";
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useLogin;
