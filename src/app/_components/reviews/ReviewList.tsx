import React from "react";
import UICard from "../UICard";
import ReviewView from "./ReviewView";

interface Review {
  review_id: number;
  review_content: string;
  userId: string;
  tvdb_id: number;
  cringe_score_vote: number;
  review_rating: number;
}

export default async function ReviewList() {
  const review: Review = {
    review_id: 1,
    review_content:
      "I loved watching The Office with my family. The characters are so relatable and the humor is spot on. I especially loved the episode  where Michael does the 'Dundies' at the Chili's. It's a classic!",
    userId: "1",
    tvdb_id: 1,
    cringe_score_vote: 5,
    review_rating: 5,
  };
  const reviewList = [review, review, review, review, review, review, review];

  return (
    <UICard>
      <h4 className="text-xl font-bold text-white">Reviews</h4>
      <input
        type="text"
        placeholder="Search Reviews"
        className="input input-bordered w-24 md:w-auto"
      />

      {reviewList.map((reviewList) => (
        <ReviewView review={review} key={reviewList.review_id} />
      ))}
    </UICard>
  );
}
