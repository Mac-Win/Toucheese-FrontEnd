"use client";

import CartPage from "@/features/cart/ui/CartPage";
import { TopBar } from "@/features/common/components/topbar";
import { useConceptStore } from "@/features/common/store/useConceptStore";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import { useEffect } from "react";

const CartPageRoute = () => {
  const { conceptId } = useConceptStore();
  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  return (
    <>
      <TopBar
        message="장바구니"
        showShare={false}
        location={conceptId ? `/studios?conceptId=${conceptId}` : "/"}
      />
      <div className="bg-gray-100 -mx-4 p-4 flex-1 -mb-28">
        <CartPage />
      </div>
    </>
  );
};

export default CartPageRoute;
