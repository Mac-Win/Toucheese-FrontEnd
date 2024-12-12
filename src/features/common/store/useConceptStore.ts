import { create } from "zustand";
import { persist } from "zustand/middleware";

type ConceptState = {
  conceptId: number | null;
  setConceptId: (id: number) => void;
  clearConceptId: () => void;
};

export const useConceptStore = create(
  persist<ConceptState>(
    (set) => ({
      conceptId: null,
      setConceptId: (id) => set({ conceptId: id }),
      clearConceptId: () => set({ conceptId: null }),
    }),
    {
      name: "concept-storage",
    }
  )
);
