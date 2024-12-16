"use client";

import { usePathname } from "next/navigation";
import { useGNBStore } from "../../store/useGnbStore";
import NavBar from "./Navbar";

const ClientGNBWrapper = () => {
  const showGNB = useGNBStore((state) => state.showGNB);
  const pathname = usePathname();

  // URL 기반 조건 추가 (필요한 경우)
  const isExcludedPath = pathname.startsWith("/gnb-disabled");
  if (isExcludedPath) return null;

  return showGNB ? <NavBar /> : null;
};

export default ClientGNBWrapper;
