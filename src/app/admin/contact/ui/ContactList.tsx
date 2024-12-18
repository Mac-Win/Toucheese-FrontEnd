const ContactDummy = {
  customerNmae: "123123",
  customerPhone: "010-0000-0000z",
  description: "123123",
  createDate: "2024-12-18",
  status: "문의완료",
};

function ContactList() {
  return (
    <>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="hidden md:table min-w-full text-sm text-gray-800 border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-2 text-center">문의자 이름</th>
              <th className="px-2 py-2 text-center">전화번호</th>
              {/* <th className="px-2 py-2 text-center">문의스튜디오 이름?</th> */}
              <th className="px-2 py-2 text-center">문의 내용</th>
              <th className="px-2 py-2 text-center">문의 날짜</th>
              {/* <th className="px-2 py-2 text-center">문의 시간?</th> */}
              <th className="px-2 py-2 text-center">문의 상태</th>
            </tr>
          </thead>
          <tbody>
            {/* {reservations.map((reservation, index) => ( */}
            <tr
            //   className={`${
            //     index % 2 === 0 ? "bg-gray-100" : "bg-white"
            //   } hover:bg-gray-50`}
            >
              <td className="py-4 px-2 border-r text-center">
                {ContactDummy.customerNmae}
              </td>
              <td className="py-4 px-2 border-r text-center">
                {ContactDummy.customerPhone}
              </td>
              {/* <td className="py-4 px-2 border-r text-center">
                {ContactDummy.studioName}
              </td> */}
              <td className="py-4 px-2 border-r text-center">
                {ContactDummy.description}
              </td>
              <td className="py-4 px-2 border-r text-center">
                {ContactDummy.createDate}
              </td>
              {/* <td className="py-4 px-2 border-r text-center">
                {ContactDummy.createTime}
              </td> */}

              <td className="px-4 py-2 font-semibold text-center">
                {ContactDummy.status}
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>

        {/* <div className="md:hidden">
          {reservations.map((reservation, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg shadow ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <p className="font-semibold">이름: {reservation.customerName}</p>
              <p>전화번호: {reservation.customerPhone}</p>
              <p>스튜디오 이름: {reservation.studioName}</p>
              <p>예약 날짜: {reservation.createDate}</p>
              <p>예약 시간: {reservation.createTime}</p>
              <p>총 가격: {reservation.totalPrice}원</p>
              <details>
                <summary className="cursor-pointer font-semibold text-blue-600">
                  상세 내용 보기
                </summary>
                <p>상품 이름: {reservation.productName}</p>
                <p>상품 가격: {reservation.productPrice}원</p>
                <p>선택 옵션:</p>
                {reservation.selectAddOptions.map((selectAddOption) => (
                  <p key={selectAddOption.selectOptionId} className="ml-4">
                    - {selectAddOption.selectOptionName} (
                    {selectAddOption.selectOptionPrice}원)
                  </p>
                ))}
                <div className="mt-2">
                  <label htmlFor={`status-${reservation.reservationId}`}>
                    예약 상태:
                  </label>
                  <select
                    name="status"
                    id={`status-${reservation.reservationId}`}
                    className="px-3 py-2 border rounded-md"
                    defaultValue={reservation.status}
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
                </div>
              </details>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default ContactList;
