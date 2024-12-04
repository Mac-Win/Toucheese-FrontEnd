"use client";

import { motion } from "framer-motion";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const AlertModal = ({ isOpen, message, onClose }: AlertModalProps) => {
  if (!isOpen) return null;

  const shakeAnimation = {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.25 },
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        {...shakeAnimation}
        className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center"
      >
        <p className="text-gray-800 text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-cheese-bg text-white py-2 px-4 rounded hover:bg-custom-bg hover:text-black"
        >
          확인
        </button>
      </motion.div>
    </div>
  );
};

export default AlertModal;
