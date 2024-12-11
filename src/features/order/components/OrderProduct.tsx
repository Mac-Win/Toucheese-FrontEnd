import Image from "next/image";
import { CartPaymentItem } from "@/types/Checkout.type";

interface ProductListProps {
  cartPaymentList: CartPaymentItem[];
}

export const OrderProduct: React.FC<ProductListProps> = ({
  cartPaymentList,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-md font-bold">상품 확인</h2>
      {cartPaymentList.map((item) => (
        <div key={item.cartId} className="border p-4 mb-4 rounded">
          <div className="flex items-center mb-4">
            <Image
              src={item.productImage}
              alt={item.productName}
              width={100}
              height={100}
              className="object-cover rounded"
            />
            <div className="ml-4">
              <p className="font-bold">{item.productName}</p>
              <p className="text-sm text-gray-500">{item.studioName}</p>
            </div>
          </div>
          <p>가격: {item.productPrice.toLocaleString()}원</p>
          <p>인원: {item.personnel}명</p>
          <p>
            예약일: {item.reservationDate} {item.reservationTime}
          </p>
          <p className="mt-2 font-bold">
            총 가격: {item.totalPrice.toLocaleString()}원
          </p>
          {item.selectAddOptions.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-bold">추가 옵션:</p>
              <ul>
                {item.selectAddOptions.map((option) => (
                  <li key={option.selectOptionId}>
                    {option.selectOptionName} (+
                    {option.selectOptionPrice.toLocaleString()}원)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
