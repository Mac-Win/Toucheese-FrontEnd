import ReservationPage from "@/features/reservation/ui/ReservationPage";
import { TopBar } from "@/features/common/components/topbar";

function ReservationRouterPage() {
  return (
    <>
      <TopBar showShare={false} />
      <ReservationPage />
    </>
  );
}
export default ReservationRouterPage;
