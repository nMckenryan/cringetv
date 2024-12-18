import TVShowCard from "~/app/_components/TVShowCard";

import UICard from "~/app/_components/UICard";
import ReviewForm from "~/app/_components/reviews/Review-Form";

import ReviewList from "~/app/_components/reviews/ReviewList";
import NotFound from "~/app/not-found";

import { api } from "~/trpc/server";
import { type Review } from "~/types";

export default async function TVShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const show = await api.tvShows.getTVShowById((await params).id);

  const reviewList: Review[] = show?.reviews ?? [];

  if (!show) return <NotFound />;

  return (
    <>
      <UICard>
        <TVShowCard show={show} />
      </UICard>

      <UICard>
        <ReviewForm selectedTvId={show?.tvdb_id} />
      </UICard>

      <UICard>
        <ReviewList reviewList={reviewList} />
      </UICard>
    </>
  );
}
