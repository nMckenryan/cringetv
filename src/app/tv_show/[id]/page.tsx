import Link from "next/link";
import TVShowCard from "~/app/_components/TVShowCard";

import UICard from "~/app/_components/UICard";
import ReviewForm from "~/app/_components/reviews/ReviewForm";

import ReviewList from "~/app/_components/reviews/ReviewList";
import NotFound from "~/app/not-found";
import { auth } from "~/server/auth";

import { api } from "~/trpc/server";
import { type Review } from "~/types";

export default async function TVShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const show = await api.tvShows.getTVShowById((await params).id);

  const session = await auth();
  const reviewList: Review[] = show?.reviews ?? [];

  const hasLeftReviewIndex = reviewList.findIndex(
    (rev) => rev.userId === session?.user?.id,
  );

  if (hasLeftReviewIndex > 0) {
    // if the user has left a review, move it to the top of the list (if it isn't already)
    const userReview = reviewList.splice(hasLeftReviewIndex, 1)[0]!;
    reviewList.unshift(userReview);
  }

  const canLeaveReview = session?.user && hasLeftReviewIndex === -1;

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

      <UICard>
        <ReviewList reviewList={reviewList.slice(0, 6)} />
        {reviewList.length > 6 && (
          <Link
            className="btn btn-primary btn-sm"
            href={`/reviews/[id]`}
            rel="preload"
            as={`/reviews/${(await params).id}`}
          >
            View More
          </Link>
        )}
      </UICard>
    </>
  );
}
