import TVShowCard from "~/app/_components/TVShowCard";

import UICard from "~/app/_components/UICard";
import ReviewForm from "~/app/_components/reviews/Review-Form";

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

      <div className="w-screen rounded-xl bg-primary-blue p-1 shadow-xl md:w-[60vw]">
        <ReviewForm selectedTvId={show?.tvdb_id} />
      </div>

      <UICard>
        <ReviewList reviewList={reviewList} />
      </UICard>
    </>
  );
}
