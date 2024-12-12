"use client";

import { useRouter } from "next/navigation";
import useProductOrderStore from "@/features/product/store/useProductOrderStore";
import Image from "next/image";

function OrderResultPage() {
  const {
    productTitle,
    productId,
    quantity,
    selectedAddOptions,
    selectedDate,
    totalPrice,
    productImage,
  } = useProductOrderStore((state) => state);

  const router = useRouter();

  if (!productId) {
    return (
      <div className="p-4">
        <h1 className="text-lg font-bold">주문 데이터가 없습니다.</h1>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-cheese-bg w-full text-white py-2 px-4 rounded"
        >
          홈으로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">주문 완료</h1>

      <h2 className="text-lg font-semibold mb-2">주문 내역</h2>
      <div className="bg-custom-bg p-4 rounded-lg shadow-md mb-6 flex gap-4">
        <div className="relative max-w-48 w-full h-full aspect-3/4 overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={productImage}
            alt={productTitle}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="text-md flex">
            <p className="font-bold">상품 명/</p>
            <p> {productTitle}</p>
          </div>
          <div className="text-md flex">
            <p className="font-bold">인원/</p>
            <p>{quantity}명</p>
          </div>
          <div className="text-md flex">
            <p className="font-bold">촬영 날짜/</p>
            <p>{selectedDate}</p>
          </div>
          {selectedAddOptions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">추가 옵션:</h3>
              <ul>
                {selectedAddOptions.map((option, idx) => (
                  <li key={idx} className="text-sm">
                    {option.name} - {option.price.toLocaleString()}원
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-lg font-bold mt-4">
            총 가격: {totalPrice.toLocaleString()}원
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => router.push("/cart")}
          className="bg-custom-bg w-full text-black py-2 rounded font-bold border-2 border-gray-100"
        >
          장바구니로 이동하기
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-cheese-bg w-full text-white py-2 rounded font-bold"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default OrderResultPage;
