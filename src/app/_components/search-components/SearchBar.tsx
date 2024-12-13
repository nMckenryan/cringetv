"use client";

import { useEffect, useRef, useState } from "react";
import { type TV_Show } from "~/types";
import { Search, X } from "lucide-react";
import SearchResult from "./SearchMenuResult";
import { useTVStore } from "~/zustand/store";
import Link from "next/link";

export default function SearchBar({ tvList }: { tvList: TV_Show[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TV_Show[]>(tvList);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const resultsLimit = useRef(5);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredResults = tvList.filter((item: TV_Show) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setSearchResults(filteredResults.slice(0, resultsLimit.current));
      setIsDropdownOpen(true);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById("search-container");
      if (searchContainer && !searchContainer.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateSearchResults = useTVStore(
    (state) => state.populate_search_result,
  );

  return (
    <div id="search-container" className="relative mx-auto w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Movies"
          className="w-full rounded-md border p-2 pl-8 focus:outline-none focus:ring-2 focus:ring-secondary-purple-light"
        />
        {searchTerm && (
          <X
            className="absolute right-2 top-3 cursor-pointer text-gray-400 hover:text-gray-600"
            size={20}
            onClick={clearSearch}
          />
        )}
      </div>

      {isDropdownOpen && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-80 w-full overflow-y-auto rounded-md border bg-primary-blue shadow-lg">
          {searchResults.map((tv: TV_Show) => (
            <SearchResult key={tv.tvdb_id} tv={tv} clearSearch={clearSearch} />
          ))}
          <Link
            className="flex h-10 w-full flex-row items-center justify-center p-4 align-middle text-sm text-neutral-200 hover:bg-primary-blue-dark"
            href={`/search?q=${encodeURIComponent(searchTerm)}`}
            onClick={() => {
              updateSearchResults(searchResults);
              clearSearch();
            }}
          >
            <p className="text-md text-gray-800 dark:text-neutral-200">
              See all results
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
