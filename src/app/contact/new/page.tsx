import { TopBar } from "@/features/common/components/topbar";
import NewContact from "@/features/contact/ui/NewContact";

function NewContactRoutePage() {
  return (
    <div className="bg-gray-100 -mx-4 p-4 flex-1 flex">
      <TopBar message="문의하기" showCart={false} showShare={false} />
      <NewContact />
    </div>
  );
}

export default NewContactRoutePage;
