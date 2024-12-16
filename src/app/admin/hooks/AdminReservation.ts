import { useEffect, useState } from "react";
import { apiRequest } from "@/api/apiRequest";
import { ReservationResponse, Reservation } from "../types/Admin.types";

export function useAdminReservation(page: number = 1) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest<ReservationResponse>(
        "GET",
        `/v1/admin/reservations?status=예약접수&page=${page - 1}`
      );

      setReservations(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(page);
  }, [page]);

  return {
    reservations,
    totalPages,
    loading,
    error,
    refetch: fetchReservations,
  };
}
