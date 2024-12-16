import { handleStatusChange } from "../../hooks/handleStatusChange";
import { Reservation } from "../../types/Admin.types";

type ReservationListProps = {
  reservations: Reservation[];
};
const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
  return (
    <div className="overflow-x-auto  bg-white shadow-md rounded-lg">
      <table className="min-w-full text-sm text-gray-800 border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-2 text-left">이름</th>
            <th className="px-2 py-2 text-left">전화번호</th>
            <th className="px-2 py-2 text-left">스튜디오 이름</th>
            <th className="px-2 py-2 text-left">예약 내용</th>
            <th className="px-2 py-2 text-left">예약 날짜</th>
            <th className="px-2 py-2 text-left">총 가격</th>
            <th className="px-2 py-2 text-left">상품 가격</th>
            <th className="px-2 py-2 text-left">선택 옵션</th>
            <th className="px-2 py-2 text-left">예약 상태</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-50`}
            >
              <td className="px-2 py-2">{reservation.customerName}</td>
              <td className="px-2 py-2">{reservation.customerPhone}</td>
              <td className="px-2 py-2">{reservation.studioName}</td>
              <td className="px-2 py-2">{reservation.productName}</td>
              <td className="px-2 py-2">{reservation.createDate}</td>
              <td className="px-2 py-2">{reservation.totalPrice}</td>
              <td className="px-2 py-2">{reservation.productPrice}</td>
              <td>
                {reservation.selectAddOptions.map((selectAddOption) => (
                  <p key={selectAddOption.selectOptionId} className="px-4 py-1">
                    {selectAddOption.selectOptionId}
                    {selectAddOption.selectOptionName} -{" "}
                    {selectAddOption.selectOptionPrice}원
                  </p>
                ))}
              </td>

              <td className="px-4 py-2 font-semibold">
                <select
                  name="status"
                  id={`status-${reservation.reservationId}`}
                  className="px-3 py-2 border rounded-md"
                  defaultValue={reservation.status} // 초기값 설정
                  onChange={(e) =>
                    handleStatusChange(
                      reservation.reservationId,
                      e.target.value
                    )
                  }
                >
                  <option value="예약접수">예약접수</option>
                  <option value="예약확정">예약확정</option>
                  <option value="예약취소">예약취소</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
