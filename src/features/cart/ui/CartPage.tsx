"use client";

import { useEffect } from "react";
// import { useCartStore } from "../store/useCartStore";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import { TopBar } from "@/features/common/components/topbar";

const CartPage = () => {
  // const items = useCartStore((state) => state.items);
  const items = [
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

  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  return (
    <>
      <TopBar showShare={false} message="장바구니"></TopBar>
      <div className="p-4 mt-10">
        {items.length > 0 ? (
          items.map((item) => <CartItem key={item.id} {...item} />)
        ) : (
          <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
        )}
        <CartSummary />
      </div>
    </>
  );
};

export default CartPage;
