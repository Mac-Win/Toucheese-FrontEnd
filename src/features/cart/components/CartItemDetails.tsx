interface ItemDetailsProps {
  productName: string;
  personnel: number;
  reservationDate: string;
  reservationTime: string;
  productImage: string;
  totalPrice: number;
}

const CartItemDetails: React.FC<ItemDetailsProps> = ({
  productName,
  personnel,
  reservationDate,
  reservationTime,
  totalPrice,
}) => (
  <div className="flex flex-col flex-1">
    <p className="text-lg font-bold">{productName}</p>
    <p className="text-gray-500">예약 인원: {personnel}명</p>
    <p className="text-gray-500">예약 날짜: {reservationDate}</p>
    <p className="text-gray-500">예약 시간: {reservationTime}</p>
    <p className="text-lg font-bold mt-auto ml-auto">
      총 {totalPrice.toLocaleString()}원
    </p>
  </div>
);

export default CartItemDetails;
