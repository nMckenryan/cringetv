"use client";
import React from "react";
import RatingIcon from "../RatingIcon";

import { api } from "~/trpc/react";
import { RatingCode } from "~/types";

export default function ReviewForm({ selectedTvId }: { selectedTvId: number }) {
  const [reviewContent, setReviewContent] = React.useState<string>("");
  const [reviewScore, setReviewScore] = React.useState<number>(0);

  const existingUserReview = api.reviews.getUserReview.useQuery({
    tvdb_id: selectedTvId,
  });

  const { mutate, error } = api.reviews.createNewReview.useMutation();

  return (
    <form
      className="flex w-full flex-col text-center md:w-[60vw]"
      onSubmit={(e) => {
        e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        mutate({
          review_content: reviewContent,
          cringe_score_vote: reviewScore,
          tvdb_id: selectedTvId,
        });
      }}
    >
      <textarea
        name="review_content"
        className="textarea textarea-bordered h-24 w-full bg-primary-blue-light text-white"
        placeholder="Add a Review"
        onChange={(e) => setReviewContent(e.target.value)}
      />
      <div className="flex flex-row items-center justify-around py-2">
        {[
          0,
          RatingCode.BaseCautionLimit,
          RatingCode.BaseUnsafeLimit,
          RatingCode.BaseDangerLimit,
        ].map((score) => (
          <button
            type="button"
            key={score}
            onClick={() => setReviewScore(score)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === score ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={score} />
          </button>
        ))}

        <button
          type="submit"
          className="btn border-gray-800 bg-secondary-purple text-white/90 hover:bg-secondary-purple-light"
        >
          Post
        </button>
      </div>
    </form>
  );
}
