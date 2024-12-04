"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router용 useRouter
import useProductOrderStore from "../store/useProductOrderStore";
import useStudioStore from "@/features/studios/store/StudioStore";
import { ProductDetail } from "../../../types/ProductDetail.type";
import Link from "next/link";
import ProductQuantity from "./ProductQuantity";

interface AddOption {
  name: string;
  price: number;
}
interface ProductDetailsProps {
  product: ProductDetail;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();
  const [selectedAddOptions, setSelectedAddOptions] = useState<AddOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { quantity } = useProductOrderStore(); // 전역 상태에서 가져옴
  const studioId = useStudioStore((state) => state.studioId);
  const setOrderData = useProductOrderStore((state) => state.setOrderData);

  // 옵션 체크박스 처리
  const handleOptionChange = (option: AddOption, isChecked: boolean) => {
    setSelectedAddOptions((prev) =>
      isChecked
        ? [...prev, option]
        : prev.filter((item) => item.name !== option.name)
    );
  };

  // 총 가격 계산
  const calculateTotalPrice = () => {
    const optionsTotal = selectedAddOptions.reduce(
      (sum, option) => sum + option.price,
      0
    );
    return product.price * quantity + optionsTotal;
  };

  // 주문하기 버튼 클릭 핸들러
  const handleOrder = () => {
    setOrderData({
      productId: product.id,
      quantity,
      selectedAddOptions,
      selectedDate,
      totalPrice: calculateTotalPrice(),
    });
    router.push("/order/result"); // 결과 화면으로 이동
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-custom-bg -m-4 p-4 pt-20">
        <div className="relative aspect-[3/4] w-1/2 bg-gray-200 rounded-md overflow-hidden">
          <Image
            src={product.productImage}
            alt={product.name}
            className="object-cover"
            fill
          />
        </div>
        <h2 className="text-xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      <div className="mt-8">
        <Link href={`/studios/${studioId}/products/${product.id}/reviews`}>
          상품리뷰 {product.reviewCount}개 보기
        </Link>
        <div className="flex justify-between items-center border-b py-4">
          <h3 className="text-lg font-semibold">가격</h3>
          <p className="font-bold text-lg">
            <span className="text-sm font-normal mr-2 text-gray-400">
              {product.standard}인 기준
            </span>
            {product.price.toLocaleString()}원
          </p>
        </div>
        {/* 인원 수 조절 */}
        <div className="flex justify-between items-center py-4">
          <h3 className="text-lg font-semibold">인원</h3>
          <div className="flex items-center space-x-2">
            <ProductQuantity product={product} />
          </div>
        </div>
        {/* 추가 옵션 */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">추가 옵션</h3>
          <ul className="mt-4">
            {product.addOptions.map((option, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b py-2"
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleOptionChange(option, e.target.checked)
                    }
                  />
                  <span>{option.name}</span>
                </label>
                <span>{option.price.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        </div>
        {/* 촬영 날짜 */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">촬영 날짜</h3>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={selectedDate || ""}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <p className="mt-2 text-sm text-gray-600">
              선택한 날짜: {selectedDate}
            </p>
          )}
        </div>
        {/* 주문 버튼 */}
        <div className="mt-8">
          <button
            className="w-full bg-yellow-500 text-white py-2 rounded font-bold"
            onClick={handleOrder}
          >
            주문하기 ({calculateTotalPrice().toLocaleString()}원)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
