import { useState } from "react";

function SearchBar({ studios }: { studios: { _id: string; name: string }[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<
    { _id: string; name: string }[]
  >([]);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      // 띄어쓰기 제거 및 정규식으로 중간 매칭 지원
      const regex = new RegExp(trimmedQuery.replace(/\s+/g, ""), "i");
      const results = studios.filter((studio) =>
        regex.test(studio.name.replace(/\s+/g, ""))
      );
      setFilteredResults(results);
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSearchQuery("");
  };

  return (
    <div className="relative w-full max-w-2xl my-4 z-50">
      <div className="rounded-full bg-yellow-400 p-2 ">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="스튜디오 이름을 검색하세요"
            className="px-2 flex-grow border-none outline-none bg-transparent text-white placeholder-white"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-white text-yellow-500 rounded-full"
          >
            검색
          </button>
        </div>
      </div>

      {/* 검색 결과 오버레이 */}
      {showOverlay && (
        <div className="absolute top-6 left-0 w-full bg-yellow-400 shadow-lg rounded-lg -z-10">
          {filteredResults.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredResults.map((studio) => (
                <li
                  key={studio._id}
                  className="p-4 hover:bg-gray-100 cursor-pointer"
                >
                  {studio.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-gray-500">검색 결과가 없습니다.</div>
          )}
          <button
            onClick={handleCloseOverlay}
            className="text-red-500 px-4 py-2 text-right w-full"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
