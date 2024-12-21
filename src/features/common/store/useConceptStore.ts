import { create } from "zustand";
import { persist } from "zustand/middleware";

type ConceptState = {
  conceptId: number | null;
  conceptName: string | null;
  setConceptId: (id: number) => void;
  setConceptName: (name: string) => void;
  clearConcept: () => void;
};

export const useConceptStore = create(
  persist<ConceptState>(
    (set) => ({
      conceptId: null,
      conceptName: null,
      setConceptId: (id) => set({ conceptId: id }),
      setConceptName: (name) => set({ conceptName: name }),
      clearConcept: () => set({ conceptId: null, conceptName: null }),
    }),
    {
      name: "concept-storage",
    }
  )
);
