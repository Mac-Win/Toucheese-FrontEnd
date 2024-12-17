import ReservationPage from "@/features/reservation/ui/ReservationPage";

function ReservationRouterPage() {
  return (
    <>
      <div className="flex items-center h-16 justify-center">
        <h1 className="font-bold text-2xl text-center">예약일정</h1>
      </div>

      <ReservationPage />
    </>
  );
}
export default ReservationRouterPage;
