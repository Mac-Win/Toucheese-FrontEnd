interface TotalAmountButtonProps {
  totalAmount: number;
  onClick: () => void;
}

export const TotalAmountButton: React.FC<TotalAmountButtonProps> = ({
  totalAmount,
  onClick,
}) => {
  return (
    <button
      className="bg-cheese-bg text-white px-4 py-2 rounded w-full"
      onClick={onClick}
    >
      예약하기 ({totalAmount.toLocaleString()}원)
    </button>
  );
};
