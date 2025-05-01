import { useState } from "react";
import { useSearch, useSearchSubmit } from "../components/hooks/useSearch";
import Spinner from "../components/ui/Spinner";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  const { search } = useSearch();
  const { searchFn, isPending } = useSearchSubmit();
  console.log(search);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    // invoke the mutation function with your input
    searchFn(searchInput).catch((err) => {
      // optionally handle errors here too
      console.error(err);
    });
    setSearchInput("");
  };

  return (
    <div className="w-full py-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            type="text"
            placeholder="Search a video"
            className="bg-white/10 text-sm px-4 py-3 w-full rounded-xl"
          />
          <button
            className="bg-blue-600 text-sm px-4 py-3 rounded-xl"
            onClick={handleSearch}
          >
            {isPending ? <Spinner /> : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}
