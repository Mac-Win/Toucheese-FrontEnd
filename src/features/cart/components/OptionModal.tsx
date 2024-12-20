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
    productStandard: number;
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
    const maxPersonnel = cartItem.productStandard;
    const minPersonnel = cartItem.productStandard;

    if (type === "increase") {
      if (personnel < maxPersonnel) {
        setPersonnel((prev) => prev + 1);
        setTotalPrice((prevPrice) => prevPrice + cartItem.productPrice);
      } else {
        setModalMessage(`상품의 최대 예약 인원이 ${maxPersonnel}명입니다.`);
        setIsModalOpen(true);
      }
    } else {
      if (personnel > minPersonnel) {
        setPersonnel((prev) => prev - 1);
        setTotalPrice((prevPrice) => prevPrice - cartItem.productPrice);
      } else {
        setModalMessage(`싱픔의 최소 예약 인원이 ${minPersonnel}명입니다.`);
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
        {/* <div className="flex items-center gap-4 bg-cheese-bg bg-opacity-40 px-4 py-2">
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
        </div> */}

        <div className="flex bg-custom-bg p-4">
          <div className="relative max-w-36 w-full h-full aspect-3/4 overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={cartItem.productImage}
              alt={cartItem.productName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 px-4 flex flex-col gap-1">
            <p className="text-lg font-bold mb-4">
              상품명
              <span className="ml-2">{cartItem.productName}</span>
            </p>
            <p className="text-gray-500">
              예약 날짜: {cartItem.reservationDate}
            </p>
            <p className="text-gray-500">
              예약 시간: {cartItem.reservationTime}
            </p>
            <p className="text-gray-500 ">예약 인원: {cartItem.personnel}명</p>
            <p className="mt-auto text-lg font-bold">
              전체 가격: {totalPrice.toLocaleString()}원
            </p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between text-lg font-bold border-b py-4">
            가격
            <p>
              <span className="text-sm font-medium text-gray-400 mr-2">
                {cartItem.productStandard}인 기준
              </span>
              <span>{cartItem.productPrice}원</span>
            </p>
          </div>
          <div className="flex justify-between items-center mb-4 border-b py-4">
            <span className="text-gray-700 text-lg font-bold">인원</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePersonnelChange("decrease")}
                className="p-2 rounde"
              >
                <Image
                  src="/icons/remove.svg"
                  alt="인원감소"
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
                  src="/icons/add.svg"
                  alt="인원추가"
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
                      className="custom-checkbox"
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
            className="flex-1 bg-primary-5 py-2 rounded font-bold hover:bg-primary-6"
            onClick={handleSubmit}
          >
            저장
          </button>
          <button
            className="flex-1 bg-gray-2 text-gray-7 py-2 rounded font-bold hover:bg-gray-3"
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
