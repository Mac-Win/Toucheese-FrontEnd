import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { CalendarDataItem } from "@/types/CalendarData.type";
import { format } from "date-fns";

const useCalendarData = (studioId: number, currentDate: Date) => {
  const { data, loading, error, request } = useRequest<CalendarDataItem[]>();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("토큰이 없습니다. 로그인이 필요합니다.");
      return;
    }

    const formattedMonth = format(currentDate, "yyyy-MM");
    request(
      "GET",
      `/v1/studios/${studioId}/calendars`,
      undefined,
      new URLSearchParams({ yearMonth: formattedMonth }),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }, [studioId, currentDate, request]);

  return { calendarData: data || [], loading, error };
};

export default useCalendarData;
