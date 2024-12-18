"use client";

import { useGNBStore } from "@/features/common/store/useGnbStore";
import ReservationEdit from "@/features/reservation/ui/ReservationEdit";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { TopBar } from "@/features/common/components/topbar";

function ReservationEditPage() {
  const setShowGNB = useGNBStore((state) => state.setShowGNB);

  // useParams 호출
  const params = useParams();
  const reservationId = params?.reservationId;

  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  if (!reservationId) {
    return <div>예약 ID가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <TopBar showShare={false} />
      <ReservationEdit />
    </>
  );
}

export default ReservationEditPage;
