import { useState } from "react";
import Image from "next/image";
import { useSearch } from "@/features/searchBar/hooks/useSearch";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색 입력값
  const { data: results, loading, error } = useSearch(searchQuery);

  // 검색어 변경 시 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // 입력값 업데이트
  };

  // 검색 버튼 클릭 처리
  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`검색 실행: ${searchQuery}`); // 필요 시 검색 요청 재실행 로직 추가
    }
  };

  return (
    <div className="w-full relative min-h-16 mb-4">
      {/* 검색창 */}
      <div className="z-20 absolute top-0 w-full rounded-3xl bg-yellow-400 p-4">
        <form className="flex items-center justify-between">
          <label htmlFor="search-input" className="sr-only">
            검색창
          </label>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={handleInputChange} // 입력값 변경 처리
            placeholder="스튜디오 이름을 검색해주세요"
            className="flex-grow border-none outline-none bg-transparent text-white placeholder-white text-base"
            aria-label="스튜디오 검색"
          />
          <button
            type="button"
            onClick={handleSearch} // 검색 버튼 클릭 처리
            className="ml-2"
            aria-label="검색"
          >
            <Image
              src="/icons/search.svg"
              alt="검색 아이콘"
              width={24}
              height={24}
            />
          </button>
        </form>

        {/* 로딩 중 표시 */}
        {loading && (
          <div className="text-white py-2 text-sm">검색 중입니다...</div>
        )}

        {/* 에러 메시지 */}
        {error && <div className="p-4 text-red-500">{error}</div>}

        {/* 검색 결과 */}
        <div aria-live="polite">
          {searchQuery.trim() &&
          Array.isArray(results) &&
          results.length > 0 ? (
            <ul className="w-full rounded-b-lg max-h-screen overflow-y-scroll scrollbar-hide mt-4 transition-all">
              {results.map((studio, index) => (
                <li
                  key={studio.id || `studio-${index}`}
                  className="flex items-center gap-2 cursor-pointer border-b py-4 last:border-0"
                >
                  {studio.profileImage ? (
                    <Image
                      src={studio.profileImage}
                      alt={`${studio.name}의 프로필 이미지`}
                      className="max-w-10 max-h-10 rounded-full overflow-hidden aspect-1/1"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
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
    </div>
  );
}

export default SearchBar;
