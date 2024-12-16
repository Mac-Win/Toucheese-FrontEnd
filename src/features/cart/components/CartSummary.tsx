interface CartSummaryProps {
  totalAmount: number;
  handleOrder: () => void;
}

const CartSummary = ({ totalAmount, handleOrder }: CartSummaryProps) => {
  return (
    <button
      className="bg-cheese-bg text-white rounded w-full py-2 "
      onClick={handleOrder}
    >
      상품 주문하기 ({totalAmount.toLocaleString()}원)
    </button>
  );
};

export default CartSummary;
