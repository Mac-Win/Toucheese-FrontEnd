import { usePaginatedRequest } from "@/features/common/hooks/usePaginationRequest";
import { ReservatedList } from "@/types/Reservated.type";

function useReservatedList(initialPage: number = 0) {
  const { data, loading, error, refetch } = usePaginatedRequest<ReservatedList>(
    "/v1/members/reservations",
    initialPage
  );

  return { data, loading, error, refetch };
}

export default useReservatedList;
