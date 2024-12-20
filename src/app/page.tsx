"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/features/common/components/header";
import { defaultConcept } from "@/types/Concept.type";
import { useConcept } from "@/features/studios/hooks/useConcept";
import SearchBar from "@/features/searchBar/searchBar";
import Image from "next/image";
import Link from "next/link";
import { useConceptStore } from "@/features/common/store/useConceptStore";

function Home() {
  const router = useRouter();
  const { data: conceptList, loading, error } = useConcept();
  const { setConceptId } = useConceptStore();

  function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  }

  useEffect(() => {
    const token = getCookie("refreshToken");

    if (!token) {
      router.push("/members/login/");
    }
  }, [router]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <div className="-mt-16">
      <Header />
      <SearchBar />
      <div className="grid grid-cols-2 gap-4 w-full pb-4">
        {conceptList.map((concept: defaultConcept, index: number) => (
          <Link
            href={`/studios?conceptId=${concept.id}`}
            key={concept.id}
            className="relative rounded-lg overflow-hidden shadow-md group aspect-[3/4]"
            aria-label={concept.name}
            onClick={() => setConceptId(concept.id)}
          >
            <Image
              src={`/concept${index + 1}.png`}
              alt={concept.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black py-2 sm:py-6 text-center">
              <h1 className="text-white sm:text-lg font-semibold">
                {concept.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
