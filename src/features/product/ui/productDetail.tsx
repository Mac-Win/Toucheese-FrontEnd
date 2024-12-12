"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductDetail } from "../../../types/ProductDetail.type";
import useProductOrderStore from "../store/useProductOrderStore";
import useStudioStore from "@/features/studios/store/StudioStore";
import ProductCoverImage from "./ProductCoverImage";
import ProductSummary from "./ProductSummary";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";
import ReservationDate from "./ReservationDate";
import OrderButton from "./OrderButton";

type AddOption = ProductDetail["addOptions"][number];

interface ProductDetailsProps {
  product: ProductDetail;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();
  const { quantity, setOrderData } = useProductOrderStore();
  const studioId = useStudioStore((state) => state.studioId);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAddOptions, setSelectedAddOptions] = useState<AddOption[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 열기/닫기 상태

  const handleDateTimeSelect = (date: string | null, time: string | null) => {
    setSelectedDate(date); // 부모 컴포넌트에서 날짜 저장
    setSelectedTime(time); // 부모 컴포넌트에서 시간 저장
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleOrder = async () => {
    if (!selectedDate || !selectedTime || !studioId) {
      alert("모든 예약 정보를 입력해주세요.");
      return;
    }

    const reservationData = {
      productId: product.id,
      studioId,
      totalPrice: calculateTotalPrice(),
      createDate: selectedDate,
      createTime: selectedTime,
      personnel: quantity,
      addOptions: selectedAddOptions.map((option) => option.id),
    };

    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/members/carts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (!response.ok) {
        throw new Error(`상품담기 실패: ${response.status}`);
      }

      let result = null;
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      }

      alert("상품이 성공적으로 예약되었습니다.");
      console.log("서버 응답:", result);

      setOrderData({
        name: product.name,
        productTitle: product.name,
        productImage: product.productImage,
        productId: product.id,
        quantity,
        selectedAddOptions,
        selectedDate,
        totalPrice: calculateTotalPrice(),
      });

      router.push("/order/result");
    } catch (error) {
      console.error("예약 요청 중 오류 발생:", error);
      alert("예약 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const calculateTotalPrice = () => {
    const optionsTotal = selectedAddOptions.reduce(
      (sum, option) => sum + option.price,
      0
    );
    return product.price * quantity + optionsTotal;
  };

  return (
    <div>
      <ProductCoverImage product={product} />
      <ProductSummary product={product} studioId={studioId} />

      <ProductPrice product={product} />
      <ProductOptions
        options={product.addOptions}
        selectedOptions={selectedAddOptions}
        setSelectedOptions={setSelectedAddOptions}
      />

      {/* 예약 날짜 모달을 위한 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)} // 모달 열기
        className="mt-4 bg-gray-100 border text-gray-500 text-left py-2 px-4 rounded w-full"
      >
        {selectedDate && selectedTime
          ? `예약일 ${selectedDate} 예약시간 (${selectedTime})`
          : "희망 날짜와 시간을 선택해주세요."}
      </button>

      {/* 모달이 열렸을 때만 ReservationDate 컴포넌트를 렌더링 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-custom-bg p-6 rounded-lg w-full max-w-custom">
            {/* ReservationDate 컴포넌트 전달된 selectedDate, selectedTime */}
            <ReservationDate
              studioId={studioId || 0}
              onDateTimeSelect={handleDateTimeSelect}
              onCloseModal={handleCloseModal} // 모달 닫기 함수 전달
            />

            {/* 모달 닫기 버튼 */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)} // 모달 닫기
                className="py-1 px-4 rounded w-full bg-custom-bg border"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="mt-6 text-right">
        <strong>총 가격: {calculateTotalPrice().toLocaleString()}원</strong>
      </p>

      <OrderButton
        totalPrice={product.price * quantity}
        onClick={handleOrder}
      />
    </div>
  );
};

export default ProductDetails;
