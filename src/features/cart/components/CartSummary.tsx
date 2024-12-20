interface CartSummaryProps {
  totalAmount: number;
  handleOrder: () => void;
  isButtonDisabled: boolean;
}

const CartSummary = ({
  totalAmount,
  handleOrder,
  isButtonDisabled,
}: CartSummaryProps) => {
  return (
    <button
      className={`font-bold rounded w-full py-2 ${
        isButtonDisabled
          ? "bg-gray-3 text-gray-5 cursor-not-allowed"
          : "bg-primary-5 text-black"
      }`}
      onClick={handleOrder}
      disabled={isButtonDisabled} // 버튼 비활성화 처리
    >
      상품 주문하기 ({totalAmount.toLocaleString()}원)
    </button>
  );
};

export default CartSummary;
