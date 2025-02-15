"use client";

import { useEffect, useState } from "react";
import { type TV_Show } from "~/types";
import { Search, X } from "lucide-react";
import SearchResult from "./SearchMenuResult";
import { search } from "~/app/actions";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TV_Show[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [debouncedText] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const searchTv = async () => {
      setIsLoading(true);
      const result = await search(debouncedText);
      setSearchResults(result);
      setIsLoading(false);
    };

    if (debouncedText.length > 1) {
      void searchTv();
      setIsDropdownOpen(true);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [debouncedText]);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById("search-container");
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="search-container" className="relative mx-auto w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Movies"
          className="w-full rounded-md border p-2 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-purple-light md:text-lg lg:text-xl"
        />
        {searchTerm && (
          <X
            className="absolute right-2 top-3 cursor-pointer text-gray-400 hover:text-gray-600"
            size={20}
            onClick={clearSearch}
          />
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 max-h-80 w-full overflow-y-auto rounded-md border bg-primary-blue shadow-lg">
          {isLoading ? (
            <div className="flex h-10 w-full flex-row items-center justify-center p-4 align-middle text-sm text-neutral-200 hover:bg-primary-blue-dark">
              <span className="loading loading-bars loading-sm" />
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((tv: TV_Show) => (
              <SearchResult
                key={tv.tvdb_id}
                tv={tv}
                clearSearch={clearSearch}
              />
            ))
          ) : (
            <div className="flex h-10 w-full flex-row items-center justify-center p-4 align-middle text-sm text-neutral-200 hover:bg-primary-blue-dark">
              <p className="text-md text-gray-800 dark:text-neutral-200">
                No Results
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
