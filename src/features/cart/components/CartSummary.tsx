"use client";

import React from "react";
import { useCartStore } from "../store/useCartStore";

const CartSummary = () => {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="fixed w-full bg-yellow-500 p-4 text-center max-w-custom -mx-8 bottom-0 z-40">
      <button className="text-white font-bold py-2 px-4 rounded w-full">
        예약하기 (₩{total.toLocaleString()})
      </button>
    </div>
  );
};

export default CartSummary;
