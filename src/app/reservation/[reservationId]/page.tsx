import ReservationEditWrapper from "@/features/reservation/ui/ReservationWrapper";

async function ReservationEditRoutePage({
  params,
}: {
  params: Promise<{ reservationId: string }>;
}) {
  const reservationIdNumber = parseInt((await params).reservationId, 10);

  if (isNaN(reservationIdNumber)) {
    return <div>유효하지 않은 상품 ID입니다.</div>;
  }

  return <ReservationEditWrapper reservationId={reservationIdNumber} />;
}
export default ReservationEditRoutePage;
