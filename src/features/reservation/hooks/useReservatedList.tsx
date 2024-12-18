import { useEffect, useCallback } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { ReservatedList } from "@/types/Reservated.type";

function useReservatedList(initialPage: number = 0) {
  const { data, loading, error, request } = useRequest<ReservatedList>();

  const refetch = useCallback(
    (page: number) => {
      request("GET", `/v1/members/reservations?page=${page}`);
    },
    [request]
  );

  useEffect(() => {
    refetch(initialPage);
  }, [initialPage, refetch]);

  return { data, loading, error, refetch };
}

export default useReservatedList;
