import { create } from "zustand";

interface StudioState {
  studioId: number | null;
  setStudioId: (id: number) => void;
}

const useStudioStore = create<StudioState>((set) => ({
  studioId: null,
  setStudioId: (id) => set({ studioId: id }),
}));

export default useStudioStore;
