import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductState {
  productId: number | null;
  productTitle: string;
  productDescription: string;
  productImage: string;
  setProductId: (id: number) => void;
  setProductTitle: (title: string) => void;
  setProductDescription: (description: string) => void;
  setProductImage: (image: string) => void;
}

const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      productId: null,
      productTitle: "",
      productDescription: "",
      productImage: "",
      setProductId: (id) => set({ productId: id }),
      setProductTitle: (title) => set({ productTitle: title }),
      setProductDescription: (description) =>
        set({ productDescription: description }),
      setProductImage: (image) => set({ productImage: image }),
    }),
    {
      name: "product-storage",
    }
  )
);

export default useProductStore;
