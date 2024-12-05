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

  const handleOrder = () => {
    setOrderData({
      productTitle: product.name,
      productId: product.id,
      quantity,
      selectedAddOptions,
      selectedDate,
      totalPrice: product.price * quantity,
      name: product.name,
      productImage: product.productImage,
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
      <ProductPrice product={product} />
      <ProductOptions
        options={product.addOptions}
        selectedOptions={selectedAddOptions}
        setSelectedOptions={setSelectedAddOptions}
      />

      <ReservationDate
        onConfirm={(date, time) => setSelectedDate(`${date}, ${time}`)}
        OperatingHours={{
          start: "",
          end: "",
        }}
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
