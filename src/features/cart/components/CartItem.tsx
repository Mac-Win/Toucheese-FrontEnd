"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "../store/useCartStore";

interface CartItemProps {
  id: string;
  studioName: string;
  productName: string;
  quantity: number;
  date: string;
  time: string;
  totalPrice: number;
  image: string;
}

const CartItem = ({
  id,
  studioName,
  productName,
  quantity,
  date,
  time,
  totalPrice,
  image,
}: CartItemProps) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const [updatePanel, setUpdatePanel] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(quantity);
  const [editedDate, setEditedDate] = useState(date);
  const [editedtime, setEditedtime] = useState(time);

  const handleUpdate = () => {
    setUpdatePanel(true);
  };

  const handleSaveChanges = () => {
    setUpdatePanel(false); // 바텀시트를 닫음
    // API 업데이트 로직은 이후 추가 가능
  };

  const closeUpdatePanel = () => {
    setUpdatePanel(false);
    // 변경 취소 시 기존 값으로 복원
    setEditedQuantity(quantity);
    setEditedDate(date);
  };

  return (
    <div className="bg-custom-bg py-2 -mx-2 px-2 mb-6 rounded-lg">
      <div className="flex">
        <div className="rounded-full w-10 h-10 bg-cheese-bg"></div>
        <h3 className="text-lg font-bold">{studioName}</h3>
      </div>
      <div className="flex  py-4">
        <div className="w-1/4">
          <Image
            src={image}
            alt={productName}
            className="rounded-lg w-full"
            width={100}
            height={200}
          />
        </div>
        <div className="flex-1 px-4 flex flex-col justify-center gap-2">
          <p className="text-gray-700 text-lg font-bold mb-auto">
            {productName}
          </p>
          <p className="text-md text-gray-500 ">예약인원: {editedQuantity}명</p>
          <p className="text-md text-gray-500 ">예약날짜: {editedDate}</p>
          <p className="text-md text-gray-500 ">예약시간: {editedtime}</p>
          <p className="text-md font-bold">₩{totalPrice.toLocaleString()}</p>
        </div>
        <div className="justify-stretch w-1/6 flex-1 flex flex-col items-end">
          <button
            className="text-red-500 text-sm"
            onClick={() => removeItem(id)}
          >
            삭제
          </button>
          <button
            className="mt-auto text-blue-500 text-sm"
            onClick={handleUpdate}
          >
            옵션 변경
          </button>
        </div>
      </div>

      {/* 바텀시트 */}
      {updatePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-custom rounded-t-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">옵션 변경</h3>
              <button className="text-gray-500" onClick={closeUpdatePanel}>
                닫기
              </button>
            </div>
            <div>
              <label className="block mb-2">
                예약 인원:
                <input
                  type="number"
                  className="block w-full border rounded p-2 mt-1"
                  value={editedQuantity}
                  onChange={(e) => setEditedQuantity(Number(e.target.value))}
                  min="1"
                />
              </label>
              <label className="block mb-4">
                예약 날짜:
                <input
                  type="date"
                  className="block w-full border rounded p-2 mt-1"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
              </label>
              <input
                type="text"
                onChange={(e) => setEditedtime(e.target.value)}
              />
              <button
                className="w-full bg-blue-500 text-white py-2 rounded font-bold"
                onClick={handleSaveChanges}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
