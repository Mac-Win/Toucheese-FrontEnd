import useRequest from "@/features/common/hooks/useRequest";

function usePaymentRequest() {
  const { request, loading, error } = useRequest();

  const makePayment = async (cartIds: string) => {
    return await request("POST", "/v1/members/reservations", {
      cartIds,
    });
  };

  return { makePayment, loading, error };
}

export default usePaymentRequest;
