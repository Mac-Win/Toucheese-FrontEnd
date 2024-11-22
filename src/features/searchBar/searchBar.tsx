import { useState } from "react";
import Image from "next/image";
import { useStudiosByKeyword } from "@/hooks/useCustomAxios";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색 입력값
  const { data: results, loading, error } = useStudiosByKeyword(searchQuery);

  // 검색어 변경 시 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value); // 입력값 업데이트
  };

  return (
    <div className="w-full relative min-h-16 mb-4">
      {/* 검색창 */}
      <div className="z-20 absolute top-0 w-full rounded-3xl bg-yellow-400 p-4">
        <div className="">
          <form className="flex items-center justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange} // 입력값 변경 처리
              placeholder="스튜디오 이름을 검색해주세요"
              className="text-size flex-grow border-none outline-none bg-transparent text-white placeholder-white "
            />
            <button type="button" className="ml-2">
              <Image
                src="/icons/search.svg"
                alt="Search"
                width={24}
                height={24}
              />
            </button>
          </form>
        </div>

        {/* 에러 */}
        {error && <div className="p-4 text-red-500">{error}</div>}

        {/* 검색 결과 */}
        {searchQuery.trim() && Array.isArray(results) && results.length > 0 ? (
          <ul className=" w-full rounded-b-lg max-h-screen overflow-y-scroll scrollbar-hide mt-4 transition-all ">
            {results.map((studio, index) => (
              <li
                key={studio.id || `studio-${index}`}
                className="flex items-center gap-2 cursor-pointer border-b py-4 last:border-0"
              >
                {studio.profileImage ? (
                  <Image
                    src={studio.profileImage}
                    alt={studio.name}
                    className="max-w-10 max-h-10 rounded-full overflow-hidden aspect-1/1"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="min-w-8 min-h-8 rounded-full overflow-hidden; bg-gray-300" />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{studio.name}</h3>
                  <p className="text-sm text-gray-600">
                    {studio.address || "주소 정보 없음"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading &&
          searchQuery.trim() && (
            <div className="py-4 rounded-b-lg text-white">
              검색 결과가 없습니다.
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SearchBar;
