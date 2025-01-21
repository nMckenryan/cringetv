"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import UICard from "~/app/_components/UICard";

import ReviewList from "~/app/_components/reviews/ReviewList";
import { getReviewListFromTVID } from "~/app/actions";

import { type ReviewViewType } from "~/types";

export default function TVReviewList({ tv_id }: { tv_id: number }) {
  const [reviewList, setReviewList] = useState<ReviewViewType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const reviews = await getReviewListFromTVID(tv_id);
      return reviews ?? [];
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [tv_id]);

  useEffect(() => {
    const fetchData = async () => {
      const reviewData = await fetchReviews();
      setReviewList(reviewData);
    };
    void fetchData();
  }, [fetchReviews]);

  return (
    <UICard>
      {isLoading ? (
        <span className="loading loading-bars loading-sm" />
      ) : (
        <>
          <ReviewList reviewList={reviewList.slice(0, 6)} />
          {reviewList.length > 6 && (
            <Link
              className="btn btn-primary btn-sm"
              href="/reviews/[id]"
              rel="preload"
              as={`/reviews/${tv_id}`}
            >
              View More
            </Link>
          )}
        </>
      )}
    </UICard>
  );
}
