"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { product as ProductList, Addon } from "@/api/data/productTestData";

const ProductDetail = ({ productid }: { productid: number }) => {
  const product = ProductList.content.find((p) => p.id === productid);

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">
        상품을 찾을 수 없습니다.
      </div>
    );
  }

  const handleAddonChange = (addon: Addon, isChecked: boolean) => {
    setSelectedAddons((prev) =>
      isChecked ? [...prev, addon] : prev.filter((item) => item.id !== addon.id)
    );
  };

  const calculateTotalPrice = () => {
    const addonTotalPrice = selectedAddons.reduce(
      (total, addon) => total + addon.price,
      0
    );
    return product.price * quantity + addonTotalPrice;
  };

  return (
    <div>
      <div className="bg-custom-bg -mx-4 p-4">
        <Link href="../">
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
          <h2 className="text-3xl font-medium mb-4">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>

      <div className="bg-white -mx-4 p-4">
        <div className="flex justify-between py-2 border-b">
          <h3 className="text-2xl font-medium">가격</h3>
          <div>
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
              className="w-8 h-8 bg-gray-200 rounded-lg"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="text-lg">{quantity}명</span>
            <button
              className="w-8 h-8 bg-gray-200 rounded-lg"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>

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
                    checked={selectedAddons.some(
                      (item) => item.id === addon.id
                    )}
                    onChange={(e) => handleAddonChange(addon, e.target.checked)}
                  />
                  {addon.name}
                </label>
                <span>{addon.price.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-medium mb-4">촬영 날짜</h3>
          <input
            type="date"
            className="w-full p-3 border rounded-md"
            min="2024-01-01"
            max="2028-12-31"
            value={selectedDate || ""}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <p className="mt-2 text-gray-600">선택한 날짜: {selectedDate}</p>
          )}
        </div>

        <div className="mt-8">
          <button className="w-full bg-yellow-500 text-white text-lg font-bold py-4 rounded-md">
            선택 상품 주문 ({calculateTotalPrice().toLocaleString()}원)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
