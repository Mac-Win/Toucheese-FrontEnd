"use client";

import { useState } from "react";
import Image from "next/image";
// import { useCartStore } from "../store/useCartStore";

interface CartItemProps {
  item: {
    id: string;
    studioName: string;
    productName: string;
    quantity: number;
    date: string;
    time: string;
    totalPrice: number;
    image: string;
  };
  isSelected: boolean;
  onSelect: (id: string, isSelected: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, isSelected, onSelect }) => {
  const {
    id,
    studioName,
    productName,
    quantity,
    date,
    time,
    totalPrice,
    image,
  } = item;

  // const removeItem = useCartStore((state) => state.removeItem);
  const [updatePanel, setUpdatePanel] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(quantity);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTime, setEditedTime] = useState(time);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(id, e.target.checked);
  };

  const handleUpdate = () => setUpdatePanel(true);

  const handleSaveChanges = () => {
    setUpdatePanel(false); // 바텀시트 닫기
    // TODO: API 연동 로직 추가
    console.log("변경된 옵션:", {
      id,
      editedQuantity,
      editedDate,
      editedTime,
    });
  };

  const closeUpdatePanel = () => {
    setUpdatePanel(false);
    // 변경 취소 시 기존 값 복원
    setEditedQuantity(quantity);
    setEditedDate(date);
    setEditedTime(time);
  };
  return (
    <div
      className={`bg-custom-bg mb-4 rounded-lg shadow-md overflow-hidden ${
        isSelected
          ? "border-2 border-yellow-500"
          : "border-2 border-transparent"
      }`}
    >
      <div
        className={
          "flex items-center justify-between bg-cheese-bg bg-opacity-40 px-4 py-2"
        }
      >
        <div className="flex items-center gap-4 ">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <h3 className="text-lg font-bold">{studioName}</h3>
        </div>
        <div className="inline-flex items-center">
          <label htmlFor="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md bg-white border-white checked:bg-cheese-bg checked:border-slate-800"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div>
      </div>
      <div className="flex mt-4 p-4">
        <div className="w-1/4 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={productName}
            className="object-cover"
            width={200}
            height={300}
          />
        </div>
        <div className="flex-1 px-4 flex flex-col">
          <p className="text-lg font-bold">{productName}</p>
          <p className="text-gray-500">예약 인원: {editedQuantity}명</p>
          <p className="text-gray-500">예약 날짜: {editedDate}</p>
          <p className="text-gray-500">예약 시간: {editedTime}</p>
          <p className="text-md font-bold mt-2 ">
            ₩{totalPrice.toLocaleString()}
          </p>
          <button
            className="text-cheese-bg text-sm hover:underline ml-auto"
            onClick={handleUpdate}
          >
            옵션 변경
          </button>
        </div>
      </div>
      {/* <div className="flex flex-col items-end gap-2">
          <button
            className="text-red-500 text-sm hover:underline"
            onClick={() => removeItem(id)}
          >
            삭제
          </button>
        </div> */}
      {/* 바텀시트 */}
      {updatePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">옵션 변경</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeUpdatePanel}
              >
                닫기
              </button>
            </div>
            <div>
              <label className="block mb-4">
                <span className="text-gray-700">예약 인원:</span>
                <input
                  type="number"
                  className="block w-full border rounded p-2 mt-1"
                  value={editedQuantity}
                  onChange={(e) => setEditedQuantity(Number(e.target.value))}
                  min="1"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">예약 날짜:</span>
                <input
                  type="date"
                  className="block w-full border rounded p-2 mt-1"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
              </label>
              <label className="block mb-6">
                <span className="text-gray-700">예약 시간:</span>
                <input
                  type="time"
                  className="block w-full border rounded p-2 mt-1"
                  value={editedTime}
                  onChange={(e) => setEditedTime(e.target.value)}
                />
              </label>
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-cheese-bg text-white py-2 rounded font-bold hover:bg-blue-600"
                  onClick={handleSaveChanges}
                >
                  저장
                </button>
                <button
                  className="flex-1 bg-custom-bg text-gray-700 py-2 rounded font-bold hover:bg-gray-200"
                  onClick={closeUpdatePanel}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
