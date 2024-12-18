interface ConfirmButtonProps {
  onConfirm: () => void;
}

const ConfirmButton = ({ onConfirm }: ConfirmButtonProps) => {
  return (
    <div className="w-1/2 ">
      <button
        className="w-full bg-yellow-500 text-white py-4 rounded-lg font-bold"
        onClick={onConfirm}
      >
        예약 확인
      </button>
    </div>
  );
};

export default ConfirmButton;
