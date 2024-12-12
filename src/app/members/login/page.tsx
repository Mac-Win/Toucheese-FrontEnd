"use client";

import useLogin from "@/features/members/hooks/useLogin";
import Image from "next/image";

function LoginPage() {
  const {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex-grow absolute w-full left-0 -top-20 bg-btn-color h-full flex flex-col justify-center">
      <div className="mx-auto mb-10">
        <Image
          src="/symbols/toucheese_kr_logo.svg"
          alt="터치즈"
          width={200}
          height={100}
        />
      </div>
      <div className="max-w-md mx-auto p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">
              이메일
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-2 border rounded"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-cheese-bg text-white py-2 rounded"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
