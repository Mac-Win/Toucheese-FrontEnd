"use client";

import { useState } from "react";
import AlertModal from "@/features/common/components/AlertModal";
import useProductOrderStore from "../store/useProductOrderStore";
import Image from "next/image";

const ProductQuantity = ({ product }: { product: { standard: number } }) => {
  const { quantity, setQuantity } = useProductOrderStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleIncrease = () => {
    if (quantity < product.standard) {
      setQuantity(quantity + 1);
    } else {
      setModalMessage(`촬영인원은 최대 ${product.standard}명 입니다.`);
      setIsModalOpen(true);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setModalMessage(`촬영인원은 최소 ${quantity}명 입니다.`);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrease}
        className="p-2 rounded"
        disabled={quantity <= 0}
      >
        <Image src="/icons/minus.svg" alt="minus" width={24} height={24} />
      </button>
      <span>{quantity}</span>
      <button
        onClick={handleIncrease}
        className="p-2 rounded"
        disabled={quantity >= product.standard}
      >
        <Image src="/icons/plus.svg" alt="plus" width={24} height={24} />
      </button>

      {/* 커스텀 알림 모달 */}
      <AlertModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductQuantity;
