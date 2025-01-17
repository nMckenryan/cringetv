"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import ReviewView from "./ReviewView";

import ReviewForm from "~/app/_components/reviews/ReviewForm";

import { type Review } from "~/types";

import { getReviewsByTVId, getReviewsByUserId } from "~/app/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "~/trpc/react";
import PaginationControls from "../PaginationControls";
import { useQuery } from "@tanstack/react-query";

const generateReviews = (tv_show_id: number, userId: string): Review[] => {
  const reviews: Review[] = [];
  for (let i = 0; i < 7; i++) {
    reviews.push({
      review_id: i + 1,
      review_content: `This is review number ${i + 1}`,
      tvdb_id: tv_show_id,
      userId,
      cringe_score_vote: Math.random() * 5,
      date_created: new Date(),
      date_updated: null,
    });
  }
  return reviews;
};

interface PageInfo {
  cursor: number | null;
  items: Review[];
}

export default function ReviewList({
  tv_show_id,
  userId,
  isUserPage,
  searchParams,
}: {
  tv_show_id: number;
  userId?: string;
  isUserPage: boolean;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const [reviewList, setReviewList] = useState<Review[]>([]);

  const page = 1;
  const per_page = 5;

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviewsByTVId(tv_show_id);
      setReviewList(reviews as Review[]);
    };

    void fetchReviews();
  }, [tv_show_id]);

  const entries = reviewList?.slice(start, end);

  // setReviewList(data?.pages.map((page) => page.items).flat() ?? []);

  const hasLeftReviewIndex = reviewList.findIndex(
    (rev) => rev.userId === userId,
  );
  // const canLeaveReview = userId && hasLeftReviewIndex === -1;

  if (hasLeftReviewIndex > 0) {
    // if the user has left a review, move it to the top of the list (if it isn't already)
    const userReview = reviewList.splice(hasLeftReviewIndex, 1)[0]!;
    reviewList.unshift(userReview);
  }

  // const fetchPreviousPage = () => {
  //   if (currentPageIndex > 0) {
  //     setCurrentPageIndex(currentPageIndex - 1);
  //   }
  // };

  // const fetchNextPage = () => {
  //   if (newData.nextCursor ?? null) {
  //     setPages([...pages, { cursor: data.nextCursor, items: [] }]);
  //     setCurrentPageIndex(currentPageIndex + 1);
  //   }
  // };

  // if (isLoading) return <span className="loading loading-bars loading-sm" />;

  const session = api.users.me.useQuery();
  const userLeftReview = reviewList.find(
    (rev) => rev.userId === session.data?.id,
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense fallback={<span className="loading loading-bars loading-sm" />}>
        {userLeftReview !== null && (
          <ReviewForm selectedTvId={tv_show_id} existingReview={null} />
        )}

        {reviewList.length === 0 ? (
          <p className="p-10 text-center text-lg">No Reviews Yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="grid w-[90vw] grid-cols-1 gap-1 md:w-full md:grid-cols-2">
                {reviewList.map((rev) => (
                  <ReviewView review={rev} key={rev.review_id} />
                ))}
              </div>
            </div>
            <PaginationControls
              hasNextPage={end < reviewList.length}
              hasPrevPage={start > 0}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}
