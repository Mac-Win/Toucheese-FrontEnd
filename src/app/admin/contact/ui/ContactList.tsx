const ContactDummy = {
  customerNmae: "123123",
  customerPhone: "010-0000-0000z",
  description: "123123",
  createDate: "2024-12-18",
  status: "문의완료",
};

function AdminContactList() {
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
            <tr>
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
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminContactList;
