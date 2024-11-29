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
      className="flex flex-col items-center  text-center font-medium transition-colors duration-200 rounded-2xl"
    >
      <Image
        src={item.icon}
        alt={`${item.title} icon`}
        width={40}
        height={40}
      />
      <p className="text-black">{item.title}</p>
    </Link>
  );
};

export default NavLink;
