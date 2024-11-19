"use client";

import NavLink from "./navLink/navLink";

const Links = () => {
  const links = [
    { title: "홈", path: "/", icon: "/icons/home.svg" },
    { title: "예약일정", path: "/reservation", icon: "/icons/calendar.svg" },
    { title: "문의하기", path: "/contact", icon: "/icons/contact.svg" },
    { title: "내정보", path: "/Mypage", icon: "/icons/user.svg" },
  ];

  return (
    <nav className="flex justify-around gap-4">
      {links.map((link) => (
        <NavLink key={link.title} item={link} />
      ))}
    </nav>
  );
};

export default Links;
