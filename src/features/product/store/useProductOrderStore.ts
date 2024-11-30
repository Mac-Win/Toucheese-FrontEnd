import { create } from "zustand";

interface ProductOrderState {
  productId: number | null;
  quantity: number;
  selectedAddOptions: { name: string; price: number }[];
  selectedDate: string | null;
  totalPrice: number;
  setOrderData: (data: {
    productId: number;
    quantity: number;
    selectedAddOptions: { name: string; price: number }[];
    selectedDate: string | null;
    totalPrice: number;
  }) => void;
}

const useProductOrderStore = create<ProductOrderState>((set) => ({
  productId: null,
  quantity: 1,
  selectedAddOptions: [],
  selectedDate: null,
  totalPrice: 0,
  setOrderData: (data) =>
    set({
      productId: data.productId,
      quantity: data.quantity,
      selectedAddOptions: data.selectedAddOptions,
      selectedDate: data.selectedDate,
      totalPrice: data.totalPrice,
    }),
}));

export default useProductOrderStore;
