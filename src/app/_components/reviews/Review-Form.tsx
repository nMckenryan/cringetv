"use client";
import React from "react";
import RatingIcon from "../RatingIcon";

import { api } from "~/trpc/react";
import { RatingCode, Review } from "~/types";

export default function ReviewForm({ selectedTvId }: { selectedTvId: number }) {
  const existingUserReview = api.reviews.getUserReview.useQuery({
    tvdb_id: selectedTvId,
  });

  const [reviewBio, setReviewBio] = React.useState(
    existingUserReview ? existingUserReview.data?.review_content : "",
  );
  const [reviewScore, setReviewScore] = React.useState<number | null>(
    // existingUserReview ? existingUserReview.data?.cringe_score_vote : null,
    null,
  );

  const utils = api.useUtils();

  const createReview = api.reviews.createNewReview.useMutation({
    onSuccess: async () => {
      await utils.reviews.invalidate();
      setReviewScore(null);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="flex flex-col text-center">
      <textarea
        className="textarea textarea-bordered w-full bg-primary-blue-light text-white"
        placeholder="Add a Review"
        onChange={(e) => setReviewBio(e.target.value)}
      />
      <div className="flex flex-row items-center justify-around py-2">
        {[
          0,
          RatingCode.BaseCautionLimit,
          RatingCode.BaseUnsafeLimit,
          RatingCode.BaseDangerLimit,
        ].map((score) => (
          <button
            key={score}
            onClick={() => setReviewScore(score)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === score ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={score} />
          </button>
        ))}
        <button
          onClick={() => handleSubmit}
          className="btn border-gray-800 bg-secondary-purple text-white/90 hover:bg-secondary-purple-light"
        >
          Post
        </button>
      </div>
    </form>
  );
}
