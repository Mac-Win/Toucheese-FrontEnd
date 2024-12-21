"use client";

import { useProductDetail } from "../hooks/usePostProducts";
import { ProductDetailItems } from "@/types/ProductDetailItems.type";
import ProductCoverImage from "../components/ProductCoverImage";
import ProductSummary from "../components/ProductSummary";
import ProductOptions from "../components/ProductOptions";
import ProductPrice from "../components/ProductPrice";
import ReservationDate from "../components/ReservationDate";
import OrderButton from "../components/OrderButton";
import Image from "next/image";

interface ProductDetailsProps {
  product: ProductDetailItems;
}

const ProductDetail = ({ product }: ProductDetailsProps) => {
  const {
    selectedDate,
    selectedTime,
    selectedAddOptions,
    isModalOpen,
    setSelectedAddOptions,
    setIsModalOpen,
    handleDateTimeSelect,
    handleCloseModal,
    handleOrder,
    calculateTotalPrice,
    studioId,
  } = useProductDetail(product);

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

export default ProductDetail;
