import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null; // JWT 토큰
  setToken: (token: string) => void; // 토큰 저장
  clearToken: () => void; // 토큰 삭제
}

// 로컬 스토리지를 'zustand'의 persist 미들웨어에 맞게 커스터마이징
const zustandLocalStorage = {
  getItem: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null, // 초기 상태는 null
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장될 키 이름
      storage: zustandLocalStorage, // 커스터마이징한 로컬 스토리지 사용
    }
  )
);

export default useAuthStore;
