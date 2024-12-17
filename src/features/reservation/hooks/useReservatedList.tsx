import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { ReservatedList } from "@/types/Reservated.type";

function useReservatedList() {
  const {
    data: content,
    loading,
    error,
    request,
  } = useRequest<ReservatedList>();
  useEffect(() => {
    request("GET", "/v1/members/reservations?page=0");
  }, [request]);
  return { data: content, loading, error };
}

export default useReservatedList;
