import TVShowCard from "~/app/_components/TVShowCard";

import UICard from "~/app/_components/UICard";
import ReviewForm from "~/app/_components/reviews/ReviewForm";

import NotFound from "~/app/not-found";
import { auth } from "~/server/auth";

import { api } from "~/trpc/server";
import TVReviewList from "./TVReviewList";

export default async function TVShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const show = await api.tvShows.getTVShowById((await params).id);
  const session = await auth();
  let canLeaveReview = false;

  if (session?.user && show) {
    const res = await api.reviews.hasCurrentUserLeftReview({
      userId: session?.user?.id,
      tvdb_id: show?.tvdb_id,
    });

    canLeaveReview = res ? false : true;
  }

  if (!show) return <NotFound />;

  return (
    <>
      <UICard>
        <TVShowCard show={show} />
      </UICard>

      {canLeaveReview && (
        <UICard>
          <ReviewForm selectedTvId={show?.tvdb_id} existingReview={null} />
        </UICard>
      )}

      <TVReviewList tv_id={show?.tvdb_id} />
    </>
  );
}
