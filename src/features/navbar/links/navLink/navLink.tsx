"use client";

import Image from "next/image";
import Link from "next/link";

interface NavLinkProps {
  item: {
    title: string;
    path: string;
    icon: string;
  };
}

const NavLink = ({ item }: NavLinkProps) => {
  return (
    <Link
      href={item.path}
      className="flex flex-col items-center text-center font-medium transition-transform duration-200 hover:scale-110 focus:scale-110"
    >
      {/* Icon */}
      <Image
        src={item.icon}
        alt={`${item.title} icon`}
        width={36}
        height={36}
        className="mb-2 sm:w-10 sm:h-10 object-contain"
      />
      {/* Title */}
      <p className="text-black text-xs sm:text-sm md:text-base">{item.title}</p>
    </Link>
  );
};

export default NavLink;
