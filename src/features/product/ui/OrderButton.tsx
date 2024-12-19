"use client";

interface OrderButtonProps {
  calculateTotalPrice: () => number;
  onClick: () => void;
}

const OrderButton = ({ calculateTotalPrice, onClick }: OrderButtonProps) => {
  const totalPrice = calculateTotalPrice();

  return (
    <div className="mt-8">
      <button
        className="w-full bg-cheese-bg text-white py-2 rounded font-bold text-lg"
        onClick={onClick}
      >
        <span className="mr-2">
          선택상품주문 ( {totalPrice.toLocaleString()} )원
        </span>
      </button>
    </div>
  );
};

export default OrderButton;
