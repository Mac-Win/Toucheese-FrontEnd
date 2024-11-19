"use client";

import { concepts } from "@/data/conceptData";
import Header from "@/features/header/header";
import SearchBar from "@/features/searchBar/searchBar";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* 헤더 */}
      <Header />

      {/* {검색바} */}
      <SearchBar />

      {/* 콘텐츠 */}
      <div className="grid grid-cols-2 gap-4 w-full flex-grow aspect-3/4">
        {concepts.map((concept) => (
          <Link
            href="/studios"
            key={concept.id}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={`/${concept.imageName}`}
              alt={concept.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-4 text-center backdrop-blur-sm">
              <h1 className="text-white text-lg font-normal">
                {concept.title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
