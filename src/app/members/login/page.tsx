"use client";

import { useGNBStore } from "@/features/common/store/useGnbStore";
import useLogin from "@/features/members/hooks/useLogin";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function LoginPage() {
  const {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();
  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  return (
    <div className="flex-grow w-full left-0 top-0 bottom-0 right-0 flex flex-col justify-center gap-4 p-4 pb-20">
      <div className="relative flex flex-col gap-4 ">
        <Image
          src="/symbols/toucheese_font_logo.svg"
          alt="터치즈"
          width={200}
          height={100}
        />
        <div>
          <p className="text-lg font-bold">스튜디오 고민은 그만!</p>
          <p className="text-md font-medium text-gray-700">
            터치즈에 로그인하고 스튜디오를 한 눈에 살펴보세요.
          </p>
        </div>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="font-medium hidden">
              이메일
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-4 border rounded-lg outline-none focus:border-yellow-500"
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="font-medium hidden">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-4 border rounded-lg outline-none focus:border-yellow-500"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between text-gray-700">
            <div className="flex gap-2 ">
              <input type="checkbox" />
              <label htmlFor="password" className="font-medium">
                자동로그인
              </label>
            </div>
            <div className="flex ">
              <Link href="javascript:;">회원가입</Link>
              <span>/</span>
              <Link href="javascript:;">ID·PASSWORD 찾기</Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-btn-color font-bold py-3 rounded-lg"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
