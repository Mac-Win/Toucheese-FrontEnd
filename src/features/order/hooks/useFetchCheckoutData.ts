import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { CheckoutResponse } from "@/types/Checkout.type";

function useFetchCheckoutData(cartIds: string | null) {
  const { data, loading, error, request } = useRequest<CheckoutResponse>();

  useEffect(() => {
    if (!cartIds) return;

    const fetchData = async () => {
      try {
        await request(
          "GET",
          `/v1/members/carts/checkout-items`,
          undefined,
          new URLSearchParams({ cartIds })
        );
      } catch {
        // 에러는 내부 상태에서 관리되므로 추가 처리 불필요
      }
    };

    fetchData();
  }, [cartIds, request]);

  return { data, loading, error };
}

export default useFetchCheckoutData;
