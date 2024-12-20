import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null; // JWT 토큰
  setToken: (token: string) => void; // 토큰 저장
  clearToken: () => void; // 토큰 삭제
}
const zustandLocalStorage = {
  getItem: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: (key: string, value: unknown) => {
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
      name: "auth-storage",
      storage: zustandLocalStorage,
    }
  )
);

export default useAuthStore;
