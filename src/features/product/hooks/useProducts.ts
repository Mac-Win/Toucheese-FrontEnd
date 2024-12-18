import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { ProductDetail } from "@/types/ProductDetail.type";

export function useProductsDetail(productId: number) {
  const { data, loading, error, request } = useRequest<ProductDetail>();
  useEffect(() => {
    request("GET", `/v1/products/${productId}`);
  }, [productId, request]);
  return { data, loading, error };
}
