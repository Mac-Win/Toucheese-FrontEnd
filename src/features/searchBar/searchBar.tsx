import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div className="w-full max-w-2xl rounded-full bg-yellow-400 my-4 p-2">
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="스튜디오 이름을 검색하세요"
          className="px-2 flex-grow border-none outline-none bg-transparent text-white placeholder-white"
        />
        <button onClick={handleSearch} className="p-2 text-white">
          검색
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
