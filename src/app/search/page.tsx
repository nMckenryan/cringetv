"use client";

import { type TV_Show } from "~/types";
import TVShowCard from "../_components/TVShowCard";
import { useSearchParams } from "next/navigation";
import { useTVStore } from "~/zustand/store";
import { useMemo } from "react";
import Link from "next/link";
import UICard from "../_components/UICard";

export default function SearchQuery() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  const tvData = useTVStore((state) => state.tv_data) as TV_Show[];

  const filteredTv = useMemo(() => {
    if (!tvData) return [];
    return tvData.filter((result: TV_Show) => {
      return result.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [tvData, searchTerm]);

  return (
    <div>
      <div className="my-5 flex flex-col gap-4">
        <UICard>
          <h1 className="text-2xl">
            {filteredTv.length} Results found for &quot;{searchTerm}&quot;
          </h1>
        </UICard>
        {filteredTv.map((result: TV_Show) => (
          <Link
            key={result.tvdb_id}
            href="/tv_show/[id]"
            as={`/tv_show/${result.tvdb_id}`}
            className="flex flex-col gap-4"
          >
            <UICard>
              <TVShowCard key={result.tvdb_id} show={result} />
            </UICard>
          </Link>
        ))}
      </div>
    </div>
  );
}
