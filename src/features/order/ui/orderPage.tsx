"use client";
import { CheckoutResponse } from "@/types/Checkout.type";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UserInfo } from "../components/UserInfo";
import { PaymentOptions } from "../components/PaymentOptions";
import { TotalAmountButton } from "../components/TotalAmountButton";
import { OrderProduct } from "../components/OrderProduct";

const OrderPage = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const cartIds = searchParams.get("cartIds");

  useEffect(() => {
    if (!cartIds) {
      setError("결제할 장바구니 항목이 없습니다.");
      setLoading(false);
      return;
    }

    const fetchCheckoutData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `https://api.toucheese-macwin.store/v1/members/carts/checkout-items?cartIds=${cartIds}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("결제 정보 조회에 실패했습니다.");
        }

        const data: CheckoutResponse = await response.json();
        setCheckoutData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [cartIds]);

  const handlePayment = () => {
    alert("결제 페이지로 이동하도록 스프린트 예정입니다.");
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!checkoutData) return <div>결제 정보가 없습니다.</div>;

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
