import { useEffect, useMemo } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { CalendarDataItem } from "@/types/CalendarData.type";
import { format } from "date-fns";

const useCalendarData = (studioId: number, currentDate: Date) => {
  const { data, loading, error, request } = useRequest<CalendarDataItem[]>();

  const formattedMonth = useMemo(
    () => format(currentDate, "yyyy-MM"),
    [currentDate]
  );

  useEffect(() => {
    if (!studioId) return;

    request(
      "GET",
      `/v1/studios/${studioId}/calendars`,
      undefined,
      new URLSearchParams({ yearMonth: formattedMonth })
    );
  }, [studioId, formattedMonth, request]);

  return { calendarData: data || [], loading, error };
};

export default useCalendarData;
