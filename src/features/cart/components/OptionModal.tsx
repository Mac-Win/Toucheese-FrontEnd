"use client";

import { useState, useEffect } from "react";
import { AddOption, SelectAddOption } from "@/types/Cart.type";
import Image from "next/image";
import AlertModal from "@/features/common/components/AlertModal";

interface OptionModalProps {
  onClose: () => void;
  onSave: (data: {
    totalPrice: number;
    personnel: number;
    addOptions: AddOption[];
    selectOptions: SelectAddOption[];
  }) => void;
  initialValues: {
    totalPrice: number;
    personnel: number;
    addOptions: AddOption[];
    selectOptions: SelectAddOption[];
  };
  cartItem: {
    studioName: string;
    studioImage: string;
    productName: string;
    productImage: string;
    reservationDate: string;
    reservationTime: string;
    totalPrice: number;
    personnel: number;
    productPrice: number;
  };
}

const OptionModal: React.FC<OptionModalProps> = ({
  onClose,
  onSave,
  initialValues,
  cartItem,
}) => {
  const [totalPrice, setTotalPrice] = useState(initialValues.totalPrice);
  const [personnel, setPersonnel] = useState(initialValues.personnel);
  const [selectedOptions, setSelectedOptions] = useState<AddOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const initialSelectedOptions =
      initialValues.addOptions &&
      initialValues.addOptions.filter((option) =>
        initialValues.selectOptions.some(
          (selected) => selected.selectOptionId === option.id
        )
      );
    setSelectedOptions(initialSelectedOptions);
  }, [initialValues]);

  const handlePersonnelChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setPersonnel((prev) => prev + 1);
      setTotalPrice((prevPrice) => prevPrice + cartItem.productPrice); // 1인당 가격 추가
    } else {
      if (personnel > 1) {
        setPersonnel((prev) => prev - 1);
        setTotalPrice((prevPrice) => prevPrice - cartItem.productPrice); // 1인당 가격 감소
      } else {
        setModalMessage("최소 예약 인원은 1명입니다.");
        setIsModalOpen(true);
      }
    }
  };

  const handleOptionChange = (option: AddOption, isChecked: boolean) => {
    setSelectedOptions((prev) => {
      if (isChecked) {
        return [...prev, option];
      } else {
        return prev.filter((item) => item.id !== option.id);
      }
    });

    setTotalPrice((prevPrice) =>
      isChecked ? prevPrice + option.price : prevPrice - option.price
    );
  };

  const handleSubmit = () => {
    const updatedData = {
      totalPrice,
      personnel,
      addOptions: initialValues.addOptions,
      selectOptions: selectedOptions.map((option) => ({
        selectOptionId: option.id,
        selectOptionName: option.name,
        selectOptionPrice: option.price,
      })),
    };
    onSave(updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-custom rounded-t-lg">
        <div className="flex items-center gap-4 bg-cheese-bg bg-opacity-40 px-4 py-2">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src={cartItem.studioImage}
              alt={cartItem.studioName}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-bold">{cartItem.studioName}</h3>
        </div>

        {/* Product Info */}
        <div className="flex bg-custom-bg p-4">
          <div className="inline-flex items-center overflow-hidden">
            <Image
              src={cartItem.productImage}
              alt={cartItem.productName}
              width={120}
              height={180}
              className="object-cover"
            />
          </div>
          <div className="flex-1 px-4 flex flex-col">
            <p className="text-lg font-bold">{cartItem.productName}</p>
            <p className="text-gray-500">
              예약 날짜: {cartItem.reservationDate}
            </p>
            <p className="text-gray-500">
              예약 시간: {cartItem.reservationTime}
            </p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between text-lg font-bold border-b py-4">
            <span>총 가격:</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center mb-4 border-b py-4">
            <span className="text-gray-700 text-lg font-bold">인원</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePersonnelChange("decrease")}
                className="p-2 rounde"
              >
                <Image
                  src="/icons/minus.svg"
                  alt="minus"
                  width={24}
                  height={24}
                />
              </button>
              <span>{personnel}</span>
              <button
                onClick={() => handlePersonnelChange("increase")}
                className="p-2 rounde"
              >
                <Image
                  src="/icons/plus.svg"
                  alt="plus"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          <div className="block mb-6">
            <span className="text-gray-700">추가 옵션:</span>
            <ul className="mt-2">
              {initialValues.addOptions.map((option) => (
                <li
                  key={option.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedOptions.some(
                        (selected) => selected.id === option.id
                      )}
                      onChange={(e) =>
                        handleOptionChange(option, e.target.checked)
                      }
                    />
                    <span>{option.name}</span>
                  </label>
                  <span>{option.price.toLocaleString()}원</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <button
            className="flex-1 bg-cheese-bg text-white py-2 rounded font-bold hover:bg-yellow-500"
            onClick={handleSubmit}
          >
            저장
          </button>
          <button
            className="flex-1 bg-custom-bg text-gray-700 py-2 rounded font-bold hover:bg-gray-200"
            onClick={onClose}
          >
            취소
          </button>
        </div>
        <AlertModal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default OptionModal;
