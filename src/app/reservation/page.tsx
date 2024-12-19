import { TopBar } from "@/features/common/components/topbar";
import ReservationPage from "@/features/reservation/ui/ReservationPage";

function ReservationRouterPage() {
  return (
    <>
      <TopBar
        message="예약일정"
        showCart={false}
        showShare={false}
        showBack={false}
      />
      <ReservationPage />
    </>
  );
}
export default ReservationRouterPage;
