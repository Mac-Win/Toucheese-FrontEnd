import { useState } from "react";
import Image from "next/image";
import OptionModal from "./OptionModal";
import ConfirmModal from "./ConfirmModal";
import { useItemHandler } from "@/features/common/hooks/useItemHandler";
import {
  CartItem as CartItemType,
  SelectAddOption,
  AddOption,
} from "@/types/Cart.type";

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onSelect: (id: number, isSelected: boolean) => void;
  onSave: (updatedItem: {
    cartId: number;
    totalPrice: number;
    personnel: number;
    selectAddOptions: SelectAddOption[]; // 선택 옵션을 업데이트
  }) => void;
  onDelete: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onSave, onDelete }) => {
  const {
    cartId,
    studioName,
    studioImage,
    productName,
    personnel,
    productImage,
    reservationDate,
    reservationTime,
    totalPrice,
    selectAddOptions,
  } = item;

  const [updatePanel, setUpdatePanel] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    type: "delete" | "save" | null;
    data?: {
      totalPrice: number;
      personnel: number;
      addOptions: AddOption[];
      selectOptions: SelectAddOption[];
    };
  }>({ type: null });

  const { handleRequest } = useItemHandler();

  const handleDelete = async () => {
    try {
      await handleRequest("DELETE", `/v1/members/carts/${cartId}`);
      onDelete(cartId);
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };
  const handleSaveChanges = async (data: {
    totalPrice: number;
    personnel: number;
    selectAddOptions: SelectAddOption[];
  }) => {
    try {
      if (!data) {
        throw new Error("유효하지 않은 데이터입니다.");
      }

      const apiData = {
        totalPrice: data.totalPrice,
        personnel: data.personnel,
        addOptions: data.selectAddOptions.map(
          (option) => option.selectOptionId
        ),
      };

      await handleRequest("PUT", `/v1/members/carts/${cartId}`, apiData);

      onSave({
        cartId,
        totalPrice: data.totalPrice,
        personnel: data.personnel,
        selectAddOptions: data.selectAddOptions,
      });

      setUpdatePanel(false);
    } catch (err) {
      console.error("옵션 업데이트 실패:", err);
    }
  };

  return (
    <div className="bg-custom-bg mb-4 rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between bg-cheese-bg bg-opacity-40 px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src={studioImage}
              alt={studioName}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-bold">{studioName}</h3>
        </div>
      </div>
      <div className="flex p-4">
        <div className="relative max-w-48 w-full h-full aspect-3/4 overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={productImage}
            alt={productName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 px-4 flex flex-col">
          <p className="text-lg font-bold">{productName}</p>
          <p className="text-gray-500">예약 인원: {personnel}명</p>
          <p className="text-gray-500">예약 날짜: {reservationDate}</p>
          <p className="text-gray-500">예약 시간: {reservationTime}</p>
          <p className="text-lg font-bold mt-auto">
            총 {totalPrice.toLocaleString()}원
          </p>
          <div className="mt-4">
            <h4 className="text-md font-bold">선택된 옵션:</h4>
            {selectAddOptions.length > 0 ? (
              <ul>
                {selectAddOptions.map((option) => (
                  <li key={option.selectOptionId} className="text-gray-500">
                    {option.selectOptionName} -{" "}
                    {option.selectOptionPrice.toLocaleString()}원
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">선택된 옵션이 없습니다.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button onClick={() => setConfirmModal({ type: "delete" })}>
            <Image
              src="./icons/trash.svg"
              alt="삭제버튼"
              width={20}
              height={20}
            />
          </button>
          <button
            className="text-cheese-bg text-sm hover:underline mt-auto"
            onClick={() => setUpdatePanel(true)}
          >
            옵션 변경
          </button>
        </div>
      </div>
      {updatePanel && (
        <OptionModal
          onClose={() => setUpdatePanel(false)}
          onSave={(data) =>
            setConfirmModal({
              type: "save",
              data: {
                ...data,
                addOptions: item.addOptions,
                selectOptions: data.selectOptions,
              },
            })
          }
          initialValues={{
            addOptions: item.addOptions,
            totalPrice: item.totalPrice,
            personnel: item.personnel,
            selectOptions: item.selectAddOptions,
          }}
          cartItem={{
            studioName: item.studioName,
            productName: item.productName,
            reservationDate: item.reservationDate,
            reservationTime: item.reservationTime,
            totalPrice: item.totalPrice,
            personnel: item.personnel,
            studioImage: item.studioImage,
            productImage: item.productImage,
            productPrice: item.productPrice,
          }}
        />
      )}

      {confirmModal.type === "delete" && (
        <ConfirmModal
          title="삭제 확인"
          message="정말로 삭제하시겠습니까?"
          onConfirm={() => {
            handleDelete();
            setConfirmModal({ type: null });
          }}
          onCancel={() => setConfirmModal({ type: null })}
        />
      )}
      {confirmModal.type === "save" && confirmModal.data && (
        <ConfirmModal
          title="변경 확인"
          message="옵션 변경 사항을 저장하시겠습니까?"
          onConfirm={() => {
            if (confirmModal.data) {
              handleSaveChanges({
                totalPrice: confirmModal.data.totalPrice,
                personnel: confirmModal.data.personnel,
                selectAddOptions: confirmModal.data.selectOptions,
              });
            }
            setConfirmModal({ type: null });
          }}
          onCancel={() => setConfirmModal({ type: null })}
        />
      )}
    </div>
  );
};

export default CartItem;
