import useFetch from "@/features/common/hooks/useFetch";
import { ProductDetail } from "../types/products.type";

export function useProductsDetail(productId: number) {
  return useFetch<ProductDetail>(`/v1/products/${productId}`);
}
