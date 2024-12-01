import { create } from "zustand";

interface StudioState {
  studioId: number | null;
  productId: number | null;
  productTitle: string | null;
  productDescription: string | null;
  productImage: string | null;
  setStudioId: (id: number) => void;
  setProductId: (id: number) => void;
  setProductTitle: (title: string) => void;
  setProductDescription: (description: string) => void;
  setProductImage: (image: string) => void;
}

const useStudioStore = create<StudioState>((set) => ({
  studioId: null,
  productId: null,
  productTitle: null,
  productDescription: null,
  productImage: null,
  setStudioId: (id) => set({ studioId: id }),
  setProductId: (id) => set({ productId: id }),
  setProductTitle: (title) => set({ productTitle: title }),
  setProductDescription: (description) =>
    set({ productDescription: description }),
  setProductImage: (image) => set({ productImage: image }),
}));

export default useStudioStore;
