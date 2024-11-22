"use client";

import { concepts } from "@/api/data/conceptData";
import Header from "@/features/header/header";
import SearchBar from "@/features/searchBar/searchBar";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <Header />

      <SearchBar />

      {/* 콘텐츠 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 w-full min-h-[50vh]">
        {concepts.map((concept) => (
          <Link
            href={`/studios?conceptId=${concept.id}`}
            key={concept.id}
            className="relative rounded-lg overflow-hidden shadow-md group"
            aria-label={concept.title}
          >
            {/* Image */}
            <Image
              src={`/${concept.imageName}`}
              alt={concept.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-2 text-center">
              <h1 className="text-white text-sm sm:text-base font-medium">
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
