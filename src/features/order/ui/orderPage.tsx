"use client";

import { useSearchParams } from "next/navigation";
import { UserInfo } from "../components/UserInfo";
import { PaymentOptions } from "../components/PaymentOptions";
import { TotalAmountButton } from "../components/TotalAmountButton";
import { OrderProduct } from "../components/OrderProduct";
import usePaymentRequest from "../hooks/usePaymentRequest";
import useFetchCheckoutData from "../hooks/useFetchCheckoutData";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartIds = searchParams.get("cartIds");

  const { data: checkoutData, loading, error } = useFetchCheckoutData(cartIds);

  const { makePayment } = usePaymentRequest();
  const [isProcessing, setIsProcessing] = useState(false); // 로딩 상태 추가

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!checkoutData) return <div>결제 정보가 없습니다.</div>;

  const handlePayment = async () => {
    if (isProcessing) return; // 중복 호출 방지
    setIsProcessing(true); // 로딩 상태 시작

    if (!cartIds) {
      alert("결제 정보가 없습니다.");
      router.push("/carts");
      setIsProcessing(false); // 로딩 상태 해제
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
    } finally {
      setIsProcessing(false); // 로딩 상태 해제
    }
  };

  const { cartPaymentList = [], memberContactInfo } = checkoutData;
  const totalAmount = cartPaymentList.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  return (
    <div className="mt-20">
      <UserInfo memberContactInfo={memberContactInfo} />
      <OrderProduct cartPaymentList={cartPaymentList} />
      <PaymentOptions />
      <TotalAmountButton
        totalAmount={totalAmount}
        onClick={handlePayment}
        disabled={isProcessing} // 버튼 비활성화 상태 추가
      />
    </div>
  );
};

export default OrderPage;
