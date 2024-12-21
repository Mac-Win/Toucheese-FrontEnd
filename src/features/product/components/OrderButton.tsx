"use client";

interface OrderButtonProps {
  calculateTotalPrice: () => number;
  onClick: () => void;
}

const OrderButton = ({ calculateTotalPrice, onClick }: OrderButtonProps) => {
  const totalPrice = calculateTotalPrice();

  return (
    <div className="mt-4">
      <button
        className="w-full bg-primary-5 text-gray-9 py-2 rounded-lg font-bold text-lg"
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
