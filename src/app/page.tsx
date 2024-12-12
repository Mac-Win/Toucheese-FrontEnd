"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/features/common/components/header";
import { defaultConcept } from "@/types/Concept.type";
import { useConcept } from "@/features/studios/hooks/useConcept";
import SearchBar from "@/features/searchBar/searchBar";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  const { data: conceptList, loading, error } = useConcept();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/members/login/");
    }
  }, [router]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      <Header showCart={false} />
      <SearchBar />
      <div className="grid grid-cols-2 gap-4 w-full ">
        {conceptList.map((concept: defaultConcept, index: number) => (
          <Link
            href={`/studios?conceptId=${concept.id}`}
            key={concept.id}
            className="relative rounded-lg overflow-hidden shadow-md group aspect-[3/4]"
            aria-label={concept.name}
          >
            <Image
              src={`/concept${index + 1}.png`}
              alt={concept.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-2 text-center">
              <h1 className="text-white text-sm sm:text-base font-medium">
                {concept.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
