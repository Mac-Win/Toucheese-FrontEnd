"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hook/useCart";
import { CartItem as CartItemType, SelectAddOption } from "@/types/Cart.type";
import CartSummary from "../components/CartSummary";
import CartItem from "@/features/cart/components/CartItem";

function CartPage() {
  const { cartData, loading, error } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 선택된 항목 관리
  const [localCartData, setLocalCartData] = useState<CartItemType[]>([]); // 로컬 상태로 관리
  const router = useRouter(); // useRouter 훅 사용

  // cartData와 localCartData 동기화
  useEffect(() => {
    if (cartData) {
      setLocalCartData(cartData);
    }
  }, [cartData]);

  // 총 금액 계산
  const totalAmount = selectedItems.length
    ? localCartData
        .filter((item) => selectedItems.includes(item.cartId)) // 선택된 항목만 계산
        .reduce((sum, item) => sum + item.totalPrice, 0)
    : localCartData.reduce((sum, item) => sum + item.totalPrice, 0); // 전체 금액 계산

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!localCartData || localCartData.length === 0)
    return <div>장바구니가 비어 있습니다.</div>;

  // 항목 선택 처리
  const handleSelect = (cartId: number, isSelected: boolean) => {
    setSelectedItems(
      (prevSelected) =>
        isSelected
          ? [...prevSelected, cartId] // 선택된 항목 추가
          : prevSelected.filter((id) => id !== cartId) // 선택 해제
    );
  };

  // 옵션 저장
  const handleSave = (updatedItem: {
    cartId: number;
    totalPrice: number;
    personnel: number;
    selectAddOptions: SelectAddOption[];
  }) => {
    setLocalCartData((prev) =>
      prev.map((item) =>
        item.cartId === updatedItem.cartId
          ? { ...item, ...updatedItem } // 업데이트된 항목 교체
          : item
      )
    );
  };

  // 항목 삭제
  const handleDelete = (id: number) => {
    setLocalCartData((prev) => prev.filter((item) => item.cartId !== id));
  };

  // 상품 주문하기
  const handleOrder = () => {
    const itemsToOrder = selectedItems.length
      ? localCartData.filter((item) => selectedItems.includes(item.cartId)) // 선택된 항목만
      : localCartData; // 선택되지 않은 경우 전체 항목

    const cartIds = itemsToOrder.map((item) => item.cartId).join(",");

    router.push(`/order?cartIds=${cartIds}`);
  };

  return (
    <>
      <ul>
        {localCartData.map((item) => (
          <li key={item.cartId}>
            <CartItem
              item={item}
              isSelected={selectedItems.includes(item.cartId)} // 선택 여부 확인
              onSelect={handleSelect} // 선택 이벤트 핸들러 전달
              onSave={handleSave}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <CartSummary totalAmount={totalAmount} handleOrder={handleOrder} />
      </div>
    </>
  );
}

export default CartPage;
