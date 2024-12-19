"use client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-5 hover:text-gray-8"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
