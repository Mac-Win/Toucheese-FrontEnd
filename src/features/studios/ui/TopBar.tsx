"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function TopBar() {
  const router = useRouter();

  return (
    <div className="relative z-50">
      <button onClick={() => router.back()} className="absolute left-2 top-2">
        <Image src="/icons/back.svg" alt="back" width={36} height={36} />
      </button>
    </div>
  );
}
