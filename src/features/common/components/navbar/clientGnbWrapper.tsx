"use client";

import { usePathname } from "next/navigation"; // Optional: URL 기반 제어
import NavBar from "./Navbar";
import { useGNBStore } from "../../store/useGnbStore";

const ClientGNBWrapper = () => {
  const showGNB = useGNBStore((state) => state.showGNB); // Zustand를 통해 GNB 상태 가져오기
  const pathname = usePathname(); // Optional: URL에 따라 GNB 표시 여부 제어

  // URL 기반 조건 추가 (필요한 경우)
  const isExcludedPath = pathname.startsWith("/gnb-disabled"); // 특정 경로에서 GNB 숨기기
  if (isExcludedPath) return null;

  return showGNB ? <NavBar /> : null; // Zustand 상태에 따라 GNB 렌더링
};

export default ClientGNBWrapper;
