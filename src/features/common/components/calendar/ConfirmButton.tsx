interface ConfirmButtonProps {
  onConfirm: () => void;
}

const ConfirmButton = ({ onConfirm }: ConfirmButtonProps) => {
  return (
    <div className="mt-8">
      <button
        className="w-full bg-yellow-500 text-white py-1 rounded font-bold"
        onClick={onConfirm}
      >
        예약 확인
      </button>
    </div>
  );
};

export default ConfirmButton;
