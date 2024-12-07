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

interface ProductDetailsProps {
  product: ProductDetail;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();
  const { quantity, setOrderData } = useProductOrderStore();
  const studioId = useStudioStore((state) => state.studioId);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAddOptions, setSelectedAddOptions] = useState<
    { name: string; price: number }[]
  >([]);

  const [customerName, setCustomerName] = useState<string>(""); // 사용자 이름
  const [phone, setPhone] = useState<string>(""); // 사용자 전화번호
  //회원대신

  const handleOrder = () => {
    setOrderData({
      name: product.name, // 추가
      productTitle: product.name, // 상품 이름
      productImage: product.productImage, // 상품 이미지
      productId: product.id, // 상품 ID
      quantity,
      selectedAddOptions,
      selectedDate,
      totalPrice: calculateTotalPrice(),
      customerName,
      phone,
    });
    router.push("/order/result");
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

      <div className="mt-6">
        <label>
          이름:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border p-2"
          />
        </label>
        <label>
          전화번호:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>
      <ProductPrice product={product} />
      <ProductOptions
        options={product.addOptions}
        selectedOptions={selectedAddOptions}
        setSelectedOptions={setSelectedAddOptions}
      />

      <ReservationDate
        onConfirm={(date, time) => setSelectedDate(`${date}, ${time}`)}
        availableStartTimes={[]}
        businessDays={[]}
      />

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
