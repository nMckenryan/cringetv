"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type TV_Show } from "~/types";
import Image from "next/image";
import { Search, X } from "lucide-react";

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
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-primary-blue shadow-lg">
          {searchResults.map((tv: TV_Show) => (
            <Link
              key={tv.tvdb_id}
              className="flex flex-row items-center p-4 align-middle text-sm text-neutral-200 hover:bg-primary-blue-dark"
              href="/tv_show/[id]"
              as={`/tv_show/${tv.tvdb_id}`}
              onClick={() => {
                clearSearch();
              }}
            >
              <Image
                className="size-5 shrink-0 rounded-full"
                src={tv.poster_link}
                alt={tv.name}
                width={40}
                height={40}
              />
              <p className="text-sm text-gray-800 dark:text-neutral-200">
                {tv.name}
              </p>
              <small className="ms-auto text-xs text-gray-400 dark:text-neutral-500">
                {tv.first_air_date.getFullYear()}
              </small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
