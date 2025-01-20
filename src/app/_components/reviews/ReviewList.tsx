import React, { Suspense } from "react";
import ReviewView from "./ReviewView";
import { type Review } from "~/types";

export default function ReviewList({ reviewList }: { reviewList: Review[] }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense fallback={<span className="loading loading-bars loading-sm" />}>
        {reviewList.length === 0 ? (
          <p className="p-10 text-center text-lg">No Reviews Yet.</p>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="grid w-[90vw] grid-cols-1 gap-1 sm:grid-cols-2 md:w-full">
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
