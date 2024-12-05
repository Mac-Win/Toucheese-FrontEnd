"use client";

interface OrderButtonProps {
  totalPrice: number;
  onClick: () => void;
}

const OrderButton = ({ onClick }: OrderButtonProps) => (
  <div className="mt-8">
    <button
      className="w-full bg-yellow-500 text-white py-2 rounded font-bold"
      onClick={onClick}
    >
      주문하기
    </button>
  </div>
);

export default OrderButton;
