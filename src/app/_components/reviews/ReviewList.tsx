import React from "react";
import UICard from "../UICard";
import ReviewView from "./ReviewView";
import { type Review } from "~/types";
import { useTVStore } from "~/zustand/store";
import ReviewForm from "./Review-Form";

export default function ReviewList({ tvId }: { tvId: number }) {
  const rl: Review[] = useTVStore((state) => state.review_data) as Review[];

  const reviewList = rl.filter((rev) => rev.tvdb_id === tvId);

  return (
    <UICard>
      <h4 className="text-xl font-bold text-white">Reviews</h4>
      <ReviewForm tvdb_id={tvId} />
      {/* TODO: Paginate */}
      <div className="flex- my-10 flex gap-2">
        {reviewList.length === 0 ? (
          <p className="p-10 text-center text-lg">
            No Reviews Yet. <br /> Be the first!
          </p>
        ) : (
          reviewList.map((rev) => (
            <ReviewView review={rev} key={rev.review_id} />
          ))
        )}
      </div>
    </UICard>
  );
}
