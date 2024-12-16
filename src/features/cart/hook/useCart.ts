import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { CartItem } from "@/types/Cart.type";

export function useCart() {
  const { data, loading, error, request } = useRequest<CartItem[]>();

  useEffect(() => {
    request("GET", `/v1/members/carts/list`);
  }, [request]);

  return {
    cartData: data || [],
    loading,
    error,
    refetch: () => request("GET", `/v1/members/carts/list`),
  };
}
