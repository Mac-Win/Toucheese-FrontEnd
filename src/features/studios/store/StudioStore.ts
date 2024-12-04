import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudioStore {
  studioId: number | null;
  activeTab: string;
  setStudioId: (id: number) => void;
  setActiveTab: (tab: string) => void;
}

const useStudioStore = create<StudioStore>()(
  persist(
    (set) => ({
      studioId: null,
      activeTab: "가격", // 기본값
      setStudioId: (id) => set({ studioId: id }),
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    { name: "studio-store" } // 로컬 스토리지 키
  )
);

export default useStudioStore;
