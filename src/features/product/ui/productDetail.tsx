"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductDetail } from "@/types/ProductDetail.type";
import useProductOrderStore from "../store/useProductOrderStore";
import useStudioStore from "@/features/studios/store/StudioStore";
import ProductCoverImage from "./ProductCoverImage";
import ProductSummary from "./ProductSummary";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";
import ReservationDate from "./ReservationDate";
import OrderButton from "./OrderButton";
import Image from "next/image";

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
    setSelectedDate(date);
    setSelectedTime(time);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      router.push("/cart/");
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
    <div className="flex flex-col gap-4">
      <div className="p-4 border shadow-sm rounded-lg">
        <ProductCoverImage product={product} />
        <ProductSummary product={product} studioId={studioId} />
        <ProductPrice product={product} />
      </div>

      <ProductOptions
        options={product.addOptions}
        selectedOptions={selectedAddOptions}
        setSelectedOptions={setSelectedAddOptions}
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-gray-2 border text-gray-9 text-left py-2 px-4 rounded-lg w-full flex items-center gap-2"
      >
        <Image
          src="/icons/product/calendar_today.svg"
          alt="예약달력"
          width={20}
          height={20}
        />
        {selectedDate && selectedTime
          ? `예약일 ${selectedDate} 예약시간 (${selectedTime})`
          : "희망 날짜와 시간을 선택해주세요."}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ReservationDate
            studioId={studioId || 0}
            onDateTimeSelect={handleDateTimeSelect}
            onCloseModal={handleCloseModal}
          />
        </div>
      )}

      <OrderButton
        onClick={handleOrder}
        calculateTotalPrice={calculateTotalPrice}
      />
    </div>
  );
};

export default ProductDetails;
