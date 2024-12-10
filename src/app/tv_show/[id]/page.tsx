import { getServerSideProps } from "next/dist/build/templates/pages";
import { use } from "react";
import TVShowCard from "~/app/_components/TVShowCard";

import UICard from "~/app/_components/UICard";
import ReviewForm from "~/app/_components/reviews/Review-Form";
import ReviewView from "~/app/_components/reviews/ReviewView";
import { api } from "~/trpc/server";

import { type Review, type TV_Show } from "~/types";

export default async function TVShowPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const show = await api.tvShows.getTVShowById(id);

  const reviewList: Review[] = show?.genres;

  return (
    <>
      <main className="mt-3 flex w-1/2 flex-col gap-3">
        <UICard>
          <div className="flex flex-col">
            <TVShowCard show={show} />
            <div className="flex flex-col py-4">
              <p className="text-baseline text-pretty">{show.description}</p>
            </div>
          </div>
        </UICard>

        <UICard>
          <div className="flex max-w-96 flex-col gap-2">
            <ReviewForm tvdb_id={id} />

            {reviewList ? (
              <p className="p-10 text-center text-lg">
                No Reviews Yet. <br /> Be the first!
              </p>
            ) : (
              reviewList.map((rev: Review) => (
                <ReviewView review={rev} key={rev.review_id} />
              ))
            )}
          </div>
        </UICard>
      </main>
    </>
  );
}
