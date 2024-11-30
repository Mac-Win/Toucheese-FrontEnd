"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router용 useRouter
import useProductOrderStore from "../store/useProductOrderStore";
import Link from "next/link";

interface AddOption {
  name: string;
  price: number;
}

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    description: string;
    productImage: string;
    reviewCount: number;
    standard: number; // 최대 인원
    price: number;
    addOptions: AddOption[];
  };
}

const ProductDetails = ({ product }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOptions, setSelectedAddOptions] = useState<AddOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const router = useRouter();
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
    <div className="p-4">
      <div className="flex flex-col items-center">
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
        <Link
          href={`http://api.toucheese-macwin.store/v1/studios/${product.id}/products/${product.id}/reviews`}
        >
          리뷰 {product.reviewCount}개
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
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              <Image
                src="/icons/minus.svg"
                alt="minus"
                width={24}
                height={24}
              />
            </button>
            <span>{quantity}명</span>
            <button
              onClick={() =>
                setQuantity((prev) => Math.min(product.standard, prev + 1))
              } // `standard` 기준 초과 제한
              disabled={quantity >= product.standard} // 초과 시 비활성화
            >
              <Image src="/icons/plus.svg" alt="plus" width={24} height={24} />
            </button>
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
