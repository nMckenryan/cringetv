"use client";

import { type TV_Show } from "~/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTVStore } from "~/zustand/store";
import { useMemo } from "react";
import Link from "next/link";
import UICard from "../_components/UICard";

import { getRatingIcon, getRatingText } from "../_components/RatingIcon";
import noPoster from "../../../public/noPoster.png";
import Flag from "react-flagkit";

export default function SearchQuery() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  const tvData = useTVStore((state) => state.searchResult as TV_Show[]);

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
        {filteredTv.length === 0 ? (
          <p>No results found</p>
        ) : (
          <UICard>
            <div className="flex flex-col gap-2">
              {filteredTv.map((result: TV_Show) => (
                <Link
                  key={result.tvdb_id}
                  href="/tv_show/[id]"
                  as={`/tv_show/${result.tvdb_id}`}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col items-start px-0 lg:flex-row">
                    <div
                      id="tv-card-top"
                      className="w-lg flex flex-row justify-around gap-5"
                    >
                      <div className="flex flex-col items-center">
                        <Image
                          src={result.poster_link || noPoster}
                          width={100}
                          height={150}
                          alt={`${result.name} poster`}
                          className="rounded-xl shadow-xl"
                        />
                      </div>

                      <div className="mb-2 flex flex-col gap-0 text-sm">
                        <p className="font-bold">
                          {result.name}&nbsp;
                          <Flag
                            country={result.original_country.slice(0, -1)}
                          />
                        </p>
                        {/*<p>
                           {result.first_air_date.toLocaleString("en-US", {
                            year: "numeric",
                          })}

                          {result.series_status === "Ended"
                            ? " - " +
                              result.first_air_date.toLocaleString("en-US", {
                                year: "numeric",
                              })
                            : " - Present"}
                        </p> */}

                        <p>Status: {result.series_status}</p>

                        <div className="flex flex-row align-middle">
                          {getRatingIcon(result.aggregate_cringe_rating)}
                          <p className="content-center align-middle text-sm">
                            {getRatingText(result.aggregate_cringe_rating)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </UICard>
        )}
      </div>
    </div>
  );
}
