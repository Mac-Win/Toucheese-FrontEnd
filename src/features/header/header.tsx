import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <Link href="/" className="my-6 m-auto">
      <Image
        src="/TOUCHEESE_Y.png"
        alt="Example Image"
        width={150}
        height={100} // 고정된 비율 사용
        style={{ width: "auto", height: "auto" }} // 비율 유지
      />
    </Link>
  );
}

export default Header;
