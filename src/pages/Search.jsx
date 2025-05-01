import { useState } from "react";
import { useSearch, useSearchSubmit } from "../components/hooks/useSearch";
import Spinner from "../components/ui/Spinner";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  const { search, isLoadingSearch } = useSearch();
  const { searchFn, isPending } = useSearchSubmit();
  console.log(search.media);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoadingSearch && (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {search?.media?.length > 0 ? (
            search.media.map((item) => (
              <div
                key={item._id}
                className="bg-white/10 rounded-xl p-4 flex flex-col gap-2"
              >
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="rounded-xl h-[160px] w-full object-cover"
                />
                <h3 className="text-sm font-semibold">{item.title}</h3>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
}
