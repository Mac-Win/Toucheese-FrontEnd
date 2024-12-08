import { useState, useEffect } from "react";
import { apiRequest } from "@/api/apiRequest"; // API 요청을 위한 함수
import { ReservationCalendarModalProps } from "@/types/ReservationCalendat.type";
import { format } from "date-fns"; // date-fns 사용

const useCalendarData = (studioId: number, currentDate: Date) => {
  const [calendarData, setCalendarData] = useState<
    ReservationCalendarModalProps["availableStartTimes"]
  >([]);
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
        const data = await apiRequest<
          ReservationCalendarModalProps["availableStartTimes"]
        >(
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
