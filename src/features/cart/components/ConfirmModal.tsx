interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded shadow-lg max-w-custom w-full">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2">{message}</p>
        <div className="mt-4 flex justify-center gap-2">
          <button
            className="w-1/2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="w-1/2 bg-cheese-bg text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
