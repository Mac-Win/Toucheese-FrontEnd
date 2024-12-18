import { useEffect, useMemo } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { CalendarDataItem } from "@/types/CalendarData.type";
import { format } from "date-fns";

const useCalendarData = (studioId: number, currentDate: Date) => {
  const { data, loading, error, request } = useRequest<CalendarDataItem[]>();

  // `currentDate`를 문자열로 변환해 메모이제이션
  const formattedMonth = useMemo(
    () => format(currentDate, "yyyy-MM"),
    [currentDate]
  );

  useEffect(() => {
    if (!studioId) return; // studioId가 유효하지 않으면 요청을 건너뜀

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("토큰이 없습니다. 로그인이 필요합니다.");
      return;
    }

    request(
      "GET",
      `/v1/studios/${studioId}/calendars`,
      undefined,
      new URLSearchParams({ yearMonth: formattedMonth }),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }, [studioId, formattedMonth, request]); // request 대신 다른 의존성 관리 방식 고려

  return { calendarData: data || [], loading, error };
};

export default useCalendarData;
