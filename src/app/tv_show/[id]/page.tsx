"use client";

import { use } from "react";

import UICard from "~/app/_components/UICard";
import ReviewForm from "~/app/_components/reviews/Review-Form";

export default function TVShowPage({
  params,
}: {
  params: { id: Promise<string> };
}) {
  const { id } = use(params);

  // const show: TV_Show[] = api.tvShowRouter.getTVShowById.useQuery({
  //   tvdb_id: Number(id),
  // });

  // const selected = show[0];

  return (
    <>
      <main className="mt-3 flex flex-col gap-3">
        <UICard>
          <div className="flex flex-col">
            {/* <TVShowCard show={selected} /> */}

            <div className="flex flex-col py-4">
              <h1 className="text-lg font-bold">Description</h1>
              <p className="text-baseline whitespace-pre-wrap">
                {/* {selected.description} */}
              </p>
            </div>
          </div>
        </UICard>
        <ReviewForm tvdb_id={Number(id)} />
        {/* <ReviewList tvId={selected.tvdb_id} /> */}
      </main>
    </>
  );
}
