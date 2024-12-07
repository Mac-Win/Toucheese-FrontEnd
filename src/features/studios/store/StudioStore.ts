import { create } from "zustand";
import { persist } from "zustand/middleware";
interface OperatingHour {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
}
interface StudioStore {
  studioId: number | null;
  activeTab: string;
  operatingHours: OperatingHour[];
  setOperatingHours: (hours: OperatingHour[]) => void;
  setStudioId: (id: number) => void;
  setActiveTab: (tab: string) => void;
}

const useStudioStore = create<StudioStore>()(
  persist(
    (set) => ({
      studioId: null,
      activeTab: "가격", // 기본값
      operatingHours: [],
      setOperatingHours: (hours) => set(() => ({ operatingHours: hours })),
      setStudioId: (id) => set({ studioId: id }),
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    { name: "studio-store" } // 로컬 스토리지 키
  )
);

export default useStudioStore;
