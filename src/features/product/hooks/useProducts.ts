import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { ProductDetailItems } from "@/types/ProductDetailItems.type";

export function useProductsDetail(productId: number) {
  const { data, loading, error, request } = useRequest<ProductDetailItems>();
  useEffect(() => {
    request("GET", `/v1/products/${productId}`);
  }, [productId, request]);
  return { data, loading, error };
}
