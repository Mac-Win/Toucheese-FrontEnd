import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudioState {
  studioId: number | null;
  productId: number | null;
  productTitle: string | null;
  productDescription: string | null;
  productImage: string | null;
  setStudioId: (id: number) => void; // studioId 설정 메서드
  setProductId: (id: number) => void; // productId 설정 메서드
  setProductTitle: (title: string) => void; // productTitle 설정 메서드
  setProductDescription: (description: string) => void; // productDescription 설정 메서드
  setProductImage: (image: string) => void; // productImage 설정 메서드
}

const useStudioStore = create<StudioState>()(
  persist(
    (set) => ({
      studioId: null,
      productId: null,
      productTitle: "",
      productDescription: "",
      productImage: "",
      setStudioId: (id) => set({ studioId: id }),
      setProductId: (id) => set({ productId: id }),
      setProductTitle: (title) => set({ productTitle: title }),
      setProductDescription: (description) =>
        set({ productDescription: description }),
      setProductImage: (image) => set({ productImage: image }),
    }),
    {
      name: "studio-storage",
    }
  )
);

export default useStudioStore;
