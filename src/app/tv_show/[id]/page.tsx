"use client";

import { use } from "react";
import { type TV_Show } from "~/types";
import TVShowCard from "~/app/_components/TVShowCard";
import { useTVStore } from "~/zustand/store";
import ReviewList from "~/app/_components/reviews/ReviewList";
import UICard from "~/app/_components/UICard";

export default function TVShowPage({
  params,
}: {
  params: { id: Promise<string> };
}) {
  const { id } = use(params);

  const show: TV_Show[] = useTVStore((state) => state.tv_data);

  const selected = show.find((show) => show.tvdb_id === Number(id))!;

  return (
    <>
      <main className="mt-3 flex flex-col gap-3">
        <UICard>
          <div className="flex flex-col">
            <TVShowCard show={selected} />

            <div className="flex flex-col py-4">
              <h1 className="text-lg font-bold">Description</h1>
              <p className="text-baseline whitespace-pre-wrap">
                {selected.description}
              </p>
            </div>
          </div>
        </UICard>
        <ReviewList tvId={selected.tvdb_id} />
      </main>
    </>
  );
}
