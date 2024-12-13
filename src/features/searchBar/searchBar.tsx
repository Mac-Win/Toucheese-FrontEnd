import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearch } from "@/features/searchBar/hooks/useSearch";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const { data: results, loading, error } = useSearch(debouncedQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // 검색어 변경 시 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 폼 제출 방지
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full relative min-h-16 mb-4">
      <div className="z-20 absolute top-0 w-full rounded-3xl bg-yellow-400 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between"
        >
          <label htmlFor="search-input" className="sr-only">
            검색창
          </label>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="스튜디오 이름을 검색해주세요"
            className="flex-grow border-none outline-none bg-transparent text-white placeholder-white text-base"
            aria-label="스튜디오 검색"
          />
          <button type="submit" className="ml-2" aria-label="검색">
            <Image
              src="/icons/search.svg"
              alt="검색 아이콘"
              width={24}
              height={24}
            />
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && <div className="p-4 text-red-500">{error}</div>}

        <div aria-live="polite">
          {!loading &&
            debouncedQuery.trim() &&
            Array.isArray(results) &&
            results.length > 0 && (
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
            )}

          {!loading &&
            debouncedQuery.trim() &&
            (!Array.isArray(results) || results.length === 0) && (
              <div className="py-4 rounded-b-lg text-white">
                검색 결과가 없습니다.
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
