import React from "react";
import UICard from "../UICard";
import ReviewView from "./ReviewView";
import { type Review } from "~/types";

export default async function ReviewList({
  reviewList,
}: {
  reviewList: Review[];
}) {
  return (
    <UICard>
      <h4 className="text-xl font-bold text-white">Reviews</h4>
      {reviewList.map((rev) => (
        <ReviewView review={rev} key={rev.review_id} />
      ))}
    </UICard>
  );
}
