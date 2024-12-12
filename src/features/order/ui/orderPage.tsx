"use client";

import { useSearchParams } from "next/navigation";
import { UserInfo } from "../components/UserInfo";
import { PaymentOptions } from "../components/PaymentOptions";
import { TotalAmountButton } from "../components/TotalAmountButton";
import { OrderProduct } from "../components/OrderProduct";
import usePaymentRequest from "../hooks/usePaymentRequest";
import useFetchCheckoutData from "../hooks/useFetchCheckoutData";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartIds = searchParams.get("cartIds");

  // 결제 데이터 가져오기
  const { data: checkoutData, loading, error } = useFetchCheckoutData(cartIds);

  // 결제 요청 훅
  const { makePayment } = usePaymentRequest();

  // 로딩 및 에러 처리
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!checkoutData) return <div>결제 정보가 없습니다.</div>;

  // 결제 처리 핸들러
  const handlePayment = async () => {
    if (!cartIds) {
      alert("결제 정보가 없습니다.");
      return;
    }

    try {
      const result = await makePayment(cartIds);
      alert("주문이 성공적으로 완료되었습니다!");
      console.log(result);
      router.push(`/reservation`);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    }
  };

  const { cartPaymentList, memberContactInfo } = checkoutData;
  const totalAmount = cartPaymentList.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div className="mt-10">
      <UserInfo memberContactInfo={memberContactInfo} />
      <OrderProduct cartPaymentList={cartPaymentList} />
      <PaymentOptions />
      <TotalAmountButton totalAmount={totalAmount} onClick={handlePayment} />
    </div>
  );
};

export default OrderPage;
