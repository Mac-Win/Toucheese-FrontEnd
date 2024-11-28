import useFetch from "@/features/common/hooks/useFetch";

interface ProductDetail {
  id: number;
  name: string;
  description: string;
  productImage: string;
  reviewCount: number;
  standard: number;
  price: number;
  addOptions: [
    {
      name: string;
      price: number;
    },
  ];
}

export function useProductsDetail(productId: number) {
  return useFetch<ProductDetail>(`/v1/products/${productId}`);
}
