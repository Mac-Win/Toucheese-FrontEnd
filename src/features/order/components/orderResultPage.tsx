"use client";

import { useRouter } from "next/navigation";
import useProductOrderStore from "@/features/product/store/useProductOrderStore";

function OrderResultPage() {
  const { productId, quantity, selectedAddOptions, selectedDate, totalPrice } =
    useProductOrderStore((state) => state);

  const router = useRouter();

  // 주문 데이터가 없을 경우 처리
  if (!productId) {
    return (
      <div className="p-4">
        <h1 className="text-lg font-bold">주문 데이터가 없습니다.</h1>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          홈으로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">주문 완료</h1>

      {/* 주문 요약 */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">주문 내역</h2>
        <p className="text-sm">
          <span className="font-bold">상품 ID:</span> {productId}
        </p>
        <p className="text-sm">
          <span className="font-bold">인원:</span> {quantity}명
        </p>
        <p className="text-sm">
          <span className="font-bold">촬영 날짜:</span>{" "}
          {selectedDate || "미선택"}
        </p>
        {selectedAddOptions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">추가 옵션:</h3>
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

      {/* 홈으로 돌아가기 버튼 */}
      <button
        onClick={() => router.push("/")}
        className="w-full bg-yellow-500 text-white py-2 rounded font-bold"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default OrderResultPage;
