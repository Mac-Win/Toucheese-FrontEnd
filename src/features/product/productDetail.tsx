"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { product, Addon } from "@/app/constants/product";

function ProductDetail() {
  // 상태 관리
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  // 선택된 추가 구매 옵션 업데이트
  const handleAddonChange = (addon: Addon, isChecked: boolean) => {
    if (isChecked) {
      setSelectedAddons((prev) => [...prev, addon]); // 옵션 추가
    } else {
      setSelectedAddons((prev) => prev.filter((item) => item.id !== addon.id)); // 옵션 제거
    }
  };

  // 총 가격 계산
  const addonTotalPrice = selectedAddons.reduce(
    (total, addon) => total + addon.price,
    0
  );
  const totalPrice = product.price * quantity + addonTotalPrice;

  return (
    <div>
      <div className="bg-custom-bg -mx-4 p-4">
        <Link href="../" className="">
          <Image src="/icons/back.svg" alt="뒤로가기" width={36} height={36} />
        </Link>

        <div className="flex flex-col justify-center items-center w-full m-auto mt-10 mb-8">
          <div className="aspect-3/4 bg-gray-300 w-1/2 relative">
            <Image
              className="object-cover"
              src={product.productImage}
              alt={product.name}
              fill
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-medium mb-4">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-white -mx-4 p-4">
        <div className="my-4">
          <div className="flex justify-between py-2 border-b">
            <h3 className="text-2xl font-medium">가격</h3>
            <div className="items-center">
              <span className="text-sm text-gray-600 mr-2">1인 기준</span>
              <span className="text-lg font-bold">
                {product.price.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <h4 className="text-xl font-medium">인원</h4>
            <div className="flex items-center space-x-4">
              <button
                className="w-8 h-8 flex justify-center items-center bg-gray-200 rounded-lg"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}명</span>
              <button
                className="w-8 h-8 flex justify-center items-center bg-gray-200 rounded-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 추가 구매 옵션 */}
        <div className="mt-8">
          <h3 className="text-2xl font-medium mb-4">추가 구매</h3>
          <ul className="space-y-4">
            {product.addons.map((addon) => (
              <li key={addon.id} className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="addon"
                    value={addon.id}
                    className="mr-2"
                    onChange={(e) => handleAddonChange(addon, e.target.checked)}
                  />
                  {addon.name}
                </label>
                <span className="text-gray-700">
                  {addon.price.toLocaleString()}원
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-medium mb-4">촬영 날짜</h3>
          <label className="block relative">
            <input
              type="date"
              placeholder="예약일자 및 시간 선택"
              className="w-full p-3 border rounded-md"
              min="2024-01-01"
              max="2028-12-31"
            />
          </label>
        </div>

        <div className="mt-8">
          <button className="w-full bg-yellow-500 text-white text-lg font-bold py-4 rounded-md">
            선택 상품 주문 ({totalPrice.toLocaleString()}원)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
