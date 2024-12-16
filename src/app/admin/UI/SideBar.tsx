import Link from "next/link";

function SideBar() {
  return (
    <aside className="w-1/4 bg-gray-900 text-white p-4 flex flex-col">
      <nav>
        <ul>
          <li>
            <Link href="/admin" className="block py-2">
              <h1 className="font-bold text-2xl">TOUCHEESE ADMIN</h1>
            </Link>
          </li>
          <li>
            {/* <Link href="/admin/user" className="block py-2">
              유저
            </Link> */}
            <Link href="/admin/reservation" className="block py-2">
              예약일정확인
            </Link>
          </li>
        </ul>
      </nav>
      <Link
        href="/"
        className="mt-auto py-2 px-2 bg-gray-400 rounded-lg text-center hover:bg-gray-500"
      >
        관리자페이지 나가기
      </Link>
    </aside>
  );
}

export default SideBar;
