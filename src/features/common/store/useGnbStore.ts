import { create } from "zustand";

interface GNBState {
  showGNB: boolean;
  setShowGNB: (value: boolean) => void;
}

export const useGNBStore = create<GNBState>((set) => ({
  showGNB: true, // 기본값: GNB 표시
  setShowGNB: (value) => set({ showGNB: value }),
}));
