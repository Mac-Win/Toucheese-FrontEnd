"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // App Router용 useRouter

export function TopBar() {
  const router = useRouter();

  return (
    <div className="fixed z-10 flex items-center justify-between max-w-[calc(var(--max-width)-2rem)] w-full p-2">
      <div>
        <button
          onClick={() => router.back()} // App Router의 router.back() 사용
          className="flex items-center -ml-2"
        >
          <Image src="/icons/back.svg" alt="back" width={36} height={36} />
        </button>
      </div>
      <div>
        <Image src="/icons/share.svg" alt="share" width={36} height={36} />
      </div>
    </div>
  );
}
