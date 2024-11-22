"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // usePathname 훅 사용

function Header() {
  const pathname = usePathname(); // 현재 경로 가져오기

  return (
    <header className="relative flex items-center justify-center my-6">
      {/* back icon은 "/"가 아닌 경우에만 표시 */}
      {pathname !== "/" && (
        <Link className="absolute -left-2" href="/">
          <Image src="/icons/back.svg" alt="back" width={36} height={36} />
        </Link>
      )}
      <Link href="/">
        <Image
          src="/TOUCHEESE_Y.png"
          alt="TOUCHEESE_Y"
          width={150}
          height={100}
          style={{ width: "auto", height: "auto" }}
        />
      </Link>
    </header>
  );
}

export default Header;
