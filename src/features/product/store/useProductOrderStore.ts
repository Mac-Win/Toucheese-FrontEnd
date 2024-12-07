import { create } from "zustand";

interface ProductOrderState {
  productTitle: string;
  productId: number | null;
  productImage: string;
  quantity: number;
  selectedAddOptions: { name: string; price: number }[];
  selectedDate: string | null;
  totalPrice: number;
  customerName: string;
  phone: string;
  setQuantity: (value: number) => void;
  setOrderData: (data: {
    name: string | undefined;
    productTitle: string;
    productImage: string;
    productId: number;
    quantity: number;
    selectedAddOptions: { name: string; price: number }[];
    selectedDate: string | null;
    totalPrice: number;
    customerName: string;
    phone: string;
  }) => void;
}

const useProductOrderStore = create<ProductOrderState>((set) => ({
  productTitle: "",
  productId: null,
  productImage: "",
  quantity: 1,
  selectedAddOptions: [],
  selectedDate: null,
  totalPrice: 0,
  customerName: "",
  phone: "",
  setQuantity: (value) => set({ quantity: value }),
  setOrderData: (data) =>
    set({
      productImage: data.productImage,
      productTitle: data.name,
      productId: data.productId,
      quantity: data.quantity,
      selectedAddOptions: data.selectedAddOptions,
      selectedDate: data.selectedDate,
      totalPrice: data.totalPrice,
      customerName: data.customerName,
      phone: data.phone,
    }),
}));

export default useProductOrderStore;
