"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hook/useCart";
import { CartItem as CartItemType, SelectAddOption } from "@/types/Cart.type";
import CartSummary from "../components/CartSummary";
import CartItem from "@/features/cart/components/CartItem";

function CartPage() {
  const { cartData, loading, error, refetch } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [localCartData, setLocalCartData] = useState<CartItemType[]>([]);
  const router = useRouter();

  const stableRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (cartData && cartData !== localCartData) {
      setLocalCartData(cartData);
    }
  }, [cartData, localCartData]);

  const totalAmount = selectedItems.length
    ? localCartData
        .filter((item) => selectedItems.includes(item.cartId))
        .reduce((sum, item) => sum + item.totalPrice, 0)
    : localCartData.reduce((sum, item) => sum + item.totalPrice, 0);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!localCartData || localCartData.length === 0)
    return <div>장바구니가 비어 있습니다.</div>;

  const handleSelect = (cartId: number, isSelected: boolean) => {
    setSelectedItems((prevSelected) => {
      if (isSelected && !prevSelected.includes(cartId)) {
        return [...prevSelected, cartId];
      }
      if (!isSelected && prevSelected.includes(cartId)) {
        return prevSelected.filter((id) => id !== cartId);
      }
      return prevSelected;
    });
  };

  const handleSave = (updatedItem: {
    cartId: number;
    totalPrice: number;
    personnel: number;
    selectAddOptions: SelectAddOption[];
  }) => {
    setLocalCartData((prev) =>
      prev.map((item) =>
        item.cartId === updatedItem.cartId ? { ...item, ...updatedItem } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setLocalCartData((prev) => prev.filter((item) => item.cartId !== id));
    stableRefetch(); // 안정적인 서버 동기화
  };

  const handleOrder = () => {
    const itemsToOrder = selectedItems.length
      ? localCartData.filter((item) => selectedItems.includes(item.cartId))
      : localCartData;

    const cartIds = itemsToOrder.map((item) => item.cartId).join(",");

    router.push(`/order?cartIds=${cartIds}`);
  };

  return (
    <div className="h-screen">
      <ul>
        {localCartData.map((item) => (
          <li
            key={item.cartId}
            className={`${
              selectedItems.includes(item.cartId)
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <CartItem
              item={item}
              isSelected={selectedItems.includes(item.cartId)}
              onSelect={handleSelect}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4 fixed max-w-custom w-full p-4 left-1/2 bottom-0 -translate-x-1/2">
        <CartSummary totalAmount={totalAmount} handleOrder={handleOrder} />
      </div>
    </div>
  );
}

export default CartPage;
