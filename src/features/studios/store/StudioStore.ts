import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudioState {
  studioId: number | null;
  setStudioId: (id: number) => void;
}

const useStudioStore = create<StudioState>()(
  persist(
    (set) => ({
      studioId: null,
      setStudioId: (id) => set({ studioId: id }),
    }),
    {
      name: "studio-storage",
    }
  )
);

export default useStudioStore;
