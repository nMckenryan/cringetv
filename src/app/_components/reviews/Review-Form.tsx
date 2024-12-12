"use client";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import RatingIcon from "../RatingIcon";

import { api } from "~/trpc/react";
import { RatingCode, Review } from "~/types";

export default function ReviewForm({ tvdb_id }: { tvdb_id: string }) {
  const existingUserReview = api.reviews.getUserReview.useQuery({
    tvdb_id: Number(tvdb_id),
  });

  const [reviewBio, setReviewBio] = React.useState(
    existingUserReview ? existingUserReview.data?.review_content : "",
  );
  const [reviewScore, setReviewScore] = React.useState<number | null>(
    existingUserReview ? existingUserReview.data?.cringe_score_vote : null,
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
    <form>
      <div className="flex flex-col text-center">
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Add a Review"
          onChange={(e) => setReviewBio(e.target.value)}
        />
        <div className="flex flex-row items-center justify-around py-2">
          <button
            onClick={() => setReviewScore(0)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === 0 ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={0} />
          </button>

          <button
            onClick={() => setReviewScore(RatingCode.BaseCautionLimit)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === RatingCode.BaseCautionLimit ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={RatingCode.BaseCautionLimit} />
          </button>

          <button
            onClick={() => setReviewScore(RatingCode.BaseUnsafeLimit)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === RatingCode.BaseUnsafeLimit ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={RatingCode.BaseUnsafeLimit} />
          </button>

          <button
            onClick={() => setReviewScore(RatingCode.BaseDangerLimit)}
            className={`hover:bg-primary-purple/20 active:bg-primary-purple/40 rounded-xl ${reviewScore === RatingCode.BaseDangerLimit ? "bg-primary-blue-light" : ""}`}
          >
            <RatingIcon reviewScore={RatingCode.BaseDangerLimit} />
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <input
            type="submit"
            className="btn w-24 border-gray-800 bg-secondary-purple text-white/90 hover:bg-secondary-purple-light"
          />
        </div>
      </div>
    </form>
  );
}
