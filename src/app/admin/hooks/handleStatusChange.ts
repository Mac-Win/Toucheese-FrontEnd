import { apiRequest } from "@/api/apiRequest";

// 예약 상태 변경 함수
export const handleStatusChange = async (
  reservationId: number,
  status: string
) => {
  try {
    const payload = { status }; // 요청 페이로드
    await apiRequest(
      "PUT",
      `/v1/admin/reservations/${reservationId}/status`,
      payload
    );

    alert("예약 상태가 성공적으로 변경되었습니다.");
    // 필요 시 추가적인 동작 (예: 리패치)
  } catch (error) {
    console.error("예약 상태 변경 중 오류 발생:", error);
    alert("예약 상태 변경에 실패했습니다. 다시 시도해주세요.");
  }
};
