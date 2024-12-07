"use client";

import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import { TopBar } from "@/features/common/components/topbar";
import Image from "next/image";

const CartPage = () => {
  const initialItems = [
    {
      id: "1",
      studioName: "공원 스튜디오",
      productName: "프로필사진",
      quantity: 1,
      date: "2024-12-05",
      time: "18:00",
      totalPrice: 1700000,
      image: "https://i.imgur.com/kfDyrH2.jpeg",
    },
    {
      id: "2",
      studioName: "공원 스튜디오",
      productName: "프로필사진",
      quantity: 1,
      date: "2024-12-05",
      time: "18:00",
      totalPrice: 1700000,
      image: "https://i.imgur.com/kfDyrH2.jpeg",
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  const handleSelect = (id: string, isSelected: boolean) => {
    setSelectedIds((prev) =>
      isSelected
        ? [...prev, id]
        : prev.filter((selectedId) => selectedId !== id)
    );
  };

  const handleDelete = () => {
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setShowModal(false);
  };

  return (
    <>
      <TopBar showShare={false} message="장바구니"></TopBar>
      <div className="mt-14">
        {items.length > 0 ? (
          <>
            <button
              onClick={() => setShowModal(true)}
              disabled={selectedIds.length === 0}
              className={`mt-4 px-4 py-2 z-20 absolute top-0 right-4 flex items-center ${
                selectedIds.length > 0 ? "text-cheese-bg" : "text-black"
              }`}
            >
              <Image
                src="/icons/trash.svg"
                alt="상품비우기"
                width={20}
                height={20}
              />
              <span>상품비우기</span>
            </button>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                isSelected={selectedIds.includes(item.id)}
                onSelect={handleSelect}
              />
            ))}
          </>
        ) : (
          <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
        )}
        <CartSummary />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p>선택하신 상품을 삭제하시겠습니까?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="min-w-28 px-4 py-1 border text-black rounded"
              >
                아니오
              </button>
              <button
                onClick={handleDelete}
                className="min-w-28 px-4 py-1 bg-cheese-bg text-white rounded"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
