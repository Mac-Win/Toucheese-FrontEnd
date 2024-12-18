interface ReservationActionsProps {
  onCancel: () => void;
  onUpdate: () => void;
}

const ReservationActions = ({
  onCancel,
  onUpdate,
}: ReservationActionsProps) => {
  return (
    <div className="mt-auto flex gap-2">
      <button
        onClick={onCancel}
        className="px-4 py-4 w-1/2 bg-gray-700 text-white rounded-lg text-center text-lg font-bold"
      >
        예약 취소
      </button>
      <button
        onClick={onUpdate}
        className="px-4 py-4 w-1/2 bg-yellow-500 text-black rounded-lg text-lg font-bold"
      >
        예약 변경
      </button>
    </div>
  );
};

export default ReservationActions;
