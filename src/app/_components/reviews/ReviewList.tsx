"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import ReviewView from "./ReviewView";

import ReviewForm from "~/app/_components/reviews/ReviewForm";

import { type Review } from "~/types";

import { getReviewsByTVId, getReviewsByUserId } from "~/app/actions";
import { get } from "http";

export default function ReviewList({
  tv_show_id,
  userId,
  isUserPage,
}: {
  tv_show_id: number;
  userId?: string;
  isUserPage: boolean;
}) {
  // const [page, setPage] = React.useState(0);

  // const tvId = reviewList[0]?.tvdb_id ?? 0;
  // const per_page = 6;
  // const start = page * per_page;
  // const end = start + per_page;

  // const entries = reviewList.slice(start, end);

  const [reviewList, setReviewList] = useState<Review[]>([]);

  const fetchReviews = async () => {
    if (isUserPage && userId) {
      return await getReviewsByUserId(userId);
    } else {
      return await getReviewsByTVId(tv_show_id);
    }
  };

  const getInitialReviews = useCallback(() => {
    return void fetchReviews().then((data) => setReviewList(data));
  }, [fetchReviews]);

  useEffect(() => {
    void getInitialReviews();
  }, [getInitialReviews]);

  const hasLeftReviewIndex = reviewList.findIndex(
    (rev) => rev.userId === userId,
  );
  const canLeaveReview = userId && hasLeftReviewIndex === -1;

  if (hasLeftReviewIndex > 0) {
    // if the user has left a review, move it to the top of the list (if it isn't already)
    const userReview = reviewList.splice(hasLeftReviewIndex, 1)[0]!;
    reviewList.unshift(userReview);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense fallback={<span className="loading loading-bars loading-sm" />}>
        {canLeaveReview && (
          <ReviewForm selectedTvId={tv_show_id} existingReview={null} />
        )}
        {reviewList.length === 0 ? (
          <p className="p-10 text-center text-lg">No Reviews Yet.</p>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="grid w-[90vw] grid-cols-1 gap-1 md:w-full lg:grid-cols-2">
              {reviewList.map((rev) => (
                <ReviewView review={rev} key={rev.review_id} />
              ))}
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}

/* <div className="flex gap-2">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {page}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.ceil(10 / Number(per_page))}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {reviewList.length}
                </span>{" "}
                Entries
              </span>

              <div className="xs:mt-0 mt-2 inline-flex">
                <button
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  disabled={!(start > 0)}
                  className="flex h-10 items-center justify-center rounded-s bg-gray-800 px-4 text-base font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={!(end < reviewList.length)}
                  className="flex h-10 items-center justify-center rounded-e border-0 border-s border-gray-700 bg-gray-800 px-4 text-base font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div> */
