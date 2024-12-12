import TVShowCard from "~/app/_components/TVShowCard";

import UICard from "~/app/_components/UICard";

import ReviewList from "~/app/_components/reviews/ReviewList";

import { api } from "~/trpc/server";

export default async function TVShowPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const show = await api.tvShows.getTVShowById(id);

  const reviewList = show?.reviews;

  return (
    <>
      <UICard>
        <TVShowCard show={show} />
      </UICard>
      <UICard>
        <ReviewList reviewList={reviewList} />
      </UICard>
    </>
  );
}
