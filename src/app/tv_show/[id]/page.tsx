"use client";

import TVShowCard from "~/app/_components/TVShowCard";

import UICard from "~/app/_components/UICard";
import ReviewForm from "~/app/_components/reviews/ReviewForm";

import NotFound from "~/app/not-found";

import { useParams } from "next/navigation";

import { api } from "~/trpc/react";

import { useEffect, useState } from "react";
import { type ReviewViewTypeExtended, type TV_Show } from "~/types";
import Link from "next/link";
import { Suspense } from "react";

import ReviewList from "~/app/_components/reviews/ReviewList";

export default function TVShowPage() {
  const [reviews, setReviews] = useState<ReviewViewTypeExtended[]>([]);
  const params = useParams();
  const tvShowId = params.id as string;

  const { data, isLoading } =
    api.reviews.getReviewListFromTVIDForReviewListPage.useQuery({
      tvdb_id: Number(tvShowId),
    });

  useEffect(() => {
    if (data) {
      setReviews(data as ReviewViewTypeExtended[]);
    }
  }, [data]);

  const showReq = api.tvShows.getTVShowById.useQuery(tvShowId);
  const show: TV_Show = showReq.data as TV_Show;

  const session = api.users.me.useQuery();

  // only query the hasCurrentUserLeftReview API if the user is logged in
  // and the show data is available
  const { data: hasLeftReview, isLoading: isReviewLoading } =
    api.reviews.hasCurrentUserLeftReview.useQuery(
      {
        userId: String(session?.data?.id),
        tvdb_id: Number(tvShowId),
      },
      {
        enabled: !!session.data?.id && !!tvShowId, // only enable the query when the condition is met
      },
    );

  const canLeaveReview = hasLeftReview ? false : true;

  if (isLoading)
    return <span className="loading loading-spinner">Loading...</span>;

  if (!show) return <NotFound />;

  return (
    <>
      <UICard>
        <TVShowCard show={show} />
      </UICard>

      {isReviewLoading ? (
        <span className="loading loading-spinner">Loading...</span>
      ) : (
        canLeaveReview && (
          <UICard>
            <ReviewForm
              selectedTvId={Number(show.tvdb_id)}
              existingReview={null}
            />
          </UICard>
        )
      )}

      <UICard>
        <Suspense
          fallback={<span className="loading loading-spinner">Loading...</span>}
        >
          <ReviewList reviewList={reviews.slice(0, 6)} />
          {reviews.length > 6 && (
            <Link
              className="btn btn-primary btn-sm"
              rel="preload"
              href="/reviews/[id]"
              as={`/reviews/${tvShowId}`}
            >
              View More
            </Link>
          )}
        </Suspense>
      </UICard>
    </>
  );
}
