"use client";

import { useGNBStore } from "@/features/common/store/useGnbStore";
import { useEffect } from "react";
import SideBar from "./UI/SideBar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  return (
    <div className="fixed flex left-0 top-0 bottom-0 right-0 z-50 max-w-screen-xl w-full m-auto ">
      <SideBar />
      <div className="flex-1 bg-gray-100 p-4 overflow-y-scroll">{children}</div>
    </div>
  );
}

export default AdminLayout;
