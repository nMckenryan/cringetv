import Link from "next/link";
import { Suspense } from "react";
import UICard from "~/app/_components/UICard";

import ReviewList from "~/app/_components/reviews/ReviewList";
import { getReviewListFromTVIDForReviewListPage } from "~/app/actions";

export default async function TVReviewList({ tv_id }: { tv_id: number }) {
  const reviewList =
    (await getReviewListFromTVIDForReviewListPage(tv_id)) ?? [];

  return (
    <UICard>
      <Suspense fallback={<p>Loading...</p>}>
        <ReviewList reviewList={reviewList.slice(0, 6)} />
        {reviewList.length > 6 && (
          <Link
            className="btn btn-primary btn-sm"
            rel="preload"
            href="/reviews/[id]"
            as={`/reviews/${tv_id}`}
          >
            View More
          </Link>
        )}
      </Suspense>
    </UICard>
  );
}
