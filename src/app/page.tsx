"use client";

import Header from "@/features/header/header";
import { concepts } from "@/api/data/conceptData";
import SearchBar from "@/features/searchBar/searchBar";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      <Header />
      <SearchBar />
      <div className="grid grid-cols-2 gap-4 w-full">
        {concepts.map((concept) => (
          <Link
            href={`/studios?conceptId=${concept.id}`}
            key={concept.id}
            className="relative rounded-lg overflow-hidden shadow-md group aspect-[3/4]"
            aria-label={concept.title}
          >
            <Image
              src={`/${concept.imageName}`}
              alt={concept.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
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
