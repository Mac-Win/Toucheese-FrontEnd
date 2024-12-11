"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  showCart?: boolean;
}

function Header({ showCart = true }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="relative flex items-center justify-center my-6 w-full">
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
      {/* showCart가 true일 때만 장바구니 아이콘 표시 */}
      {showCart && (
        <Link className="absolute right-2" href="/cart">
          <Image src="/icons/cart.svg" alt="cart" width={36} height={36} />
        </Link>
      )}
    </header>
  );
}

export default Header;
