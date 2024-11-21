import { useState } from "react";
import Image from "next/image";
import { useStudiosByKeyword } from "@/hooks/useCustomAxios";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: results, loading, error } = useStudiosByKeyword(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQuery(searchQuery.trim()); // 검색어 공백 제거
    }
  };

  return (
    <div className="relative w-full max-w-2xl my-10">
      {/* 검색창 */}
      <div className=" rounded-t-lg bg-yellow-400 py-4 px-2">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="스튜디오 이름 또는 주소를 검색하세요"
            className="text-size px-4 flex-grow border-none outline-none bg-transparent text-white placeholder-white"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-white text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white transition"
          >
            검색
          </button>
        </div>
      </div>

      {/* 로딩 중 */}
      {loading && (
        <div className="absolute z-20 w-full space-y-4 bg-yellow-400 rounded-b-lg border-t p-4">
          로딩 중...
        </div>
      )}
      {/* 에러 */}
      {error && <div className="p-4 text-red-500">{error}</div>}
      {/* 검색 결과 */}
      {Array.isArray(results) && results.length > 0 ? (
        <ul className="absolute z-20 w-full space-y-4 bg-yellow-400 rounded-b-lg border-t">
          {results.map((studio, index) => (
            <li
              key={studio.id || `studio-${index}`}
              className="flex items-center space-x-4 cursor-pointer border-b p-4 last:border-0"
            >
              {studio.profileImage ? (
                <Image
                  src={studio.profileImage}
                  alt={studio.name}
                  className="w-16 h-16 rounded-full object-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300" />
              )}
              <div>
                <h3 className="text-lg font-semibold">{studio.name}</h3>
                <p className="text-sm text-gray-500">
                  {studio.address || "주소 정보 없음"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading
      )}
    </div>
  );
}

export default SearchBar;
