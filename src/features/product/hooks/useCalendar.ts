import { useState, useEffect } from "react";
import { apiRequest } from "@/api/apiRequest";
import { CalendarDataItem } from "@/types/ReservationCalendat.type"; // 분리된 타입 사용
import { format } from "date-fns";

const useCalendarData = (studioId: number, currentDate: Date) => {
  const [calendarData, setCalendarData] = useState<CalendarDataItem[]>([]); // 명확한 타입 사용
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("토큰이 없습니다. 로그인이 필요합니다.");
          return;
        }

        const formattedMonth = format(currentDate, "yyyy-MM");
        const data = await apiRequest<CalendarDataItem[]>(
          "GET",
          `/v1/studios/${studioId}/calendars`,
          undefined,
          new URLSearchParams({ yearMonth: formattedMonth }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCalendarData(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("캘린더 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [studioId, currentDate]);

  return { calendarData, loading, error };
};

export default useCalendarData;
